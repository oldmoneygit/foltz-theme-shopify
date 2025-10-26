# 📦 Guia de Importação de Produtos

Este guia explica o processo completo para importar todos os produtos da loja Foltz no Shopify.

## 📋 Visão Geral

O processo é dividido em **2 etapas**:

1. **Importar produtos via CSV** (estrutura + tags, sem imagens)
2. **Upload de imagens via script** (associa imagens aos produtos importados)

## ✅ Pré-requisitos

- [ ] Acesso ao Shopify Admin: https://djjrjm-0p.myshopify.com/admin
- [ ] Pasta `Leagues/` com todas as imagens dos produtos
- [ ] Node.js instalado (para rodar o script de upload)

---

## 🔄 ETAPA 1: Importar Produtos via CSV

### 1.1. Gerar CSV (se necessário)

O arquivo `products-import.csv` já está pronto, mas se precisar regerar:

```bash
cd shopify-theme-foltz
node scripts/generate-full-csv.mjs
```

Isso vai gerar um CSV com:
- ✅ **233 produtos** das 6 categorias
- ✅ **1.165 variantes** (múltiplos tamanhos)
- ✅ **Tags automáticas** para coleções
- ❌ **SEM imagens** (serão adicionadas na Etapa 2)

### 1.2. Importar no Shopify

1. Acesse: https://djjrjm-0p.myshopify.com/admin/products
2. Clique em **Import** (no canto superior direito)
3. Selecione o arquivo `products-import.csv`
4. Aguarde o processamento (pode levar alguns minutos)
5. Verifique se todos os produtos foram importados

**IMPORTANTE:** Não se preocupe com as imagens agora. Elas serão adicionadas na próxima etapa.

---

## 📸 ETAPA 2: Upload de Imagens

### 2.1. Criar Custom App no Shopify

Para fazer upload das imagens via API, você precisa de um access token:

1. Acesse: https://djjrjm-0p.myshopify.com/admin/settings/apps/development
2. Clique em **Create an app**
3. Nome: `Foltz Image Uploader`
4. Em **Configuration** → **Admin API integration**:
   - Habilite: `write_products`
   - Habilite: `read_products`
5. Clique em **Save**
6. Em **API credentials** → **Install app**
7. **Copie o Admin API access token** (você só verá uma vez!)

### 2.2. Configurar Script

Edite o arquivo `scripts/upload-product-images.mjs`:

```javascript
// Linha 19: Cole seu access token
const SHOPIFY_ACCESS_TOKEN = 'shpat_xxxxxxxxxxxxx'; // ← Cole aqui
```

### 2.3. Executar Upload

```bash
cd shopify-theme-foltz
node scripts/upload-product-images.mjs
```

O script vai:
- ✅ Buscar cada produto no Shopify pelo handle
- ✅ Encontrar as imagens locais na pasta `Leagues/`
- ✅ Fazer upload de todas as imagens do produto
- ✅ Mostrar progresso em tempo real

**Tempo estimado:** ~30-60 minutos (dependendo da quantidade de imagens)

### 2.4. Verificar Resultados

Ao final, você verá:

```
==================================================
✅ Upload concluído!
📊 Produtos processados: 233
📸 Imagens enviadas: 1500+ (estimativa)
❌ Erros: 0
==================================================
```

---

## 🏷️ ETAPA 3: Criar Coleções (Opcional)

Após importar os produtos, crie as coleções automáticas seguindo o guia:

📄 **[COLLECTIONS-SETUP.md](COLLECTIONS-SETUP.md)**

As coleções serão criadas com base nas tags dos produtos:
- `liga:brasileirao` → Coleção "Brasileirão"
- `liga:national-teams` → Coleção "National Teams"
- `corinthians` → Coleção "Corinthians"
- etc.

---

## 📊 Resumo dos Produtos

| Categoria | Produtos | Tags |
|-----------|----------|------|
| Brazil | 39 | `brazil`, `liga:national-teams` |
| Corinthians | 16 | `corinthians`, `liga:brasileirao` |
| Flamengo | 40 | `flamengo`, `liga:brasileirao` |
| National Teams | 116 | `national-teams`, `liga:national-teams` |
| Palmeiras | 10 | `palmeiras`, `liga:brasileirao` |
| Santos | 12 | `santos`, `liga:brasileirao` |
| **TOTAL** | **233** | - |

---

## 🔧 Troubleshooting

### Erro: "Produto não encontrado no Shopify"

- Verifique se o CSV foi importado completamente
- Confira se o handle do produto está correto
- Aguarde alguns minutos após importação (pode haver delay)

### Erro: "Rate limit exceeded"

- O script já tem delays embutidos (500ms entre uploads)
- Se necessário, aumente o delay na linha 125 do script

### Imagens não aparecem

- Verifique se os arquivos de imagem existem na pasta `Leagues/`
- Confira se as extensões são válidas (jpg, jpeg, png, webp)
- Revise os logs do script para erros específicos

### Erro: "Invalid access token"

- Verifique se copiou o token completo
- Confirme se as permissões `write_products` e `read_products` estão habilitadas
- Reinstale o Custom App se necessário

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs do script
2. Revise as configurações da API
3. Consulte a documentação da Shopify Admin API

---

## ✅ Checklist Completo

- [ ] CSV importado no Shopify Admin
- [ ] Todos os 233 produtos criados
- [ ] Custom App criado e configurado
- [ ] Access token obtido e configurado no script
- [ ] Script de upload executado com sucesso
- [ ] Imagens associadas aos produtos
- [ ] Coleções criadas (opcional)
- [ ] Produtos visíveis na loja

**Pronto! Sua loja está com todos os produtos importados e com imagens! 🎉**
