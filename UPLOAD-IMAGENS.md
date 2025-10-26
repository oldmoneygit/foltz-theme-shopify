# 📸 Guia: Upload de Imagens para Produtos

Guia rápido para adicionar imagens aos produtos importados no Shopify.

---

## 🎯 O Que Este Script Faz?

Faz upload automático de **TODAS as imagens** dos produtos das 6 categorias:
- Brazil
- Corinthians
- Flamengo
- National Teams
- Palmeiras
- Santos

Para cada produto:
1. Busca o produto no Shopify pelo handle
2. Verifica se já tem imagens (pula se já tiver)
3. Encontra as imagens na pasta local `Leagues/`
4. Faz upload de todas as imagens

---

## ⚙️ Configuração (Uma Vez)

### 1. Configure o Access Token

Edite `scripts/upload-images-simple.mjs` linha 19:

```javascript
const SHOPIFY_ACCESS_TOKEN = 'shpat_xxxxxxxxxxxxx'; // ← Cole aqui
```

**Onde pegar o token:**
1. https://djjrjm-0p.myshopify.com/admin/settings/apps/development
2. Use o Custom App existente (ou crie um novo)
3. Permissões necessárias: `write_products`, `read_products`
4. Copie o Admin API access token

---

## 🚀 Executar Upload

```bash
cd C:\Users\PC\Desktop\Foltz\shopify-theme-foltz
node scripts/upload-images-simple.mjs
```

### O Que Você Verá

```
🚀 Iniciando upload de imagens...

======================================================================
📸 UPLOAD DE IMAGENS - REST API
======================================================================

📦 Albums belong to Brazil team column: 39 produtos

   📄 1988 Brazil Home (Size S-XXL)
      📸 5 imagens encontradas
         ✓ 001.jpg
         ✓ 002.jpg
         ✓ 003.jpg
         ✓ 004.jpg
         ✓ 005.jpg
      ✅ Concluído!

   📄 1998 Brazil Away (Size S-XXL)
      ⏭️  Já tem imagens

   📄 2002 Brazil Home (Size S-XXL)
      📸 3 imagens encontradas
         ✓ 001.png
         ✓ 002.png
         ✓ 003.png
      ✅ Concluído!

...

======================================================================
✅ CONCLUÍDO!
======================================================================
📊 Produtos processados: 233
✅ Com imagens adicionadas: 187
📸 Total de imagens enviadas: 856
⏭️  Pulados (já tinham imagens): 46
❌ Erros: 0
======================================================================
```

---

## ⏱️ Tempo Estimado

- **233 produtos** com ~3-5 imagens cada
- **~1000 imagens** total
- **Tempo:** 15-30 minutos
- Rate limit: 2 requests/segundo (automático)

---

## ✅ Recursos

- ✅ **Pula produtos que já têm imagens** (não duplica)
- ✅ **Progresso em tempo real** (você vê cada upload)
- ✅ **Rate limit automático** (respeita limites da API)
- ✅ **Continua mesmo com erros** (não para tudo se 1 falhar)
- ✅ **Relatório final completo**

---

## 🔧 Troubleshooting

### "Produto não encontrado no Shopify"
- O CSV foi importado?
- O handle do produto está correto?

### "Sem imagens na pasta"
- Verifique se a pasta `Leagues/` está no lugar certo
- Caminho esperado: `C:\Users\PC\Desktop\Foltz\Leagues\`

### "Rate limit exceeded"
- O script já tem delay de 500ms entre uploads
- Se ocorrer, ele vai mostrar o erro mas continuar

### "Invalid access token"
- Verifique se copiou o token completo
- Confirme as permissões: `write_products`, `read_products`

---

## 📌 Notas

- 🔒 **Seguro:** Não sobrescreve imagens existentes
- 🚀 **Eficiente:** Usa REST API (mais simples e confiável)
- 📊 **Transparente:** Mostra cada upload em tempo real
- ✅ **Completo:** Processa todas as 6 categorias automaticamente

---

## ✅ Checklist

- [ ] Custom App configurado
- [ ] Token copiado e colado no script (linha 19)
- [ ] Produtos já importados no Shopify
- [ ] Pasta `Leagues/` acessível
- [ ] Script executado com sucesso
- [ ] Imagens verificadas na loja

**Pronto para adicionar imagens! 📸**
