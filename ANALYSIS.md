# 🔍 ANÁLISE COMPARATIVA - IMPACT vs FOLTZ

**Data:** 2025-10-25
**Versão Impact:** v6.6.0
**Versão FOLTZ:** 1.0.0 (Fase 2 Completa)

---

## 📊 FASE 1: COMPARAÇÃO DE ESTRUTURA DE ARQUIVOS

### 1.1 Estrutura do Tema Impact (v6.6.0)

#### Layout (3 arquivos)
- ✅ `layout/theme.liquid` - Layout principal
- ✅ `layout/gift-card.liquid` - Layout para gift cards
- ✅ `layout/password.liquid` - Layout para página de senha

#### Config (2 arquivos)
- ✅ `config/settings_schema.json` - Schema de configurações
- ✅ `config/settings_data.json` - Valores de configurações

#### Assets (~75 arquivos)
**JavaScript:**
- theme.js, theme.min.js, global.js, sections.js
- jquery.js, jquery-3.6.0.min.js, bootstrap.min.js
- flickity.pkgd.js (carrossel)
- photoswipe.min.js (galeria de imagens)
- apps.js, custom.js, vendor.min.js

**CSS:**
- theme.css, base.css
- component-cart.css, component-localization-form.css
- country-flags.css, apps.css
- font-awesome.min.css

**SVG/Images:**
- Payment icons (visa.svg, mastercard.svg, amex.svg, pix.svg, boleto.svg, etc.)
- UI icons (arrow-down.svg, checkmark.svg, truck.svg, return.svg, garantia.svg)
- Cursors (cursor-close.svg, cursor-zoom-in.svg, cursor-zoom-out.svg)
- country-flags.png, country-flags-2x.png

**Fonts:**
- FontePIX.OTF, FontePIX-BOLD.OTF

#### Sections (~90 arquivos)
**Main sections (obrigatórias para funcionalidade):**
- ✅ main-article.liquid
- ✅ main-blog.liquid
- ✅ main-cart.liquid
- ✅ main-collection.liquid
- ✅ main-gift-card.liquid
- ✅ main-list-collections.liquid
- ✅ main-not-found.liquid (404)
- ✅ main-page.liquid
- ✅ main-password.liquid
- ✅ main-product.liquid
- ✅ main-search.liquid

**Customer sections (CRÍTICAS - faltando no FOLTZ):**
- ✅ main-customers-account.liquid
- ✅ main-customers-activate-account.liquid
- ✅ main-customers-addresses.liquid
- ✅ main-customers-login.liquid
- ✅ main-customers-order.liquid
- ✅ main-customers-register.liquid
- ✅ main-customers-reset-password.liquid

**Header/Footer:**
- ✅ header.liquid
- ✅ footer.liquid
- ✅ minimal-header.liquid
- ✅ announcement-bar.liquid

**Utility sections:**
- cart-drawer.liquid, search-drawer.liquid
- newsletter-popup.liquid, popups.liquid
- pickup-availability.liquid

**Content sections:**
- featured-collection.liquid, featured-product.liquid
- slideshow.liquid, hero sections
- blog-posts.liquid, testimonials.liquid
- multi-column.liquid, media-grid.liquid
- accordion-content.liquid, faq.liquid
- etc. (~60 more sections)

#### Snippets (~100 arquivos)
**Essential snippets:**
- product-card.liquid, product-item.liquid
- buy-buttons.liquid, variant-picker.liquid
- price-list.liquid, product-badges.liquid
- product-gallery.liquid, product-info.liquid
- line-item.liquid (cart)
- mini-cart.liquid
- mobile-menu.liquid, desktop-menu.liquid
- mega-menu.liquid
- facets.liquid (filtros de coleção)
- active-facets.liquid
- pagination.liquid
- icon.liquid
- button.liquid
- input.liquid, select.liquid, checkbox.liquid
- media.liquid
- article-item.liquid, blog-post-card.liquid
- banner.liquid
- css-variables.liquid
- js-variables.liquid
- microdata-schema.liquid (SEO)
- social-meta-tags.liquid
- share-link.liquid
- localization-selector.liquid (idioma/moeda)
- pickup-availability.liquid
- address-form.liquid
- accordion.liquid
- swatch.liquid (seletor de cores)
- qty-selector.liquid
- product-rating.liquid
- inventory.liquid

**App integrations:**
- areviews-dsgn-theme.liquid
- ryviu-dsgn-theme.liquid
- YampiSnippet.liquid
- aliexpress_reviews.liquid
- etc.

#### Templates
**JSON templates (principais):**
- 404.json
- article.json
- blog.json
- cart.json (+ cart.context.br.json, cart.context.international.json)
- collection.json
- index.json (+ index.context.br.json, index.context.international.json)
- list-collections.json
- page.json, page.contact.json
- password.json
- product.json (+ product.original-1.json, original-2.json, etc.)
- search.json

**Liquid templates:**
- cart.mini-cart.liquid
- collection.brand.liquid
- gift_card.liquid
- page.faq.liquid
- page.team.liquid
- product.quick-view.liquid
- search.ajax.liquid
- search.content.liquid

**Customer templates (CRÍTICAS - templates/customers/):**
- ✅ customers/account.json + account.liquid
- ✅ customers/activate_account.json + activate_account.liquid
- ✅ customers/addresses.json + addresses.liquid
- ✅ customers/login.json + login.liquid
- ✅ customers/order.json + order.liquid
- ✅ customers/register.json + register.liquid
- ✅ customers/reset_password.json + reset_password.liquid

#### Locales (~35 arquivos)
- en.default.json (inglês padrão)
- es.json (espanhol)
- pt-BR.json (português brasileiro)
- + 30 outros idiomas
- Schema translations: es.schema.json, fr.schema.json, etc.

---

### 1.2 Estrutura do Tema FOLTZ (atual)

#### Layout (1 arquivo)
- ✅ `layout/theme.liquid`

#### Config (2 arquivos)
- ✅ `config/settings_schema.json`
- ✅ `config/settings_data.json`

#### Assets (3 arquivos)
- ✅ `assets/theme.css` (1312 linhas)
- ✅ `assets/theme.js` (450 linhas)
- ⚠️ `assets/logo-white.png` (placeholder - precisa ser substituído)

#### Sections (2 arquivos)
- ✅ `sections/header.liquid` (390 linhas)
- ✅ `sections/footer.liquid` (300 linhas)
- ✅ `sections/hero.liquid`

#### Snippets (5 arquivos)
- ✅ `snippets/product-card.liquid`
- ✅ `snippets/icon-cart.liquid`
- ✅ `snippets/icon-search.liquid`
- ✅ `snippets/icon-heart.liquid`
- ✅ `snippets/icon-menu.liquid`

#### Templates (6 arquivos - todos básicos/placeholder)
- ✅ `templates/index.liquid`
- ✅ `templates/product.liquid`
- ✅ `templates/collection.liquid`
- ✅ `templates/cart.liquid`
- ✅ `templates/page.liquid`
- ✅ `templates/search.liquid`

#### Locales (2 arquivos)
- ✅ `locales/en.default.json`
- ✅ `locales/es.json`

---

## 🚨 ARQUIVOS FALTANDO NO FOLTZ (CRÍTICOS)

### ❌ CRÍTICO NÍVEL 1 - Theme não funciona sem estes:

#### Layout faltando:
- ❌ `layout/password.liquid` - Para modo manutenção/senha
- ❌ `layout/gift-card.liquid` - Para gift cards

#### Templates customers/ faltando (TODOS):
- ❌ `templates/customers/account.json`
- ❌ `templates/customers/activate_account.json`
- ❌ `templates/customers/addresses.json`
- ❌ `templates/customers/login.json`
- ❌ `templates/customers/order.json`
- ❌ `templates/customers/register.json`
- ❌ `templates/customers/reset_password.json`

**SEM ESTES ARQUIVOS:**
- ❌ Customers não podem fazer login
- ❌ Customers não podem se registrar
- ❌ Customers não podem ver pedidos
- ❌ Customers não podem editar endereços
- ❌ Recuperação de senha não funciona
- ❌ Área de conta do cliente resulta em erro 404

#### Sections principais faltando:
- ❌ `sections/main-customers-account.liquid`
- ❌ `sections/main-customers-activate-account.liquid`
- ❌ `sections/main-customers-addresses.liquid`
- ❌ `sections/main-customers-login.liquid`
- ❌ `sections/main-customers-order.liquid`
- ❌ `sections/main-customers-register.liquid`
- ❌ `sections/main-customers-reset-password.liquid`
- ❌ `sections/main-404.liquid` (404 page)
- ❌ `sections/main-password.liquid` (password page)

#### Templates JSON faltando:
- ❌ `templates/404.json`
- ❌ `templates/password.json`
- ❌ `templates/article.json`
- ❌ `templates/blog.json`
- ❌ `templates/list-collections.json`
- ❌ `templates/gift_card.liquid`

### ❌ CRÍTICO NÍVEL 2 - Funcionalidade essencial:

#### Snippets essenciais faltando:
- ❌ `snippets/buy-buttons.liquid` - Botões de compra
- ❌ `snippets/variant-picker.liquid` - Seletor de variantes
- ❌ `snippets/price-list.liquid` - Exibição de preços
- ❌ `snippets/product-gallery.liquid` - Galeria de produto
- ❌ `snippets/product-info.liquid` - Informações do produto
- ❌ `snippets/line-item.liquid` - Item do carrinho
- ❌ `snippets/mini-cart.liquid` - Mini carrinho
- ❌ `snippets/facets.liquid` - Filtros de coleção
- ❌ `snippets/pagination.liquid` - Paginação
- ❌ `snippets/icon.liquid` - Sistema de ícones
- ❌ `snippets/button.liquid` - Sistema de botões
- ❌ `snippets/input.liquid` - Campos de input
- ❌ `snippets/media.liquid` - Media (imagens/vídeos)
- ❌ `snippets/css-variables.liquid` - Variáveis CSS dinâmicas
- ❌ `snippets/social-meta-tags.liquid` - SEO/Open Graph
- ❌ `snippets/localization-selector.liquid` - Seletor de idioma/moeda

### ⚠️ NÍVEL 3 - Melhorias de UX:

#### Sections úteis faltando:
- ⚠️ `sections/announcement-bar.liquid` (já tem promotional banner no header)
- ⚠️ `sections/cart-drawer.liquid` - Carrinho em drawer
- ⚠️ `sections/search-drawer.liquid` - Busca em drawer
- ⚠️ `sections/newsletter-popup.liquid` - Newsletter popup
- ⚠️ `sections/featured-collection.liquid` - Coleção em destaque
- ⚠️ `sections/featured-product.liquid` - Produto em destaque
- ⚠️ `sections/slideshow.liquid` - Slideshow de imagens
- ⚠️ `sections/blog-posts.liquid` - Posts do blog
- ⚠️ `sections/product-recommendations.liquid` - Recomendações

#### Assets faltando:
- ⚠️ SVG icons de pagamento (visa.svg, mastercard.svg, pix.svg, etc.)
- ⚠️ Biblioteca de carrossel (Flickity ou Swiper)
- ⚠️ Biblioteca de zoom de imagem (PhotoSwipe)

---

## 📋 COMPARAÇÃO DE FUNCIONALIDADES

| Funcionalidade | Impact | FOLTZ | Status |
|---|---|---|---|
| **Layout principal** | ✅ | ✅ | OK |
| **Layout password** | ✅ | ❌ | FALTANDO |
| **Layout gift-card** | ✅ | ❌ | FALTANDO |
| **Header com menu** | ✅ | ✅ | OK |
| **Footer** | ✅ | ✅ | OK |
| **Hero section** | ✅ | ✅ | OK |
| **Product card** | ✅ | ✅ | OK |
| **Página inicial** | ✅ | ✅ | BÁSICO |
| **Página de produto** | ✅ | ✅ | BÁSICO |
| **Página de coleção** | ✅ | ✅ | BÁSICO |
| **Carrinho** | ✅ | ✅ | BÁSICO |
| **Busca** | ✅ | ✅ | BÁSICO |
| **Página 404** | ✅ | ❌ | FALTANDO |
| **Blog** | ✅ | ❌ | FALTANDO |
| **Login de cliente** | ✅ | ❌ | FALTANDO |
| **Registro de cliente** | ✅ | ❌ | FALTANDO |
| **Conta do cliente** | ✅ | ❌ | FALTANDO |
| **Pedidos do cliente** | ✅ | ❌ | FALTANDO |
| **Endereços do cliente** | ✅ | ❌ | FALTANDO |
| **Reset de senha** | ✅ | ❌ | FALTANDO |
| **Seletor de variantes** | ✅ | ❌ | FALTANDO |
| **Galeria de produto** | ✅ | ❌ | FALTANDO |
| **Filtros de coleção** | ✅ | ❌ | FALTANDO |
| **Paginação** | ✅ | ❌ | FALTANDO |
| **SEO/Meta tags** | ✅ | ❌ | FALTANDO |
| **Seletor idioma/moeda** | ✅ | ❌ | FALTANDO |
| **Gift cards** | ✅ | ❌ | FALTANDO |

---

## 🎯 RESUMO DA ANÁLISE

### Estatísticas:

| Categoria | Impact | FOLTZ | % Completo |
|---|---|---|---|
| **Layout** | 3 | 1 | 33% |
| **Config** | 2 | 2 | 100% |
| **Assets** | ~75 | 3 | 4% |
| **Sections** | ~90 | 3 | 3% |
| **Snippets** | ~100 | 5 | 5% |
| **Templates** | ~45 | 6 | 13% |
| **Locales** | ~35 | 2 | 6% |

**Completude Geral do FOLTZ: ~10%**

### Conclusões:

1. **✅ O que está BOM no FOLTZ:**
   - Design system completo e bem documentado (design-tokens.json)
   - CSS bem estruturado com variáveis CSS custom properties
   - Header e Footer funcionais com mobile menu
   - Product card com visual correto
   - Hero section implementada
   - JavaScript básico funcional

2. **❌ GAPS CRÍTICOS que impedem funcionamento:**
   - **ZERO funcionalidade de customer account** (login, registro, pedidos, endereços)
   - **SEM template 404** (erro ao acessar página inexistente)
   - **SEM password page** (não pode usar modo manutenção)
   - **SEM seletor de variantes** (não pode escolher tamanhos/cores)
   - **SEM galeria de produto** (não pode ver múltiplas imagens)
   - **SEM filtros** (não pode filtrar produtos em coleções)
   - **SEM SEO básico** (social meta tags, microdata)

3. **⚠️ Templates básicos precisam ser expandidos:**
   - Os 6 templates existentes (index, product, collection, cart, page, search) são apenas placeholders
   - Precisam ser convertidos para JSON format + sections
   - Precisam integrar com snippets corretos

---

## 🚀 PRÓXIMOS PASSOS

### FASE 2: Analisar configurações (config/)
- Comparar settings_schema.json
- Comparar settings_data.json
- Identificar configurações faltando

### FASE 3: Verificar templates
- Comparar cada template
- Identificar estrutura JSON vs Liquid
- Verificar seções usadas

### FASE 4: Verificar sections
- Comparar sections principais
- Identificar schemas faltando
- Verificar liquid syntax

### FASE 5: Verificar snippets
- Comparar snippets essenciais
- Identificar lógica faltando

### FASES 6-10: Correção e validação
- Criar arquivos faltando
- Testar funcionalidade
- Validar com Shopify CLI

---

## 📝 FASE 2: COMPARAÇÃO DE CONFIGURAÇÕES

### 2.1 settings_schema.json

| Tema | Linhas | Seções | Configurações |
|---|---|---|---|
| **Impact** | 1,483 | ~50 | ~200+ |
| **FOLTZ** | 27 | 5 | 0 |

#### Seções no Impact (exemplos):
- ✅ Aparência e espaçamento (page_width, section_spacing, border_radius, shadows, icon_style, button_style)
- ✅ Cores (primary, secondary, background, text colors, gradients)
- ✅ Tipografia (font families, sizes, weights, letter-spacing)
- ✅ Header (logo, menu, announcement bar, sticky header)
- ✅ Footer (logo, menus, newsletter, payment icons, social media)
- ✅ Product (gallery, variants, reviews, recommendations)
- ✅ Collection (filters, sorting, grid layout, items per page)
- ✅ Cart (drawer style, free shipping bar, upsells)
- ✅ Search (suggestions, collections, recent searches)
- ✅ Social media (Instagram, Facebook, Twitter, TikTok URLs)
- ✅ Currency & Language selector
- ✅ SEO & Analytics
- ✅ Performance (lazy loading, image optimization)
- E muito mais...

#### Seções no FOLTZ (atual):
- ⚠️ Colors (vazio)
- ⚠️ Typography (vazio)
- ⚠️ Header (vazio)
- ⚠️ Footer (vazio)

**CONCLUSÃO:**
O settings_schema.json do FOLTZ está **99% vazio**. Sem estas configurações, o administrador da loja não pode personalizar:
- ❌ Cores do tema
- ❌ Fontes
- ❌ Logos
- ❌ Menus
- ❌ Espaçamentos
- ❌ Comportamentos (sticky header, carrinho drawer, etc.)
- ❌ Integrações (redes sociais, analytics)

### 2.2 settings_data.json

Ambos os temas têm arquivos vazios/mínimos (normal, pois é populado na instalação).

**Ação necessária:**
Expandir settings_schema.json do FOLTZ com:
1. Configurações de cores (usando valores do design-tokens.json)
2. Configurações de tipografia (Inter font, tamanhos, pesos)
3. Configurações de header (logo, menu, promotional banner)
4. Configurações de footer (logo, menus, social media, contact info)
5. Configurações de produto (layout, imagens, variantes)
6. Configurações de coleção (grid, filtros)
7. Configurações gerais (page width, spacing, border radius)

---

## 🔍 FASE 3: COMPARAÇÃO DE TEMPLATES

### 3.1 Formato de Templates

**Impact:** Usa JSON format (modern Shopify 2.0)
- Exemplo: `templates/product.json` contém estrutura de seções
- Permite personalização via theme editor
- Sections podem ser adicionadas/removidas/reordenadas

**FOLTZ:** Usa Liquid format (legacy)
- Exemplo: `templates/product.liquid` com código hardcoded
- Menos flexível
- Não permite customização via theme editor sem editar código

**IMPACTO:**
Todos os templates do FOLTZ precisam ser convertidos para JSON format para serem compatíveis com Shopify 2.0 e permitir customização via admin.

### 3.2 Templates Comparação Detalhada

#### Index (Homepage)

**Impact:**
- `templates/index.json` (258 linhas)
- Contém seções configuráveis: slideshow, featured-collection, newsletter, etc.
- Context variations: index.context.br.json, index.context.international.json

**FOLTZ:**
- `templates/index.liquid` (15 linhas, placeholder)
- Apenas comentário e placeholder

**Gap:** Precisa criar index.json com seções hero, featured-products, collections, etc.

#### Product

**Impact:**
- `templates/product.json` (configurável)
- Multiple variants: product.original-1.json, product.original-2.json, etc.
- Seções: product gallery, product info, recommendations, reviews, etc.

**FOLTZ:**
- `templates/product.liquid` (placeholder)

**Gap:** Precisa criar product.json com sections apropriadas.

#### Collection

**Impact:**
- `templates/collection.json` (com filtros, sorting, paginação)
- `templates/collection.brand.liquid` (variation para brands)

**FOLTZ:**
- `templates/collection.liquid` (placeholder)

**Gap:** Precisa criar collection.json com filtros e grid.

#### Cart

**Impact:**
- `templates/cart.json`
- Context variations para BR e international
- Inclui cart-drawer, upsells, shipping calculator

**FOLTZ:**
- `templates/cart.liquid` (placeholder)

**Gap:** Precisa criar cart.json.

#### Search

**Impact:**
- `templates/search.json`
- Includes filters, tabs (products, articles, pages), suggestions

**FOLTZ:**
- `templates/search.liquid` (13 linhas, básico mas funcional)

**Gap:** Converter para JSON, adicionar filtros e tabs.

#### Blog & Article

**Impact:**
- `templates/blog.json` - Lista de posts
- `templates/article.json` - Post individual com comments, navigation

**FOLTZ:**
- ❌ Não existe

**Gap:** Criar ambos os templates.

#### 404

**Impact:**
- `templates/404.json` - Página de erro customizável

**FOLTZ:**
- ❌ Não existe

**Gap:** CRÍTICO - Criar 404.json.

#### Password

**Impact:**
- `templates/password.json` - Página de manutenção

**FOLTZ:**
- ❌ Não existe

**Gap:** CRÍTICO - Criar password.json.

#### List Collections

**Impact:**
- `templates/list-collections.json` - Lista todas as coleções

**FOLTZ:**
- ❌ Não existe

**Gap:** Criar list-collections.json.

#### Customer Templates (TODOS FALTANDO)

**Impact** tem 7 customer templates (JSON + Liquid):
1. ✅ account.json + account.liquid
2. ✅ activate_account.json + activate_account.liquid
3. ✅ addresses.json + addresses.liquid
4. ✅ login.json + login.liquid
5. ✅ order.json + order.liquid
6. ✅ register.json + register.liquid
7. ✅ reset_password.json + reset_password.liquid

**FOLTZ:**
- ❌ ZERO customer templates

**IMPACTO CRÍTICO:**
Sem customer templates, a loja não pode:
- Aceitar registros de clientes
- Permitir login
- Exibir conta do cliente
- Mostrar histórico de pedidos
- Gerenciar endereços de entrega
- Resetar senhas

### 3.3 Resumo de Templates

| Template | Impact | FOLTZ | Status |
|---|---|---|---|
| index | ✅ JSON | ⚠️ Liquid básico | Precisa JSON |
| product | ✅ JSON | ⚠️ Liquid básico | Precisa JSON |
| collection | ✅ JSON | ⚠️ Liquid básico | Precisa JSON |
| cart | ✅ JSON | ⚠️ Liquid básico | Precisa JSON |
| search | ✅ JSON | ⚠️ Liquid básico | Precisa JSON |
| page | ✅ JSON | ⚠️ Liquid básico | Precisa JSON |
| blog | ✅ JSON | ❌ | Criar |
| article | ✅ JSON | ❌ | Criar |
| 404 | ✅ JSON | ❌ | **CRÍTICO** |
| password | ✅ JSON | ❌ | **CRÍTICO** |
| list-collections | ✅ JSON | ❌ | Criar |
| gift_card | ✅ Liquid | ❌ | Criar |
| **customers/*** | ✅ 7 templates | ❌ | **CRÍTICO** |

**Total Impact:** 20+ templates
**Total FOLTZ:** 6 templates (todos básicos)
**Completude:** 30%

---

## 🔧 FASE 4: ANÁLISE DETALHADA DE SECTIONS

### 4.1 Estatísticas

| Tema | Total Sections |
|---|---|
| **Impact** | 95 |
| **FOLTZ** | 3 |
| **Completude** | 3% |

### 4.2 Sections Críticas Ausentes

#### Main Sections (obrigatórias):
- ❌ `main-product.liquid` - Página de produto
- ❌ `main-collection.liquid` - Página de coleção com filtros
- ❌ `main-cart.liquid` - Página de carrinho
- ❌ `main-search.liquid` - Página de busca
- ❌ `main-page.liquid` - Página genérica
- ❌ `main-blog.liquid` - Lista de posts
- ❌ `main-article.liquid` - Post individual
- ❌ `main-404.liquid` - Página de erro **CRÍTICO**
- ❌ `main-password.liquid` - Página de senha **CRÍTICO**
- ❌ `main-list-collections.liquid` - Lista de coleções

#### Customer Sections (TODAS faltando):
- ❌ `main-customers-account.liquid` **CRÍTICO**
- ❌ `main-customers-login.liquid` **CRÍTICO**
- ❌ `main-customers-register.liquid` **CRÍTICO**
- ❌ `main-customers-order.liquid` **CRÍTICO**
- ❌ `main-customers-addresses.liquid` **CRÍTICO**
- ❌ `main-customers-activate-account.liquid` **CRÍTICO**
- ❌ `main-customers-reset-password.liquid` **CRÍTICO**

#### Utility Sections importantes:
- ❌ `announcement-bar.liquid` - Banner promocional (já existe no header)
- ❌ `cart-drawer.liquid` - Carrinho lateral (drawer)
- ❌ `search-drawer.liquid` - Busca em drawer
- ❌ `newsletter-popup.liquid` - Newsletter popup

#### Content Sections úteis:
- ❌ `featured-collection.liquid` - Coleção em destaque
- ❌ `featured-product.liquid` - Produto em destaque
- ❌ `slideshow.liquid` - Slideshow de imagens
- ❌ `blog-posts.liquid` - Posts do blog
- ❌ `testimonials.liquid` - Depoimentos
- ❌ `multi-column.liquid` - Colunas de conteúdo
- ❌ `faq.liquid` - FAQ/Perguntas frequentes
- ❌ `product-recommendations.liquid` - Recomendações

### 4.3 Análise Técnica das Sections do Impact

**main-product.liquid:**
- ✅ Usa custom CSS variables dinâmicas
- ✅ Grid responsivo para galeria
- ✅ Configurável via schema
- ✅ Blocks system (variant picker, buy buttons, description, etc.)
- ⚠️ FOLTZ precisa criar similar mantendo design próprio

**main-collection.liquid:**
- ✅ Sistema de filtros completo (facets)
- ✅ Grid responsivo (2-4 colunas)
- ✅ Sorting (ordenação)
- ✅ Paginação
- ✅ Sidebar ou horizontal filters
- ⚠️ FOLTZ precisa criar similar

**cart-drawer.liquid:**
- ✅ Slide from right
- ✅ Free shipping bar
- ✅ Upsells
- ✅ Shipping calculator
- ⚠️ FOLTZ já tem lógica de cart drawer no JS, precisa section

---

## 🧩 FASE 5: ANÁLISE DETALHADA DE SNIPPETS

### 5.1 Estatísticas

| Tema | Total Snippets |
|---|---|
| **Impact** | 98 |
| **FOLTZ** | 5 |
| **Completude** | 5% |

### 5.2 Snippets Críticos Ausentes

#### Product Snippets:
- ❌ `buy-buttons.liquid` - Botões de compra (Add to Cart)
- ❌ `variant-picker.liquid` - Seletor de variantes (tamanhos/cores) **CRÍTICO**
- ❌ `product-gallery.liquid` - Galeria de imagens/vídeos
- ❌ `product-info.liquid` - Informações do produto
- ❌ `product-badges.liquid` - Badges (sale, new, sold out)
- ❌ `product-rating.liquid` - Avaliações/estrelas
- ❌ `price-list.liquid` - Lista de preços (compare at, sale)
- ❌ `swatch.liquid` - Swatches de cores
- ❌ `qty-selector.liquid` - Seletor de quantidade

#### Collection/Filter Snippets:
- ❌ `facets.liquid` - Sistema de filtros **CRÍTICO**
- ❌ `active-facets.liquid` - Filtros ativos
- ❌ `pagination.liquid` - Paginação
- ❌ `collection-top-bar.liquid` - Barra superior (sorting, view mode)

#### Cart Snippets:
- ❌ `line-item.liquid` - Item do carrinho
- ❌ `mini-cart.liquid` - Carrinho mini/drawer

#### Layout/UI Snippets:
- ❌ `button.liquid` - Sistema de botões
- ❌ `input.liquid` - Campos de input
- ❌ `select.liquid` - Select dropdowns
- ❌ `checkbox.liquid` - Checkboxes
- ❌ `accordion.liquid` - Acordeões
- ❌ `icon.liquid` - Sistema de ícones **IMPORTANTE**
- ❌ `media.liquid` - Media (imagens/vídeos)
- ❌ `banner.liquid` - Banners

#### Menu/Navigation:
- ❌ `desktop-menu.liquid` - Menu desktop
- ❌ `mobile-menu.liquid` - Menu mobile
- ❌ `mega-menu.liquid` - Mega menu

#### Meta/SEO:
- ❌ `social-meta-tags.liquid` - Open Graph/Twitter Cards **IMPORTANTE**
- ❌ `microdata-schema.liquid` - Schema.org structured data
- ❌ `css-variables.liquid` - CSS variables dinâmicas
- ❌ `js-variables.liquid` - JS variables do tema

#### Form Snippets:
- ❌ `address-form.liquid` - Formulário de endereço
- ❌ `localization-selector.liquid` - Seletor idioma/moeda

#### Article/Blog:
- ❌ `article-item.liquid` - Item de artigo
- ❌ `blog-post-card.liquid` - Card de post
- ❌ `article-comments.liquid` - Comentários

### 5.3 Análise Técnica dos Snippets Críticos

**variant-picker.liquid:**
- Custom element `<variant-picker>`
- Detecta tipo de opção (color, size, etc.)
- Modos: dropdown, block, color swatch, variant image
- JavaScript integration para update de preço/imagens
- Hide sold out variants

**buy-buttons.liquid:**
- Form de produto
- Custom element `<buy-buttons>`
- Botão Add to Cart dinâmico
- Estados: disponível, sold out, pre-order
- Dynamic checkout buttons (Apple Pay, etc.)

**facets.liquid:**
- Sistema completo de filtros
- Horizontal ou vertical layout
- Mobile drawer
- Active filters display
- Price range slider
- Color swatches
- Multi-select
- Ajax update

**price-list.liquid:**
- Compare at price
- Sale price
- Percentage discount
- Currency formatting
- Tax handling

---

## 🏷️ FASE 6: VERIFICAÇÃO DE LIQUID TAGS E OBJETOS

### 6.1 Liquid Tags Essenciais Usadas no Impact

**Product Object:**
```liquid
{{ product.title }}
{{ product.price | money }}
{{ product.compare_at_price | money }}
{{ product.available }}
{{ product.featured_image | img_url: 'master' }}
{{ product.variants }}
{{ product.options_with_values }}
{{ product.selected_or_first_available_variant }}
{{ product.metafields }}
```

**Collection Object:**
```liquid
{{ collection.title }}
{{ collection.products }}
{{ collection.products_count }}
{{ collection.all_products_count }}
{{ collection.filters }}
{{ collection.sort_by }}
{{ collection.default_sort_by }}
```

**Cart Object:**
```liquid
{{ cart.item_count }}
{{ cart.total_price | money }}
{{ cart.items }}
{{ cart.original_total_price | money }}
{{ cart.total_discount | money }}
```

**Customer Object:**
```liquid
{{ customer.name }}
{{ customer.email }}
{{ customer.orders }}
{{ customer.addresses }}
{{ customer.default_address }}
```

**Forms:**
```liquid
{% form 'product' %}
{% form 'customer_login' %}
{% form 'customer_register' %}
{% form 'contact' %}
```

**Sections & Blocks:**
```liquid
{% section 'header' %}
{% schema %}
{% endschema %}
{{ section.settings.logo }}
{{ block.settings.text }}
```

**Control Flow:**
```liquid
{% if product.available %}
{% unless product.has_only_default_variant %}
{% for variant in product.variants %}
{% case option.name %}
```

**Filters Usados:**
```liquid
| money
| img_url: '600x'
| t (translate)
| asset_url
| stylesheet_tag
| script_tag
| default
| escape
| downcase
| split
| replace
```

### 6.2 Custom Elements (Web Components)

O Impact usa custom elements JavaScript:
```html
<variant-picker>
<buy-buttons>
<facet-filters-form>
<product-form>
<cart-drawer>
<predictive-search>
```

FOLTZ precisará implementar Web Components similares ou usar JavaScript vanilla equivalente.

### 6.3 CSS Architecture

**Impact usa:**
- CSS Variables dinâmicas via `css-variables.liquid`
- Utility classes
- BEM naming convention
- CSS Grid e Flexbox
- Mobile-first approach

**FOLTZ tem:**
- ✅ CSS Variables estáticas em theme.css
- ✅ Utility classes básicas
- ✅ Mobile-first approach
- ⚠️ Falta: CSS variables dinâmicas do theme customizer

---

## 📋 FASES 7-9: PLANO COMPLETO DE CORREÇÃO DO TEMA FOLTZ

### 🎯 Objetivo

Transformar o tema FOLTZ de **10% completo** para **100% funcional**, criando todos os arquivos essenciais enquanto **mantém a identidade visual FOLTZ** (yellow #DAF10D + black) e **NÃO copia código do Impact**.

---

## 🚨 PRIORIDADE 1 - CRÍTICO (Tema não funciona sem estes)

### 1.1 Customer Account System (MAIS CRÍTICO)

**Sem estes, customers não podem fazer login/registro/ver pedidos**

#### Templates customers/ (JSON + Liquid)
- [ ] `templates/customers/login.json`
- [ ] `templates/customers/register.json`
- [ ] `templates/customers/account.json`
- [ ] `templates/customers/order.json`
- [ ] `templates/customers/addresses.json`
- [ ] `templates/customers/activate_account.json`
- [ ] `templates/customers/reset_password.json`

#### Sections customers/
- [ ] `sections/main-customers-login.liquid`
- [ ] `sections/main-customers-register.liquid`
- [ ] `sections/main-customers-account.liquid`
- [ ] `sections/main-customers-order.liquid`
- [ ] `sections/main-customers-addresses.liquid`
- [ ] `sections/main-customers-activate-account.liquid`
- [ ] `sections/main-customers-reset-password.liquid`

**Total:** 14 arquivos

### 1.2 Essential Pages

#### Templates
- [ ] `templates/404.json` - Página de erro 404
- [ ] `templates/password.json` - Página de manutenção/senha

#### Sections
- [ ] `sections/main-404.liquid` - Conteúdo página 404
- [ ] `sections/main-password.liquid` - Conteúdo página password

#### Layouts
- [ ] `layout/password.liquid` - Layout para password page
- [ ] `layout/gift-card.liquid` - Layout para gift cards

**Total:** 6 arquivos

### 1.3 Core Product Functionality

**Sem estes, não é possível selecionar variantes/tamanhos ou adicionar ao carrinho adequadamente**

#### Snippets
- [ ] `snippets/variant-picker.liquid` - Seletor de tamanhos/cores **CRÍTICO**
- [ ] `snippets/buy-buttons.liquid` - Botões de compra
- [ ] `snippets/price-list.liquid` - Preços com discount
- [ ] `snippets/product-gallery.liquid` - Galeria de imagens
- [ ] `snippets/product-info.liquid` - Informações do produto

**Total:** 5 arquivos

### 1.4 Collection Filters

**Sem estes, não é possível filtrar produtos**

#### Snippets
- [ ] `snippets/facets.liquid` - Sistema de filtros **CRÍTICO**
- [ ] `snippets/active-facets.liquid` - Filtros ativos
- [ ] `snippets/pagination.liquid` - Paginação

**Total:** 3 arquivos

**TOTAL PRIORIDADE 1:** 28 arquivos

---

## ⚠️ PRIORIDADE 2 - IMPORTANTE (Funcionalidade essencial)

### 2.1 Main Sections (Converter para JSON + melhorar)

- [ ] `sections/main-product.liquid` - Página de produto completa
- [ ] `sections/main-collection.liquid` - Página de coleção com filtros
- [ ] `sections/main-cart.liquid` - Página de carrinho
- [ ] `sections/main-search.liquid` - Página de busca
- [ ] `sections/main-page.liquid` - Página genérica

**Total:** 5 arquivos

### 2.2 Templates (Converter para JSON format)

- [ ] `templates/index.json` - Homepage
- [ ] `templates/product.json` - Produto
- [ ] `templates/collection.json` - Coleção
- [ ] `templates/cart.json` - Carrinho
- [ ] `templates/search.json` - Busca
- [ ] `templates/page.json` - Página genérica

**Total:** 6 arquivos

### 2.3 Essential Snippets

#### Cart
- [ ] `snippets/line-item.liquid` - Item do carrinho
- [ ] `snippets/mini-cart.liquid` - Mini carrinho/drawer

#### UI Components
- [ ] `snippets/button.liquid` - Sistema de botões
- [ ] `snippets/input.liquid` - Campos de input
- [ ] `snippets/icon.liquid` - Sistema de ícones
- [ ] `snippets/media.liquid` - Media (imagens/vídeos)

#### Product
- [ ] `snippets/product-badges.liquid` - Badges (sale, new, sold out)
- [ ] `snippets/qty-selector.liquid` - Seletor de quantidade
- [ ] `snippets/swatch.liquid` - Swatches de cores

**Total:** 9 arquivos

### 2.4 SEO & Meta Tags

- [ ] `snippets/social-meta-tags.liquid` - Open Graph/Twitter Cards
- [ ] `snippets/microdata-schema.liquid` - Schema.org structured data

**Total:** 2 arquivos

### 2.5 Settings Schema Expansion

- [ ] Expandir `config/settings_schema.json` com:
  - [ ] Cores (usando design-tokens.json)
  - [ ] Tipografia (Inter font)
  - [ ] Header settings (logo, menu, promotional banner)
  - [ ] Footer settings (logo, menus, social, contact)
  - [ ] Product settings (layout, gallery)
  - [ ] Collection settings (grid, filters)
  - [ ] General settings (page width, spacing, borders)
  - [ ] Social media URLs
  - [ ] SEO settings

**Total:** 1 arquivo (expansão grande)

**TOTAL PRIORIDADE 2:** 23 arquivos

---

## ✅ PRIORIDADE 3 - MELHORIAS (UX e features extras)

### 3.1 Blog System

#### Templates
- [ ] `templates/blog.json`
- [ ] `templates/article.json`

#### Sections
- [ ] `sections/main-blog.liquid`
- [ ] `sections/main-article.liquid`
- [ ] `sections/blog-posts.liquid` - Section de posts em destaque

#### Snippets
- [ ] `snippets/article-item.liquid`
- [ ] `snippets/blog-post-card.liquid`
- [ ] `snippets/article-comments.liquid`

**Total:** 8 arquivos

### 3.2 Advanced Sections

- [ ] `sections/featured-collection.liquid` - Coleção em destaque
- [ ] `sections/featured-product.liquid` - Produto em destaque
- [ ] `sections/slideshow.liquid` - Slideshow
- [ ] `sections/multi-column.liquid` - Colunas de conteúdo
- [ ] `sections/newsletter.liquid` - Newsletter section
- [ ] `sections/testimonials.liquid` - Depoimentos
- [ ] `sections/faq.liquid` - FAQ
- [ ] `sections/product-recommendations.liquid` - Recomendações
- [ ] `sections/cart-drawer.liquid` - Carrinho drawer
- [ ] `sections/search-drawer.liquid` - Busca drawer

**Total:** 10 arquivos

### 3.3 Additional Snippets

#### Menu
- [ ] `snippets/desktop-menu.liquid`
- [ ] `snippets/mobile-menu.liquid` (já temos no header, extrair para snippet)
- [ ] `snippets/mega-menu.liquid`

#### Forms
- [ ] `snippets/address-form.liquid`
- [ ] `snippets/localization-selector.liquid` - Idioma/moeda

#### UI
- [ ] `snippets/select.liquid`
- [ ] `snippets/checkbox.liquid`
- [ ] `snippets/accordion.liquid`
- [ ] `snippets/banner.liquid`

**Total:** 9 arquivos

### 3.4 Additional Templates

- [ ] `templates/list-collections.json`
- [ ] `templates/gift_card.liquid`
- [ ] `sections/main-list-collections.liquid`
- [ ] `sections/main-gift-card.liquid`

**Total:** 4 arquivos

### 3.5 Dynamic CSS/JS

- [ ] `snippets/css-variables.liquid` - CSS variables do theme customizer
- [ ] `snippets/js-variables.liquid` - JS variables do tema

**Total:** 2 arquivos

**TOTAL PRIORIDADE 3:** 33 arquivos

---

## 📊 RESUMO DO PLANO

| Prioridade | Arquivos | Descrição | Status |
|---|---|---|---|
| **P1 - CRÍTICO** | 28 | Customer account, 404, password, variants, filters | 🔴 0% |
| **P2 - IMPORTANTE** | 23 | Main sections, templates JSON, SEO, settings | 🟡 ~20% |
| **P3 - MELHORIAS** | 33 | Blog, advanced sections, extras | 🟢 0% |
| **TOTAL** | 84 | | **10%** |

**Arquivos atuais:** 25
**Arquivos necessários:** ~110
**Completude:** 23%

---

## 🛠️ ESTRATÉGIA DE IMPLEMENTAÇÃO

### Fase 7.1: CRÍTICOS - Customer Account (14 arquivos)

**Ordem de implementação:**
1. `sections/main-customers-login.liquid`
2. `templates/customers/login.json`
3. `sections/main-customers-register.liquid`
4. `templates/customers/register.json`
5. `sections/main-customers-account.liquid`
6. `templates/customers/account.json`
7. `sections/main-customers-order.liquid`
8. `templates/customers/order.json`
9. `sections/main-customers-addresses.liquid`
10. `templates/customers/addresses.json`
11. `sections/main-customers-reset-password.liquid`
12. `templates/customers/reset_password.json`
13. `sections/main-customers-activate-account.liquid`
14. `templates/customers/activate_account.json`

**Design FOLTZ:**
- Yellow (#DAF10D) CTA buttons
- Black backgrounds com overlays
- Clean forms com focus states amarelos
- Error messages em vermelho suave
- Success messages em verde suave

### Fase 7.2: CRÍTICOS - Essential Pages (6 arquivos)

1. `sections/main-404.liquid` - Hero com mensagem divertida + produtos sugeridos
2. `templates/404.json`
3. `sections/main-password.liquid` - Hero com countdown + newsletter signup
4. `templates/password.json`
5. `layout/password.liquid`
6. `layout/gift-card.liquid`

### Fase 7.3: CRÍTICOS - Product Functionality (5 arquivos)

1. `snippets/variant-picker.liquid` - Dropdown + Block mode, yellow active state
2. `snippets/buy-buttons.liquid` - Yellow primary button
3. `snippets/price-list.liquid` - Sale price em yellow, compare at riscado
4. `snippets/product-gallery.liquid` - Grid 2x2 em mobile, single column em desktop
5. `snippets/product-info.liquid` - Clean layout, hierarchy

### Fase 7.4: CRÍTICOS - Collection Filters (3 arquivos)

1. `snippets/facets.liquid` - Sidebar em desktop, drawer em mobile
2. `snippets/active-facets.liquid` - Chips com X para remover
3. `snippets/pagination.liquid` - Números + prev/next

### Fase 8: IMPORTANTES - Main Sections & Templates

**Converter templates para JSON format + criar sections completas:**

1. `sections/main-product.liquid` + `templates/product.json`
2. `sections/main-collection.liquid` + `templates/collection.json`
3. `sections/main-cart.liquid` + `templates/cart.json`
4. `sections/main-search.liquid` + `templates/search.json`
5. `sections/main-page.liquid` + `templates/page.json`
6. `templates/index.json` (melhorar)

**Snippets essenciais:**
7. `snippets/line-item.liquid`
8. `snippets/mini-cart.liquid`
9. `snippets/button.liquid`
10. `snippets/input.liquid`
11. `snippets/icon.liquid`
12. `snippets/media.liquid`
13. `snippets/product-badges.liquid`
14. `snippets/qty-selector.liquid`
15. `snippets/swatch.liquid`
16. `snippets/social-meta-tags.liquid`
17. `snippets/microdata-schema.liquid`

**Settings schema expansion:**
18. Expandir `config/settings_schema.json` (1000+ linhas)

### Fase 9: MELHORIAS - Blog, Advanced Sections, Extras

**Blog system:**
1-8. Blog templates, sections, snippets

**Advanced sections:**
9-18. Featured collection/product, slideshow, multi-column, etc.

**Additional snippets:**
19-27. Menu snippets, forms, UI components

**Additional templates:**
28-31. List collections, gift card

**Dynamic CSS/JS:**
32-33. css-variables.liquid, js-variables.liquid

---

## 🎨 REGRAS DE DESIGN PARA TODOS OS ARQUIVOS

### Cores
- **Primary:** `#DAF10D` (yellow)
- **Background:** `#000000` (black)
- **Text:** `#FFFFFF` (white)
- **Gray:** `#6B7280` (subdued text)
- **Error:** `#EF4444`
- **Success:** `#10B981`

### Tipografia
- **Font:** Inter (Google Fonts)
- **Headings:** font-weight: 700, black color
- **Body:** font-weight: 400, white color
- **Small:** font-size: 0.875rem

### Componentes
- **Buttons:** Yellow background, black text, rounded, hover: opacity 0.9
- **Inputs:** Black border, white background, yellow focus ring
- **Cards:** Black background, subtle border, hover: yellow border
- **Badges:** Small pills, yellow or appropriate semantic color

### Spacing
- **Section padding:** 80px vertical (desktop), 40px (mobile)
- **Container:** max-width 1400px, padding 24px
- **Grid gap:** 24px (desktop), 16px (mobile)

---

## ✅ CHECKLIST DE VALIDAÇÃO

Após implementar cada arquivo, verificar:

- [ ] Usa design tokens do FOLTZ (yellow + black)
- [ ] Não contém código copiado do Impact
- [ ] Valores extraídos do Next.js quando aplicável
- [ ] Liquid syntax correta
- [ ] Schema JSON válido (se aplicável)
- [ ] Responsivo (mobile-first)
- [ ] Acessível (labels, aria, semantic HTML)
- [ ] Performance (lazy loading, otimizações)
- [ ] Translations (usa `| t` filter)
- [ ] Comentários em português explicando lógica complexa

---

## 🚀 CRONOGRAMA ESTIMADO

| Fase | Arquivos | Tempo Estimado |
|---|---|---|
| **Fase 7.1** | 14 | 3-4 horas |
| **Fase 7.2** | 6 | 1 hora |
| **Fase 7.3** | 5 | 2 horas |
| **Fase 7.4** | 3 | 1 hora |
| **Fase 8** | 23 | 4-5 horas |
| **Fase 9** | 33 | 5-6 horas |
| **TOTAL** | 84 | **16-19 horas** |

---

**NOTA IMPORTANTE:**
Este plano serve como roadmap completo. Vamos implementar fase por fase, validando cada grupo de arquivos antes de prosseguir. Não vamos copiar código do Impact - vamos criar nossos próprios arquivos mantendo o design FOLTZ (yellow #DAF10D + black) e extraindo valores REAIS do Next.js project quando aplicável.
