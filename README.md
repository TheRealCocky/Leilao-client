#!/usr/bin/env bash
set -euo pipefail

cat > README.md <<'README'
# 🏷️ LeilaoApp

**LeilaoApp** is a full-stack real-time auction platform built with **Next.js** (frontend) and **NestJS** (backend).  
It allows users to create and manage auctions, place bids in real time, and receive instant notifications — all through a responsive interface powered by **Socket.IO** and **Prisma (MongoDB)**.

---

## 🌍 Live Demo & Repositories

- **Live App:** [https://leilaoapp.vercel.app](https://leilaoapp.vercel.app)  
- **Frontend Repo:** [github.com/TheRealCocky/Leilao-client](https://github.com/TheRealCocky/Leilao-client)  
- **Backend Repo:** [github.com/TheRealCocky/Leilao-server](https://github.com/TheRealCocky/Leilao-server)

---

## 🚀 Overview

LeilaoApp provides a modern auction experience where multiple users can bid simultaneously with real-time updates and winner notifications.  
It’s designed to be **scalable**, **secure**, and **responsive**, integrating **Next.js**, **NestJS**, **Prisma**, and **MongoDB** under a clean architecture.

---

## ✨ Key Features

- 🧑‍💼 **User Roles:** Buyer, Seller, and Admin  
- 🕒 **Real-time Bidding:** Live auction updates using Socket.IO  
- 🧾 **Auction Management:** Create, update, and close auctions  
- 🔔 **Notifications:** Real-time winner and bid updates  
- 🔐 **Authentication:** JWT-based auth with role-based permissions  
- 📊 **Dashboards:** Track your auctions and bids  
- 📱 **Fully Responsive UI:** Optimized for mobile and desktop  

---

## 🧠 Architecture


- **Frontend:** Renders auction pages and real-time updates  
- **Backend:** Handles authentication, auction logic, and notifications  
- **Socket.IO:** Synchronizes data between users instantly  
- **Database:** MongoDB via Prisma ORM  

---

## ⚙️ Tech Stack

**Frontend:**  
- Next.js 15  
- TypeScript  
- TailwindCSS + shadcn/ui  
- Socket.IO Client  
- Deployed on Vercel  

**Backend:**  
- NestJS  
- Prisma ORM  
- MongoDB  
- JWT Authentication  
- Socket.IO Server  
- Deployed on Render  

---

## 🧩 Environment Variables

### Backend (`.env`)
```bash
DATABASE_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/auction-app"
JWT_SECRET="your_jwt_secret"
PORT=3001
git clone https://github.com/TheRealCocky/Leilao-client
git clone https://github.com/TheRealCocky/Leilao-server

