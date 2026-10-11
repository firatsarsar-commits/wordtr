/**
 * Utility functions for parsing, validating, and embedding video resources (YouTube, Vimeo, web links).
 */

export interface ParsedVideo {
  isValid: boolean;
  type: 'youtube' | 'vimeo' | 'external' | 'none';
  embedUrl: string | null;
  directUrl: string | null;
  youtubeId: string | null;
  thumbnailUrl: string | null;
}

/**
 * Extracts video ID and embed URL from any user-provided URL or video ID string.
 */
export function parseVideoUrl(input?: string | null, fallbackYoutubeId?: string | null): ParsedVideo {
  const cleanInput = (input || '').trim();
  const cleanFallback = (fallbackYoutubeId || '').trim();

  // Try input first, then fallback
  const target = cleanInput || cleanFallback;

  if (!target) {
    return {
      isValid: false,
      type: 'none',
      embedUrl: null,
      directUrl: null,
      youtubeId: null,
      thumbnailUrl: null,
    };
  }

  // 1. YouTube direct 11-char ID check (e.g. S-nHYzK-BVg, dQw4w9WgXcQ)
  if (/^[a-zA-Z0-9_-]{11}$/.test(target)) {
    return {
      isValid: true,
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${target}?rel=0`,
      directUrl: `https://www.youtube.com/watch?v=${target}`,
      youtubeId: target,
      thumbnailUrl: `https://img.youtube.com/vi/${target}/hqdefault.jpg`,
    };
  }

  // 2. YouTube URL patterns:
  // - youtube.com/watch?v=ID
  // - youtube.com/embed/ID
  // - youtube.com/v/ID
  // - youtube.com/shorts/ID
  // - youtube.com/live/ID
  // - youtu.be/ID
  const youtubeRegex = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+?&v=|shorts\/|live\/))([a-zA-Z0-9_-]{11})/i;
  const ytMatch = target.match(youtubeRegex);
  if (ytMatch && ytMatch[1]) {
    const yId = ytMatch[1];
    return {
      isValid: true,
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${yId}?rel=0`,
      directUrl: `https://www.youtube.com/watch?v=${yId}`,
      youtubeId: yId,
      thumbnailUrl: `https://img.youtube.com/vi/${yId}/hqdefault.jpg`,
    };
  }

  // 3. Vimeo URL patterns:
  // - vimeo.com/123456789
  // - player.vimeo.com/video/123456789
  const vimeoRegex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/i;
  const vimeoMatch = target.match(vimeoRegex);
  if (vimeoMatch && vimeoMatch[1]) {
    const vId = vimeoMatch[1];
    return {
      isValid: true,
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vId}`,
      directUrl: `https://vimeo.com/${vId}`,
      youtubeId: null,
      thumbnailUrl: null,
    };
  }

  // 4. Secondary check: if fallback has a valid YouTube ID
  if (cleanFallback && /^[a-zA-Z0-9_-]{11}$/.test(cleanFallback)) {
    return {
      isValid: true,
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${cleanFallback}?rel=0`,
      directUrl: `https://www.youtube.com/watch?v=${cleanFallback}`,
      youtubeId: cleanFallback,
      thumbnailUrl: `https://img.youtube.com/vi/${cleanFallback}/hqdefault.jpg`,
    };
  }

  // 5. Generic HTTP / HTTPS URL
  if (/^https?:\/\//i.test(target)) {
    return {
      isValid: true,
      type: 'external',
      embedUrl: null,
      directUrl: target,
      youtubeId: null,
      thumbnailUrl: null,
    };
  }

  return {
    isValid: false,
    type: 'none',
    embedUrl: null,
    directUrl: null,
    youtubeId: null,
    thumbnailUrl: null,
  };
}
