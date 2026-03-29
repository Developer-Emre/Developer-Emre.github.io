# HANDOVER — Portfolio Projesi

> Bu dosya her session başında okunmalıdır.  
> Yapılan kararlar, mimari, mevcut durum ve sıradaki adımlar burada tutulur.

---

## Proje Bilgisi

| | |
|---|---|
| **Tür** | Single-page portfolio sitesi |
| **Stack** | React 19 + TypeScript + Vite 7 + Tailwind CSS v4 |
| **OS** | macOS |
| **Paket yöneticisi** | npm |
| **Path** | `/Users/sarigul/Desktop/GitHub:Project/portfolio` |

---

## Kurulum Kararları

### Tailwind v4
- `tailwindcss@^4.2.1` + `@tailwindcss/vite@^4.2.1` kurulu.
- `tailwind.config.ts` **silindi** — v4'te gerekmiyor.
- Vite plugin: `vite.config.ts` → `plugins: [react(), tailwindcss()]`
- CSS import: `index.css` → `@import "tailwindcss";`
- Design token'lar `@theme {}` bloğunda `--color-*` olarak tanımlandı.
  Bu sayede `bg-background`, `text-foreground`, `border-border` gibi  
  Tailwind utility'leri doğrudan kullanılabiliyor.

### App.tsx Kuralı
`App.tsx` **sadece composition** içerir. `useState`, `useEffect`,  
inline stil, hardcode metin **yasak**. Tüm içerik `data/portfolio.ts`'den gelir.

---

## Dosya Yapısı

```
src/
  data/
    portfolio.ts          ← TEK İÇERİK KAYNAĞI — tüm metin/veri buradan
  components/
    BackgroundScene.tsx   ← .background + .grid dekoratif katmanlar (aria-hidden)
  sections/               ← Her biri skeleton, henüz içerik yok
    Hero.tsx
    About.tsx
    Projects.tsx
    Contact.tsx
  layout/
    Navbar.tsx            ← skeleton
    Footer.tsx            ← skeleton
    RootLayout.tsx        ← BackgroundScene + Navbar + <main> + Footer
  App.tsx                 ← Composition: RootLayout > Hero/About/Projects/Contact
  index.css               ← Tüm stiller — bölümlere ayrılmış
  main.tsx                ← Değiştirilmedi
```

---

## index.css Mimarisi

```
@import "tailwindcss"

@theme { }              → Tailwind utility ↔ CSS değişkeni eşlemesi
@layer base { :root }   → Light mod HSL token'ları
@layer base { .dark }   → Dark mod HSL token'ları
@layer utilities { }    → (şu an boş — scrollbar yoruma alındı)
@layer base { * / body }→ border-border, overflow:hidden, font-family
.background             → z-index:-2, karanlık gradient
.grid                   → z-index:-1, 3D rotasyonlu grid
.content                → z-index: 1, flex center, min-h-screen
```

> `overflow: hidden` body'de aktif — 3D grid'in (scale:2) taşmasını keser.

---

## 3D Arka Plan (BackgroundScene)

İki CSS sınıfıyla oluşturulur:

- `.background` — `position: fixed; inset: 0; z-index: -2`  
  Çok katmanlı lineer + radyal gradient (mavi/pembe aksan, koyu lacivert base).

- `.grid` — `position: fixed; z-index: -1`  
  `rotateX(30deg) rotateY(-5deg) rotateZ(20deg) scale(2)` + `perspective: 1000px`  
  `repeating-linear-gradient` ile 40px aralıklı gri grid çizgileri.

---

## data/portfolio.ts — Doldurulacaklar

```ts
PERSONAL.name       → 'Adın Soyadın'         ← GERÇEK BİLGİ GİRİLECEK
PERSONAL.role       → 'Full-Stack Developer'  ← GERÇEK BİLGİ GİRİLECEK
PERSONAL.email      → 'mail@example.com'      ← GERÇEK BİLGİ GİRİLECEK
PERSONAL.github     → placeholder             ← GERÇEK BİLGİ GİRİLECEK
PERSONAL.linkedin   → placeholder             ← GERÇEK BİLGİ GİRİLECEK
ABOUT_TEXT          → placeholder metin       ← GERÇEK BİLGİ GİRİLECEK
SKILLS              → örnek liste             ← GERÇEK BİLGİ GİRİLECEK
PROJECTS            → 1 örnek proje           ← GERÇEK PROJELER GİRİLECEK
```

---

## Mevcut Durum

| Dosya | Durum |
|---|---|
| `vite.config.ts` | ✅ Hazır |
| `index.css` | ✅ Yapısal olarak hazır, component CSS'leri sonra eklenecek |
| `App.tsx` | ✅ Hazır (composition) |
| `RootLayout.tsx` | ✅ Hazır |
| `BackgroundScene.tsx` | ✅ Hazır |
| `data/portfolio.ts` | ⏳ Placeholder — gerçek bilgiler girilecek |
| `Navbar.tsx` | ⏳ Skeleton — içerik yazılacak |
| `Footer.tsx` | ⏳ Skeleton — içerik yazılacak |
| `Hero.tsx` | ⏳ Skeleton — içerik yazılacak |
| `About.tsx` | ⏳ Skeleton — içerik yazılacak |
| `Projects.tsx` | ⏳ Skeleton — içerik yazılacak |
| `Contact.tsx` | ⏳ Skeleton — içerik yazılacak |

---

## Sıradaki Adımlar (Öneri Sırası)

1. `data/portfolio.ts` → gerçek bilgileri doldur
2. `Navbar.tsx` → logo/isim + nav linkleri + mobil menü
3. `Hero.tsx` → status badge + başlık + CTA butonları
4. `About.tsx` → metin + skill badge'leri
5. `Projects.tsx` → kart grid'i
6. `Contact.tsx` → linkler / form
7. `Footer.tsx` → copyright
8. Responsive + accessibility pass
9. `npm run build` → deploy

---

## Kurallar (Her Session Geçerli)

- Kod değişikliğinden önce: etkilenen dosyaları listele → planı açıkla → onay bekle.
- Magic number/string yok — sabitler `data/portfolio.ts` ya da CSS değişkeni olarak tanımlanır.
- Her feature için happy path + hata durumu + edge case test yazılır.
- `App.tsx` composition-only kalır, iş mantığı taşınmaz.
- Tüm stiller `index.css`'te, component'larda `style={{}}` kullanılmaz.
