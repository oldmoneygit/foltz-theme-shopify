# 🏷️ Sistema de Tags - Foltz Fanwear

## Tags de Ligas

Cada produto deve ter UMA tag de liga para organização automática em coleções.

### Tags Disponíveis:

| Liga | Tag | Exemplo |
|------|-----|---------|
| Premier League | `liga:premier-league` | Bayern 07-08 Home |
| La Liga | `liga:la-liga` | Real Madrid 23-24 Home |
| Serie A | `liga:serie-a` | AC Milan 06-07 Home |
| Bundesliga | `liga:bundesliga` | Bayern Munich 13-14 Home |
| Ligue 1 | `liga:ligue-1` | PSG 22-23 Home |
| Sul-Americana | `liga:sul-americana` | Boca Juniors 23-24 |
| Liga Portugal | `liga:liga-portugal` | Benfica 22-23 Home |
| Brasileirão | `liga:brasileirao` | Flamengo 23-24 Home |
| Eredivisie | `liga:eredivisie` | Ajax 94-95 Home |
| Liga MX | `liga:liga-mx` | Club América 23-24 |
| MLS | `liga:mls` | LA Galaxy 23-24 Home |
| National Teams | `liga:national-teams` | Brazil 2002 World Cup |
| Manga Longa | `tipo:manga-longa` | Qualquer camisa manga longa |

---

## Tags Adicionais (Opcionais)

### Por Tipo
- `tipo:manga-longa` - Camisas de manga longa
- `tipo:manga-curta` - Camisas de manga curta
- `tipo:home` - Uniforme titular
- `tipo:away` - Uniforme visitante
- `tipo:third` - Terceiro uniforme

### Por Temporada
- `temporada:retro` - Camisas retrô/vintage
- `temporada:2023-24` - Temporada atual
- `temporada:2022-23` - Temporada anterior

### Por Status
- `destaque` - Produtos em destaque
- `novo` - Produtos novos
- `popular` - Mais vendidos

---

## 🔧 Como Adicionar Tags aos Produtos

### Opção 1: Bulk Edit (Editor em Massa)

1. Acesse: https://djjrjm-0p.myshopify.com/admin/products
2. Selecione múltiplos produtos da mesma liga
3. Clique em "Editar produtos" (Bulk actions)
4. Adicionar tags → Digite `liga:premier-league` (por exemplo)
5. Salvar

### Opção 2: Individual

1. Abra o produto
2. Na seção "Organização" → Tags
3. Adicione a tag da liga: `liga:premier-league`
4. Salvar

### Opção 3: Via CSV Import (Mais Rápido para Muitos Produtos)

1. Exporte seus produtos (Admin → Produtos → Exportar)
2. No Excel/Google Sheets, adicione tags na coluna "Tags"
3. Importe de volta

---

## 📦 Coleções Automáticas

Depois de adicionar as tags, crie coleções automáticas:

**Exemplo: Premier League**

1. Criar coleção
2. Tipo: **Automática**
3. Condições:
   - Produto tag **é igual a** `liga:premier-league`
4. Salvar

✅ **Todos os produtos com a tag serão adicionados automaticamente!**

---

## 🎯 Regras de Tagging

1. **Uma tag de liga por produto** (obrigatório)
2. **Tags adicionais são opcionais** (tipo, temporada, etc.)
3. **Formato**: sempre minúsculas, sem espaços
4. **Prefixo**: usar `liga:` para ligas, `tipo:` para tipos

---

## 📝 Exemplos Práticos

### Produto: "AC Milan 06-07 Home Long Sleeve"
Tags:
- `liga:serie-a`
- `tipo:manga-longa`
- `tipo:home`
- `temporada:retro`

### Produto: "Brazil 2002 World Cup"
Tags:
- `liga:national-teams`
- `tipo:home`
- `temporada:retro`
- `destaque`

### Produto: "Real Madrid 23-24 Away"
Tags:
- `liga:la-liga`
- `tipo:away`
- `temporada:2023-24`
- `popular`
