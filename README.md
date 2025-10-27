#!/usr/bin/env bash
set -euo pipefail

cat > README.md <<'README'
<h1 align="center">🏷️ LeilaoApp</h1>

<p align="center">
  <b>Real-Time Auction Platform built with Next.js & NestJS</b>  
  <br/>
  <i>Bid, compete, and win — all in real time!</i>
</p>

<p align="center">
  <a href="https://leilaoapp.vercel.app"><img src="https://img.shields.io/badge/Live%20App-Vercel-blue?style=for-the-badge" /></a>
  <a href="https://github.com/TheRealCocky/Leilao-client"><img src="https://img.shields.io/badge/Frontend-Next.js-black?style=for-the-badge&logo=nextdotjs" /></a>
  <a href="https://github.com/TheRealCocky/Leilao-server"><img src="https://img.shields.io/badge/Backend-NestJS-red?style=for-the-badge&logo=nestjs" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Database-MongoDB-green?style=for-the-badge&logo=mongodb" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Deployed%20On-Render%20%26%20Vercel-purple?style=for-the-badge" /></a>
</p>

---

## 🚀 Overview

**LeilaoApp** is a full-stack, real-time auction platform where users can **create auctions**, **place live bids**, and **receive instant notifications** when they win.  
It’s designed to be **responsive**, **secure**, and **scalable**, connecting buyers and sellers in real-time through **Socket.IO** and **Prisma (MongoDB)**.

---

## 🌍 Live Demo & Repositories

- 🖥️ **Live App:** [https://leilaoapp.vercel.app](https://leilaoapp.vercel.app)  
- 💻 **Frontend Repo:** [TheRealCocky/Leilao-client](https://github.com/TheRealCocky/Leilao-client)  
- ⚙️ **Backend Repo:** [TheRealCocky/Leilao-server](https://github.com/TheRealCocky/Leilao-server)

---

## ✨ Key Features

| Feature | Description |
|----------|--------------|
| 🧑‍💼 **User Roles** | Buyer, Seller, and Admin with role-based permissions |
| ⚡ **Real-Time Bidding** | Instant bid updates via Socket.IO |
| 🔔 **Notifications** | Live winner and outbid alerts |
| 📊 **Dashboard** | Track auctions and user activities |
| 🔐 **Authentication** | Secure JWT login system |
| 🧾 **Auction Management** | Create, edit, and finalize auctions |
| 📱 **Responsive Design** | Works on mobile, tablet, and desktop |

---

## 🧠 Architecture

```mermaid
graph LR
A[Next.js Frontend] -- REST API --> B[NestJS Backend]
A <-- WebSocket --> B
B --> C[(MongoDB Database)]


