#!/usr/bin/env bash
set -euo pipefail

cat > README.md <<'README'
<h1 align="center">🏷️ LeilaoApp v2.0</h1>

<p align="center">
  <b>Real-Time Auction Platform | Secure & Scalable</b>  
  <br/>
  <i>Bid with confidence — powered by Next.js 15 & NestJS 11</i>
</p>

<p align="center">
  <a href="https://leilaoapp.vercel.app"><img src="https://img.shields.io/badge/Live%20App-Vercel-blue?style=for-the-badge" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Security-Patched-success?style=for-the-badge&logo=shield" /></a>
  <a href="https://github.com/TheRealCocky/Leilao-client"><img src="https://img.shields.io/badge/Frontend-Next.js%2015-black?style=for-the-badge&logo=nextdotjs" /></a>
  <a href="https://github.com/TheRealCocky/Leilao-server"><img src="https://img.shields.io/badge/Backend-NestJS%2011-red?style=for-the-badge&logo=nestjs" /></a>
</p>

---

## 🛡️ Security Update (2026)
Esta versão foi atualizada para mitigar vulnerabilidades críticas de segurança:
- **Next.js Patched:** Atualizado para a versão estável `15.1.7` (Correção da CVE-2025-66478).
- **ESLint Config:** Implementação de *Flat Config* para garantir integridade do código durante o build.
- **Secure JWT:** Sistema de autenticação reforçado com NestJS Passport.

---

## 🚀 Overview
**LeilaoApp** é uma plataforma de leilões em tempo real que permite aos utilizadores **criar leilões**, **licitar ao vivo** e **receber notificações instantâneas**.  
Focado em performance e segurança, o ecossistema utiliza **Socket.IO** para comunicação bidirecional e **Prisma** para gestão de dados no **MongoDB**.

---

## 🧠 Architecture & Flow
O sistema utiliza uma arquitetura desacoplada onde o Frontend comunica via REST para operações CRUD e via WebSockets para a lógica de licitação.



---

## ✨ Key Features

| Feature | Description |
|----------|--------------|
| ⚡ **Real-Time Bidding** | Atualizações instantâneas de licitações via Socket.IO |
| 🛡️ **Role-Based Access** | Permissões distintas para Comprador, Vendedor e Admin |
| 📊 **Live Dashboard** | Acompanhamento de métricas e estado dos leilões em tempo real |
| 🔐 **Secure Auth** | Login via JWT com expiração e renovação segura |
| 📱 **Full Responsive** | Experiência otimizada para Desktop e Mobile |

---

## ⚙️ Deployment & Setup

### Backend (Render)
- **Runtime:** Node.js 20+
- **Build:** `npm install && npx prisma generate && npm run build`
- **Start:** `npm run start:prod`

### Frontend (Vercel)
- **Framework:** Next.js 15 (App Router)
- **Build:** `npm run build`

---

## 🌍 Repositories
- 🖥️ **Frontend:** [TheRealCocky/Leilao-client](https://github.com/TheRealCocky/Leilao-client)
- ⚙️ **Backend:** [TheRealCocky/Leilao-server](https://github.com/TheRealCocky/Leilao-server)

README

