import { NextRequest, NextResponse } from 'next/server';
import { parseVideoUrl } from '@/lib/video-utils';

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
}

function formatSeconds(totalSecs: number): string {
  const hrs = Math.floor(totalSecs / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;
  if (hrs > 0) {
    return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function parseIsoDuration(iso: string): string | null {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return null;
  const h = parseInt(match[1] || '0', 10);
  const m = parseInt(match[2] || '0', 10);
  const s = parseInt(match[3] || '0', 10);
  const totalSecs = h * 3600 + m * 60 + s;
  return formatSeconds(totalSecs);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const videoUrl = searchParams.get('url');

    if (!videoUrl) {
      return NextResponse.json({ error: 'Video URL parametresi zorunludur.' }, { status: 400 });
    }

    const parsed = parseVideoUrl(videoUrl);
    if (!parsed.isValid) {
      return NextResponse.json({ error: 'Geçersiz veya tanınmayan video bağlantısı.' }, { status: 400 });
    }

    // 1. YouTube Metadata Fetching
    if (parsed.type === 'youtube' && parsed.youtubeId) {
      const yId = parsed.youtubeId;

      // Parallel fetch: oEmbed for title & channel + watch page for duration
      const oembedPromise = fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${yId}&format=json`, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        next: { revalidate: 3600 },
      }).then((r) => (r.ok ? r.json() : null)).catch(() => null);

      const watchPagePromise = fetch(`https://www.youtube.com/watch?v=${yId}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        cache: 'no-store',
      }).then((r) => (r.ok ? r.text() : '')).catch(() => '');

      const [oembedData, html] = await Promise.all([oembedPromise, watchPagePromise]);

      let title = oembedData?.title ? decodeHtmlEntities(oembedData.title) : 'YouTube Eğitim Videosu';
      let channel = oembedData?.author_name ? decodeHtmlEntities(oembedData.author_name) : 'YouTube';
      let duration = '10:00';

      // Extract duration from YouTube watch HTML
      if (html) {
        const lenMatch = html.match(/"lengthSeconds":"(\d+)"/);
        if (lenMatch && lenMatch[1]) {
          const totalSecs = parseInt(lenMatch[1], 10);
          if (totalSecs > 0) {
            duration = formatSeconds(totalSecs);
          }
        } else {
          const durMatch = html.match(/itemprop="duration" content="([^"]+)"/);
          if (durMatch && durMatch[1]) {
            const formatted = parseIsoDuration(durMatch[1]);
            if (formatted) duration = formatted;
          }
        }

        // If oEmbed failed, fallback to extracting title from HTML <title>
        if (!oembedData?.title) {
          const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
          if (titleMatch && titleMatch[1]) {
            title = decodeHtmlEntities(titleMatch[1].replace(/ - YouTube$/i, '').trim());
          }
        }
      }

      return NextResponse.json({
        success: true,
        type: 'youtube',
        title,
        channel,
        duration,
        youtubeId: yId,
        thumbnailUrl: parsed.thumbnailUrl || `https://i.ytimg.com/vi/${yId}/hqdefault.jpg`,
        embedUrl: parsed.embedUrl,
        directUrl: parsed.directUrl,
      });
    }

    // 2. Vimeo Metadata Fetching
    if (parsed.type === 'vimeo' && parsed.directUrl) {
      try {
        const vimeoRes = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(parsed.directUrl)}`);
        if (vimeoRes.ok) {
          const vimeoData = await vimeoRes.json();
          const duration = vimeoData.duration ? formatSeconds(vimeoData.duration) : '05:00';

          return NextResponse.json({
            success: true,
            type: 'vimeo',
            title: vimeoData.title || 'Vimeo Eğitim Videosu',
            channel: vimeoData.author_name || 'Vimeo',
            duration,
            thumbnailUrl: vimeoData.thumbnail_url,
            embedUrl: parsed.embedUrl,
            directUrl: parsed.directUrl,
          });
        }
      } catch {
        // Fallback
      }

      return NextResponse.json({
        success: true,
        type: 'vimeo',
        title: 'Vimeo Eğitim Videosu',
        channel: 'Vimeo',
        duration: '05:00',
        embedUrl: parsed.embedUrl,
        directUrl: parsed.directUrl,
      });
    }

    // 3. General Web Link
    return NextResponse.json({
      success: true,
      type: 'external',
      title: 'Eğitim Videosu',
      channel: 'Web Kaynağı',
      duration: '10:00',
      directUrl: parsed.directUrl,
    });
  } catch (error) {
    console.error('Error fetching video info:', error);
    return NextResponse.json({ error: 'Video bilgileri alınırken hata oluştu.' }, { status: 500 });
  }
}
