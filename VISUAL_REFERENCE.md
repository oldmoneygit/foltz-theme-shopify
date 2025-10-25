# VISUAL REFERENCE - Foltz Fanwear Shopify Theme

**Source:** Next.js project at `C:\Users\PC\Desktop\Foltz`
**Date:** 2025-10-25
**Purpose:** Detailed visual specifications for Shopify theme replication

---

## 🎨 GLOBAL DESIGN SYSTEM

### Color Palette
- **Primary Brand:** `#DAF10D` (Lime Yellow) - Used for CTAs, highlights, active states
- **Background:** `#000000` (Pure Black) and `#0a0a0a` (Dark variant)
- **Text:** `#FFFFFF` (White) with opacity variants (80%, 70%, 60%, 40%, 30%, 20%)
- **Accent (Rare):** `#02075E` (Navy Blue) - Only for hover states in light mode

### Typography
- **Font Family:** Inter (Google Fonts)
- **Weights Used:**
  - Regular (400) - Body text
  - Medium (500) - Subheadings
  - Semibold (600) - Emphasis
  - Bold (700) - Section titles
  - Extrabold (800) - Product names
  - Black (900) - Hero titles, CTAs

### Visual Effects
- **Glassmorphism:** `backdrop-blur(12px)` + `rgba(255, 255, 255, 0.05)` background
- **Borders:** `1px solid rgba(255, 255, 255, 0.1)` for cards
- **Shadows:** Yellow glow `0 0 20px rgba(218, 241, 13, 0.2)` on hover
- **Gradients:**
  - Dark Premium: `linear-gradient(135deg, #0a0a0a 0%, #000000 50%, #0a0a0a 100%)`
  - Overlay: `linear-gradient(to top, black/80%, black/30%, transparent)`

---

## 📐 COMPONENT SPECIFICATIONS

### 1. HEADER

**Desktop Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│ PROMOTIONAL BANNER (Yellow bg, black text, centered)           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   [Menu] [Logo - 160x48px]  [Search Bar]  [Theme] [♥] [Cart]  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  PREMIER  LA LIGA  TODAS LAS LIGAS ▼  SERIE A  ... CONTACTO   │
└─────────────────────────────────────────────────────────────────┘
```

**Dimensions:**
- Header height: `80px`
- Logo dimensions: Desktop `160px × 48px`, Mobile `128px × 40px`
- Search bar: Max-width `600px`, Height `48px`
- Cart/Wishlist icons: `24px` with badge `20px × 20px`
- Nav menu items: Font-size `13px`, Font-weight `900`, Letter-spacing `0.05em`

**Mobile Layout (< 1024px):**
```
┌─────────────────────────────────────────┐
│ PROMOTIONAL BANNER                       │
├─────────────────────────────────────────┤
│ [☰]      [Logo - 128x40px]   [♥] [Cart]│
└─────────────────────────────────────────┘

Mobile menu slides from RIGHT (85% width, max 384px)
```

**Behaviors:**
- Sticky position (`position: sticky; top: 0`)
- `z-index: 50`
- Backdrop blur: `backdrop-blur-xl`
- Border bottom: `2px solid rgba(255, 255, 255, 0.1)`
- Search dropdown appears below input with `z-index: 50`
- Ligas submenu dropdown on desktop (hover), accordion on mobile

**Search Results Dropdown:**
- Appears below search input with `margin-top: 8px`
- Background: `#171717` (zinc-900)
- Border: `2px solid rgba(255, 255, 255, 0.2)`
- Each result: Product image `48px × 48px`, name + price
- Hover state: `background: rgba(218, 241, 13, 0.2)`

---

### 2. HERO SECTION

**Layout:**
```
┌─────────────────────────────────────────┐
│                                         │
│        [Background Image]               │
│     + Gradient Overlay                  │
│                                         │
│     [Badge: Camisas Exclusivas]         │
│                                         │
│    CAMISAS DE FUTEBOL EXCLUSIVAS        │
│                                         │
│       [Explorar Colección Button]       │
│                                         │
│            Scroll ↓                     │
│                                         │
└─────────────────────────────────────────┘
```

**Dimensions:**
- Height: Desktop `100vh`, Tablet `85vh`, Mobile `70vh`
- Badge: `padding: 8px 16px`, `border: 1px solid rgba(218, 241, 13, 0.3)`, `border-radius: 9999px`
- Title: Font-size Desktop `4.5rem` (72px), Tablet `3.75rem`, Mobile `2.25rem`
- CTA Button: `padding: 16px 32px`, `border-radius: 9999px`

**Effects:**
- Background image overlay: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3), transparent)`
- Badge background: `rgba(218, 241, 13, 0.1)`
- Scroll indicator: Animated bounce (Desktop only)
- Content fade-in animation: `opacity 0→1`, `translateY 30px→0`, staggered delays

---

### 3. PRODUCT CARD

**Layout:**
```
┌──────────────────────────┐
│ [Stock]      [Wishlist♥] │
│                          │
│                          │
│    [Product Image]       │
│      aspect 3:4          │
│                          │
│                          │
├──────────────────────────┤
│ Product Name (2 lines)   │
│ $12,999 ← Regular price  │
│ $9,999 ← Sale price      │
│ [COMPRA 1 LLEVA 2]       │
└──────────────────────────┘
```

**Dimensions:**
- Card: `border-radius: 16px`
- Image aspect ratio: `3:4`
- Content padding: `12px`
- Stock badge: Top-left `8px`, Font-size `10px`, `padding: 2px 8px`
- Wishlist button: Top-right `8px`, Size `36px`, Icon `18px`
- Name: Font-size `16px`, Font-weight `700`, Min-height `40px` (2 lines), `line-clamp: 2`
- Price (regular): Font-size `16px`, Color `#9CA3AF`, `text-decoration: line-through`
- Price (sale): Font-size `20px`, Font-weight `700`, Color `#DAF10D`
- Badge: `padding: 6px 12px`, `border-radius: 9999px`, Font-size `10px` mobile / `12px` desktop

**States:**
- Default: `border: 1px solid #27272A` (zinc-800)
- Hover: `border: 1px solid rgba(218, 241, 13, 0.5)`, `transform: translateY(-8px)`
- Image scale on hover: `transform: scale(1.05)`
- Transition: `all 300ms cubic-bezier(0.4, 0, 0.2, 1)`

**Colors:**
- Background: `linear-gradient(to bottom right, #18181B, #000000)` (zinc-900 → black)
- Stock badges:
  - Limited: `background: #F97316` (orange-500)
  - Sold Out: `background: #EF4444` (red-500)

---

### 4. FOOTER

**Structure:**
```
┌─────────────────────────────────────────────────────────────┐
│                         [Logo]                              │
│                 Tagline text centered                       │
│                                                             │
│  [Newsletter Signup Form - Email + Subscribe Button]       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  NAVEGACIÓN  |  SOPORTE  |  LEGAL  |  SÍGUENOS            │
│   - Link 1   |  - Link 1  |  Link 1 |  [FB] [IG] [TW]     │
│   - Link 2   |  - Link 2  |  Link 2 |                      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  © 2024 Foltz Fanwear | Todos los derechos reservados     │
│         Métodos de pago: [Icons]                           │
└─────────────────────────────────────────────────────────────┘
```

**Dimensions:**
- Top section padding: `80px 0`
- Logo: `120px × 36px`
- Newsletter input: Height `48px`, `max-width: 600px`
- Links section padding: `64px 0`
- Column gap: `48px` desktop, `32px` mobile
- Social icons: `40px × 40px` with `8px` padding
- Bottom bar padding: `24px 0`
- Border top: `1px solid rgba(255, 255, 255, 0.1)`

**Typography:**
- Section titles: Font-size `18px`, Font-weight `700`, `text-transform: uppercase`
- Links: Font-size `14px`, Color `rgba(255, 255, 255, 0.7)`
- Link hover: Color `#DAF10D`
- Copyright: Font-size `14px`, Color `rgba(255, 255, 255, 0.5)`

---

### 5. CAROUSEL / SWIPER

**BestSellers Carousel:**
```
← [Card] [Card] [Card] [Card] [Card] →
        ● ● ● ○ ○ ○ ○ ○ ○
```

**Configuration:**
- Desktop: 4 cards visible, `spaceBetween: 24px`
- Tablet: 3 cards, `spaceBetween: 20px`
- Mobile: 1.2 cards, `spaceBetween: 16px`
- Navigation arrows: `44px × 44px`, Color `#DAF10D`, `opacity: 0` → `opacity: 1` on hover
- Pagination bullets:
  - Default: `8px` diameter, `rgba(255, 255, 255, 0.3)`
  - Active: `32px` width, `8px` height, `#DAF10D`
  - Margin: `0 6px`

---

### 6. BUTTONS

**Primary Button (CTA):**
```css
background: #DAF10D;
color: #000000;
padding: 12px 32px;
border-radius: 8px;
font-weight: 700;
font-size: 14px;
text-transform: uppercase;
letter-spacing: 0.05em;
transition: all 300ms;
```
- Hover: `background: #c5d60b`, `transform: scale(1.05)`
- Active: `transform: scale(0.95)`
- Shadow: `0 4px 14px rgba(218, 241, 13, 0.39)`

**Secondary Button:**
```css
background: rgba(255, 255, 255, 0.05);
color: #FFFFFF;
border: 1px solid rgba(255, 255, 255, 0.2);
padding: 12px 32px;
border-radius: 8px;
font-weight: 600;
backdrop-filter: blur(8px);
```
- Hover: `background: rgba(255, 255, 255, 0.1)`, `border-color: rgba(218, 241, 13, 0.3)`

**Icon-only Button (Wishlist, Cart):**
```css
width: 40px;
height: 40px;
border-radius: 50%;
background: rgba(0, 0, 0, 0.6);
backdrop-filter: blur(16px);
```
- Hover: `background: #DAF10D`, Icon color changes to `#000000`

---

### 7. FORM INPUTS

**Text Input / Search:**
```css
width: 100%;
padding: 12px 16px;
background: rgba(255, 255, 255, 0.1);
border: 2px solid rgba(255, 255, 255, 0.2);
border-radius: 8px;
color: #FFFFFF;
font-size: 14px;
```
- Focus: `border-color: #DAF10D`, `outline: none`
- Placeholder: `color: rgba(255, 255, 255, 0.4)`

**Select Dropdown:**
```css
appearance: none;
background: rgba(255, 255, 255, 0.1);
padding: 12px 40px 12px 16px;
border: 2px solid rgba(255, 255, 255, 0.2);
border-radius: 8px;
background-image: url('chevron-down-icon');
background-position: right 12px center;
background-repeat: no-repeat;
```

---

### 8. CARDS & CONTAINERS

**Glassmorphic Card:**
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 12px;
padding: 32px;
```
- Hover: `border-color: rgba(218, 241, 13, 0.3)`

**League Card (Large):**
```css
height: 320px;
background: radial-gradient(circle at top right, rgba(218, 241, 13, 0.03), transparent 50%);
border: 2px solid rgba(255, 255, 255, 0.1);
border-radius: 24px;
overflow: hidden;
position: relative;
```
- Background image with overlay
- Content at bottom with `padding: 32px`
- Title: Font-size `28px`, Font-weight `900`
- Hover: `transform: translateY(-8px)`, `border-color: rgba(218, 241, 13, 0.5)`

---

### 9. ANIMATIONS

**Fade In:**
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
animation: fadeIn 0.5s ease-out;
```

**Shimmer (Loading):**
```css
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
animation: shimmer 2s linear infinite;
```

**Bounce (Scroll Indicator):**
```css
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}
animation: bounce 1.5s ease-in-out infinite;
```

---

### 10. GRID LAYOUTS

**Product Grid:**
- Desktop (≥1280px): `grid-template-columns: repeat(4, 1fr)`, Gap `24px`
- Tablet (768px-1279px): `grid-template-columns: repeat(3, 1fr)`, Gap `20px`
- Mobile (<768px): `grid-template-columns: repeat(2, 1fr)`, Gap `16px`

**League Cards Grid:**
- Desktop: `grid-template-columns: repeat(3, 1fr)`, Gap `24px`
- Tablet: `grid-template-columns: repeat(2, 1fr)`, Gap `20px`
- Mobile: `grid-template-columns: 1fr`, Gap `16px`

---

### 11. SPACING SYSTEM

**Container:**
- Max-width: `1280px` (xl breakpoint)
- Padding: Desktop `24px`, Mobile `16px`

**Section Spacing:**
- Desktop: `padding: 80px 0`
- Tablet: `padding: 64px 0`
- Mobile: `padding: 48px 0`

**Component Gaps:**
- Tight: `8px`
- Normal: `16px`
- Relaxed: `24px`
- Loose: `32px`

---

### 12. RESPONSIVE BREAKPOINTS

```javascript
sm:  640px   // Small devices (landscape phones)
md:  768px   // Medium devices (tablets)
lg:  1024px  // Large devices (desktops)
xl:  1280px  // Extra large devices
2xl: 1536px  // Ultra wide screens
```

**Mobile-First Approach:**
- Default styles for mobile
- Use min-width media queries for larger screens
- Hide/show elements: `class="hidden lg:block"` (hidden on mobile, visible on desktop)

---

### 13. Z-INDEX LAYERS

```
1000: Dropdown menus
1020: Sticky header
1030: Fixed elements
1040: Modal backdrop
1050: Modal content
1060: Popovers
1070: Tooltips
```

---

### 14. SCROLLBAR CUSTOMIZATION

```css
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #DAF10D, #c5d60b);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #DAF10D;
}
```

---

### 15. ICON SIZES

- Small: `16px` (inline text icons)
- Medium: `20px` (navigation icons)
- Large: `24px` (header icons, product card wishlist)
- Extra Large: `32px` (feature icons)
- Hero: `48px` (section decorative icons)

---

### 16. IMAGE OPTIMIZATION

**Product Images:**
- Format: WebP with JPG fallback
- Quality: 75%
- Sizes attribute: `(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw`
- Loading: `lazy` (except above-the-fold)
- Aspect ratio: Maintain 3:4 for consistency

**Hero Image:**
- Format: WebP
- Quality: 85%
- Size: `sizes="100vw"`
- Loading: `priority` (above-the-fold)

---

### 17. ACCESSIBILITY

**Focus States:**
```css
:focus-visible {
  outline: 2px solid #DAF10D;
  outline-offset: 2px;
}
```

**Contrast:**
- All text on black backgrounds uses white with minimum 70% opacity for readability
- Yellow (#DAF10D) on black has contrast ratio > 7:1
- Interactive elements have clear hover/focus states

**ARIA Labels:**
- All icon-only buttons have `aria-label`
- Mobile menu has `aria-expanded`
- Search has `aria-describedby` for instructions

---

## 📱 MOBILE-SPECIFIC BEHAVIORS

1. **Header:**
   - Hamburger menu slides from right (85% width)
   - Logo shrinks to 128×40px
   - Search moves to bottom of mobile menu

2. **Product Cards:**
   - 2 columns grid
   - Larger tap targets (min 44×44px)
   - Badge text responsive (10px → 12px)

3. **Carousel:**
   - Shows 1.2 cards (peek of next card)
   - Touch swipe enabled
   - Auto-height adjustment

4. **Forms:**
   - Full-width inputs
   - Larger font-size to prevent zoom (16px minimum)
   - Stacked layout for form fields

---

## 🎯 IMPLEMENTATION NOTES

### Priority Order:
1. Mobile layout first (default)
2. Tablet adjustments (md breakpoint)
3. Desktop enhancements (lg+ breakpoints)

### Performance:
- Use CSS transforms for animations (GPU-accelerated)
- Lazy load images below fold
- Minimize JavaScript (use CSS when possible)
- Debounce search input (300ms)

### Browser Support:
- Modern browsers (last 2 versions)
- No IE11 support
- CSS Grid and Flexbox required
- backdrop-filter support (with fallback)

---

**END OF VISUAL REFERENCE**

*This document should be used alongside `design-tokens.json` for complete design specifications.*
