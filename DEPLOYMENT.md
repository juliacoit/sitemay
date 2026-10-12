# 🚀 Guia de Deploy - Landing Page 1 Mês Contigo

## ✅ Checklist Antes de Publicar

- [ ] Todas as fotos da timeline estão em `assets/` com os nomes corretos
- [ ] O arquivo de música `assets/ultimo-romance.mp3` existe
- [ ] Testou no celular (iOS Safari e Android Chrome)
- [ ] Nenhum erro no console do navegador
- [ ] As cores estão bonitas (verificar em claro e escuro)

---

## 📱 Testar Localmente

### 1. Servir o site localmente

**Opção A: Python 3 (recomendado)**
```bash
cd F:\dev\sitemay
python -m http.server 8000
```

**Opção B: Node.js (se tiver instalado)**
```bash
cd F:\dev\sitemay
npx http-server
```

**Opção C: VS Code Live Server**
- Instale a extensão "Live Server"
- Clique com botão direito no `index.html` → "Open with Live Server"

Depois abra: `http://localhost:8000`

### 2. Testar no Celular

Se estiver no mesmo WiFi:
1. Descubra seu IP local: `ipconfig` (procure por IPv4)
2. No celular: `http://SEU_IP:8000`

---

## 🐙 Deploy no GitHub Pages

### 1. Criar um repositório no GitHub

```bash
cd F:\dev\sitemay
git init
git add .
git commit -m "Initial commit: landing page 1 month anniversary"
```

### 2. Criar repositório no GitHub

1. Vá para [github.com/new](https://github.com/new)
2. **Nome**: `sitemay` (ou o que você preferir)
3. **Descrição**: "Landing page - 1 mês de namoro"
4. **Público** (para funcionar no GitHub Pages)
5. **Não** inicialize com README (já temos os arquivos)
6. Clique em "Create repository"

### 3. Conectar e fazer push

```bash
git remote add origin https://github.com/SEU_USUARIO/sitemay.git
git branch -M main
git push -u origin main
```

### 4. Ativar GitHub Pages

1. Vá para o repositório no GitHub
2. Clique em **Settings** (engrenagem)
3. Na barra lateral, clique em **Pages**
4. Em "Source", selecione **main branch**
5. Clique em **Save**

Pronto! O site estará disponível em: `https://SEU_USUARIO.github.io/sitemay`

---

## 🔗 Gerar QR Code

### Pré-requisitos

```bash
pip install qrcode[pil] pillow
```

### Gerar QR code

```bash
cd F:\dev\sitemay
python qrcode-generator.py "https://SEU_USUARIO.github.io/sitemay"
```

Isso criará `qrcode.png` com:
- ✨ Cores rosa (tema)
- 🔒 Correção de erro alta (compatível com logo no centro)
- 📏 Alta resolução para impressão

---

## 🎁 Próximos Passos

### 1. Imprimir o QR code
- Abra `qrcode.png`
- Configure para imprimir em **alta qualidade**
- Tamanho recomendado: **5cm × 5cm ou maior**

### 2. Anexar ao presente
- Cole o QR code na embalagem, cartão ou toque no presente
- Quando ela escanear, será aberta a landing page

### 3. Testar o fluxo completo
1. Escanear QR code
2. Digitar a senha (data do pedido: `12092026`)
3. Abrir envelope
4. Ler a mensagem
5. Ver os motivos
6. Responder à pergunta final

---

## 🛠️ Solução de Problemas

### "Página em branco"
- Verifique o console (F12 → Console) para erros
- Garanta que `config.js` está sendo carregado
- Verifique URLs das imagens

### "Música não toca"
- Celular pode bloquear autoplay de áudio
- O som só inicia após tocar no envelope (proposital!)
- Verifique que `assets/ultimo-romance.mp3` existe

### "Fotos não aparecem"
- Verifique os nomes em `config.js` vs `assets/`
- Garanta que as extensões estão corretas (.jpg, .png, etc)
- Abra a aba Network (F12) para ver se as imagens 404

### "QR code não funciona"
- Teste escanear com Google Lens ou múltiplos apps
- Garanta que a URL está correta: `https://...` (HTTPS!)
- Regenere com `python qrcode-generator.py`

---

## 📝 Estrutura Final do Repositório

```
sitemay/
├── index.html
├── style.css
├── script.js
├── config.js
├── qrcode-generator.py
├── DEPLOYMENT.md (este arquivo)
├── qrcode.png (gerado)
├── assets/
│   ├── 00-ela-me-viu.jpg
│   ├── 01-primeiro-encontro.jpg
│   ├── ... (18 fotos)
│   ├── 17-bar.jpg
│   └── ultimo-romance.mp3
└── .gitignore (opcional)
```

### .gitignore (opcional, se quiser)

```
# OS
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/

# Temporary
*.tmp
node_modules/
```

---

## 🎉 Dicas Finais

1. **Teste no celular dela antes** (se possível discretamente)
2. **Garanta boa conexão WiFi** para carregar as imagens
3. **Backup do QR code** (digital + impresso)
4. **Hora certa**: Envie o presente em um momento especial
5. **Acompanhe**: Fique perto para ver a reação! 📸

---

## 💬 Perguntas?

Se algo não funcionar:
1. Verifique o console (F12 → Console)
2. Teste em outro navegador/dispositivo
3. Limpe cache (Ctrl+Shift+Delete em Chrome)

Boa sorte! 🌷💕
