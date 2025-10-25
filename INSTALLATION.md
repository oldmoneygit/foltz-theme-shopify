# Foltz Fanwear - Shopify Theme Installation Guide

**Version:** 1.0.0
**Date:** 2025-10-25
**Extracted from:** Next.js project using REAL design values

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation Methods](#installation-methods)
3. [Theme Configuration](#theme-configuration)
4. [Menu Setup](#menu-setup)
5. [Content Setup](#content-setup)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Before installing this theme, ensure you have:

- [ ] Active Shopify store (Plus, Advanced, or Basic plan)
- [ ] Admin access to the Shopify dashboard
- [ ] Products uploaded to Shopify
- [ ] Collections created (Premier League, La Liga, etc.)
- [ ] Logo images prepared (white version for dark theme)
- [ ] Hero background image (recommended: 2000x1200px)
- [ ] Social media URLs ready

---

## 📦 Installation Methods

### Method 1: ZIP Upload (Recommended)

1. **Create ZIP file:**
   ```bash
   cd C:\Users\PC\Desktop\Foltz
   # Compress the shopify-theme-foltz folder to shopify-theme-foltz.zip
   ```

2. **Upload to Shopify:**
   - Go to: **Online Store → Themes**
   - Click: **Add theme → Upload ZIP file**
   - Select: `shopify-theme-foltz.zip`
   - Wait for upload to complete

3. **Preview the theme:**
   - Click **Actions → Preview** to see the theme
   - Do NOT publish yet - configure first

### Method 2: Shopify CLI (Advanced)

```bash
# Install Shopify CLI if not already installed
npm install -g @shopify/cli @shopify/theme

# Navigate to theme folder
cd C:\Users\PC\Desktop\Foltz\shopify-theme-foltz

# Authenticate with Shopify
shopify login

# Push theme to store
shopify theme push --unpublished

# Or, develop with live reload
shopify theme dev
```

---

## ⚙️ Theme Configuration

### 1. Header Settings

Go to: **Theme Customizer → Header**

- **Logo:** Upload `logo-white.png` (160x48px recommended)
- **Promotional Text:** "ENVÍO GRATIS A TODA ARGENTINA"
- **Main Menu:** Select "Main Menu" (create if doesn't exist)

### 2. Footer Settings

Go to: **Theme Customizer → Footer**

- **Footer Logo:** Upload logo (120x36px)
- **Tagline:** "Los mejores jerseys de fútbol importados..."
- **Social Media:**
  - Instagram: https://instagram.com/foltzfanwear
  - Facebook: https://facebook.com/foltzfanwear
  - Twitter: https://twitter.com/foltzfanwear
- **Contact Info:**
  - Email: contacto@foltzfanwear.com
  - Phone: +54 9 11 1234-5678
  - Address: Buenos Aires, Argentina

**Add Footer Menus (Blocks):**

1. Click **Add block → Menu Column**
   - Title: "Empresa"
   - Menu: Select "Footer - Company"

2. Add another **Menu Column**
   - Title: "Comprar"
   - Menu: Select "Footer - Shop"

3. Add another **Menu Column**
   - Title: "Ayuda"
   - Menu: Select "Footer - Help"

### 3. Homepage Setup

Go to: **Online Store → Pages → Home**

**Add Sections (in order):**

1. **Hero**
   - Background Image: Upload hero image (2000x1200px)
   - Badge Text: "Camisas Exclusivas"
   - Title: "CAMISAS DE FUTEBOL EXCLUSIVAS"
   - Button Text: "Explorar Colección"
   - Button Link: `/collections/all`

2. **Featured Collection** (for BestSellers)
   - Collection: Select "Best Sellers" collection
   - Products to show: 8

3. **Featured Collection** (for Premier League)
   - Collection: Select "Premier League" collection
   - Products to show: 8

4. **Featured Collection** (for La Liga)
   - Collection: Select "La Liga" collection
   - Products to show: 8

---

## 🔧 Menu Setup

### Create Main Menu

Go to: **Navigation → Main Menu**

Add these menu items (in order):

```
PREMIER LEAGUE → /collections/premier-league
LA LIGA → /collections/la-liga
TODAS AS LIGAS → /pages/ligas (dropdown)
  └── Premier League → /collections/premier-league
  └── La Liga → /collections/la-liga
  └── Serie A → /collections/serie-a
  └── Bundesliga → /collections/bundesliga
  └── Ligue 1 → /collections/ligue-1
  └── Sul-Americana → /collections/sul-americana
  └── Primeira Liga → /collections/primeira-liga
  └── Eredivisie → /collections/eredivisie
SERIE A → /collections/serie-a
BUNDESLIGA → /collections/bundesliga
COMPRA 1 LLEVA 2 → #bestsellers
SEGUIMIENTO → /pages/rastreamento
CONTACTO → /pages/contato
```

### Create Footer Menus

**Footer - Company:**
```
Sobre Nosotros → /pages/sobre-nosotros
Nuestra Historia → /pages/historia
Contacto → /pages/contato
Trabaja con Nosotros → /pages/careers
```

**Footer - Shop:**
```
Argentina → /collections/argentina
Brasil → /collections/brasil
Europa → /collections/europa
La Liga → /collections/la-liga
Premier League → /collections/premier-league
```

**Footer - Help:**
```
Preguntas Frecuentes → /pages/faq
Seguimiento de Pedido → /pages/rastreamento
Guía de Tallas → /pages/guia-tamanhos
Cambios y Devoluciones → /pages/politica-trocas
Política de Privacidad → /pages/privacidade
```

---

## 📝 Content Setup

### Required Pages

Create these pages: **Online Store → Pages → Add page**

1. **sobre-nosotros** (About Us)
2. **historia** (Our Story)
3. **contato** (Contact)
4. **faq** (FAQ)
5. **rastreamento** (Order Tracking)
6. **guia-tamanhos** (Size Guide)
7. **politica-trocas** (Returns Policy)
8. **privacidade** (Privacy Policy)
9. **ligas** (All Leagues page)
10. **favoritos** (Wishlist - can be empty, handled by JavaScript)

### Required Collections

Create these collections: **Products → Collections → Create collection**

1. **best-sellers** (Featured products)
2. **premier-league**
3. **la-liga**
4. **serie-a**
5. **bundesliga**
6. **ligue-1**
7. **sul-americana**
8. **primeira-liga**
9. **eredivisie**
10. **argentina**
11. **brasil**
12. **europa**

---

## 🎨 Theme Assets

### Upload Required Images

Go to: **Content → Files → Upload files**

Upload these files to Shopify's file storage:

1. **logo-white.png** (160x48px) - White logo for dark theme
2. **hero-v2.jpg** (2000x1200px) - Homepage hero image
3. **favicon.ico** - Browser favicon

### Product Images

- All product images should be uploaded via Shopify Products
- Images are served from Shopify CDN
- Recommended size: 800x1066px (3:4 aspect ratio)

---

## 🧪 Testing

### Pre-Launch Checklist

- [ ] Logo displays correctly (white version)
- [ ] All menu links work
- [ ] Mobile menu opens and closes properly
- [ ] Cart functionality works (add/remove items)
- [ ] Wishlist saves to localStorage
- [ ] Product cards display correctly
- [ ] Search functionality works
- [ ] Footer social links are correct
- [ ] Contact information is accurate
- [ ] All pages are created and accessible
- [ ] Collections have products
- [ ] Hero image loads properly
- [ ] Mobile responsive design works (test on phone)
- [ ] Checkout process works (test order)

### Browser Testing

Test on:
- ✅ Chrome (desktop & mobile)
- ✅ Safari (desktop & mobile)
- ✅ Firefox
- ✅ Edge

---

## 🐛 Troubleshooting

### Issue: Cart count doesn't update

**Solution:**
- Check browser console for errors
- Ensure Shopify Ajax API is enabled
- Clear browser cache and cookies

### Issue: Mobile menu doesn't open

**Solution:**
- Verify `theme.js` is loaded (check Network tab)
- Check for JavaScript errors in console
- Ensure menu toggle IDs match (mobile-menu-toggle, mobile-menu)

### Issue: Products not showing

**Solution:**
- Verify products are assigned to collections
- Check product availability (in stock, published)
- Ensure collection handles match menu links

### Issue: Images not loading

**Solution:**
- Verify images are uploaded to Shopify Files
- Check image URLs in theme customizer
- Ensure images are published and not archived

### Issue: Styles look broken

**Solution:**
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear Shopify theme cache
- Re-upload theme CSS file

### Issue: Hero section is blank

**Solution:**
- Upload hero background image in Theme Customizer
- Verify image dimensions (min 2000x1200px)
- Check if hero section is enabled in homepage

---

## 🚀 Going Live

### Final Steps Before Publishing

1. **Complete all testing** (see checklist above)
2. **Backup current theme** (if replacing existing theme)
3. **Double-check all settings** in Theme Customizer
4. **Test checkout flow** with a real order (use discount code)
5. **Verify analytics** are set up (Google Analytics, Facebook Pixel, etc.)

### Publish Theme

1. Go to: **Online Store → Themes**
2. Find "Foltz Fanwear" theme
3. Click **Actions → Publish**
4. Confirm publication

### Post-Launch Monitoring

- Monitor site speed (use Google PageSpeed Insights)
- Check error logs for any JavaScript issues
- Monitor cart abandonment rates
- Track user feedback

---

## 📞 Support

For issues related to this theme:

1. Check [design-tokens.json](./design-tokens.json) for design specifications
2. Review [VISUAL_REFERENCE.md](./VISUAL_REFERENCE.md) for component details
3. Check Next.js reference project at `C:\Users\PC\Desktop\Foltz`

---

## 📄 Theme Files Reference

### Key Files:

- **CSS:** `assets/theme.css` (1312 lines, all design tokens)
- **JavaScript:** `assets/theme.js` (mobile menu, cart, wishlist)
- **Layout:** `layout/theme.liquid` (main HTML structure)
- **Header:** `sections/header.liquid` (sticky header with nav)
- **Footer:** `sections/footer.liquid` (4-column footer)
- **Hero:** `sections/hero.liquid` (homepage hero)
- **Product Card:** `snippets/product-card.liquid` (reusable product display)
- **Icons:** `snippets/icon-*.liquid` (SVG icons)

### Design Tokens:

All design values are documented in:
- `design-tokens.json` - Complete design system
- `VISUAL_REFERENCE.md` - Visual specifications with diagrams

---

## ✨ Features Included

- ✅ Fully responsive (mobile-first design)
- ✅ Dark theme with glassmorphism effects
- ✅ Sticky header with search
- ✅ Mobile hamburger menu (slides from right)
- ✅ Shopping cart (Shopify Ajax API)
- ✅ Wishlist (localStorage-based)
- ✅ Product cards with hover effects
- ✅ "COMPRA 1 LLEVA 2" promotion badges
- ✅ Stock indicators (limited stock, sold out)
- ✅ Smooth scroll animations
- ✅ Custom scrollbar styling
- ✅ Social media integration
- ✅ Multi-language ready (ES/EN)
- ✅ SEO optimized
- ✅ Performance optimized
- ✅ Accessibility compliant (ARIA labels)

---

**Theme created:** 2025-10-25
**Based on:** Next.js Foltz Fanwear project
**Design tokens:** 100% REAL values extracted from source

🤖 Theme replication completed successfully by Claude Code
