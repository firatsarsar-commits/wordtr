# WordLab TR - Supabase Veritabanı ve Yetkilendirme Kurulum Kılavuzu

Bu doküman, WordLab TR platformunun Öğrenci ve Yönetim Panelleri için tasarlanmış PostgreSQL ve Supabase yapılandırma adımlarını içerir.

---

## 1. Supabase Projesi Oluşturma

1. [supabase.com](https://supabase.com) adresine giderek ücretsiz bir hesap açın veya giriş yapın.
2. **New Project** butonuna tıklayın ve projenize bir ad verin (örneğin: `wordlab-tr`).
3. Güçlü bir veritabanı şifresi belirleyin ve bölge olarak Avrupa (Frankfurt veya Londra) seçin.

---

## 2. SQL Şemasını ve RLS Kurallarını Uygulama

1. Supabase Dashboard sol menüsünden **SQL Editor** bölümünü açın.
2. `supabase/schema.sql` dosyasının içeriğini kopyalayıp editöre yapıştırın.
3. **Run** butonuna basarak tabloları, ilişkileri, trigger'ları ve Satır Düzeyinde Güvenlik (Row Level Security - RLS) politikalarını tek seferde oluşturun.

---

## 3. Ortam Değişkenlerini (Environment Variables) Tanımlama

Supabase Dashboard → **Project Settings** → **API** bölümünden aşağıdaki değerleri alın:

1. **Project URL** (`https://xyzcompany.supabase.co`)
2. **anon / public key** (`eyJh...`)

Bu değerleri projenin kök dizinindeki [`.env.local`](file:///c:/Users/firat/OneDrive/Desktop/wordtr/.env.local) dosyasına ekleyin:

```env
# Supabase Yapılandırması
NEXT_PUBLIC_SUPABASE_URL="https://projeniz.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="anon-public-key"
```

> [!CAUTION]
> **Güvenlik Notu:** `service_role` gizli anahtarını asla istemci kodunda veya `.env.local` içinde `NEXT_PUBLIC_` önekiyle kullanmayın. Yalnızca `anon` public key istemcide kullanılmalıdır.

---

## 4. Kullanıcı Rolleri ve Yönetici Yetkisi

Sisteme kaydolan her yeni kullanıcı güvenlik kuralı gereği otomatik olarak **`student`** rolünü alır. 
İlk yönetici (admin) hesabını oluşturmak için:

1. Arayüzden kayıt olun (veya Supabase Auth paneline kullanıcı ekleyin).
2. Supabase Dashboard → **Table Editor** → **`profiles`** tablosuna gidin.
3. İlgili kullanıcının `role` sütununu `'student'` değerinden `'admin'` değerine güncelleyin.
