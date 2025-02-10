# 🌿 Carbon Credit Trading Platform

## 📌 Introduction

This project is a professional **Carbon Credit Trading Platform** built using the **MERN (MongoDB, Express.js, React.js, Node.js) stack**. It facilitates the **buying, selling, and tracking** of carbon credits in both **compliance** and **voluntary markets**, providing a secure and efficient trading experience.

---

## 📖 Table of Contents

1. [✨ Features](#-features)
2. [🛠️ Technologies Used](#-technologies-used)
3. [🚀 Getting Started](#-getting-started)
4. [📁 Project Structure](#-project-structure)
5. [🔗 API Endpoints](#-api-endpoints)
6. [🖥️ Frontend Components](#-frontend-components)
---

## ✨ Features

✔️ **User Authentication & Authorization** (JWT-based security)  
✔️ **Gmail OTP Verification for Secure Login**  
✔️ **Carbon Credit Listing & Management** (Create, update, and delete listings)  
✔️ **Payment Integration for Buying Carbon Credits** (Stripe or PayPal)  
✔️ **Emissions & Credit Tracking Dashboard** (Real-time analytics)  
✔️ **Integration with Carbon Credit Verification Services**  

---

## 🛠️ Technologies Used

### 🖥️ Frontend
- ⚛️ **React.js** (Component-based UI)  
- 🏗️ **ShadCN** (Modern UI Components)  
- 🌊 **Tailwind CSS** (Utility-first styling)  
- 📜 **React Context API** (State management)  

### 🔗 Backend
- 🚀 **Node.js & Express.js** (RESTful API)  
- 🔐 **JSON Web Tokens (JWT)** (Secure authentication)  
- 📧 **Nodemailer** (Gmail OTP verification)  
- 💳 **Stripe** (Payment integration)  

### 🗄️ Database
- 🛢️ **MongoDB (NoSQL)** (Flexible & scalable storage)  
- 📊 **Mongoose ORM** (Schema-based validation)  

---

## 🚀 Getting Started

### 📌 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or later)  
- **MongoDB** (Local or cloud instance)  
- **npm**  (Package manager)  

### 📥 Installation

1️⃣ **Clone the repository:**
```sh
 git clone https://github.com/nxtnilesh/carbonEase.git
 cd cityEase
```

2️⃣ **Install dependencies:**
```sh
 npm install
```

3️⃣ **Configure environment variables:**
- Create a `.env` file in the root directory.
- Add the required variables (e.g., `MONGO_URI`, `JWT_SECRET`, `SMTP_CONFIG`, `STRIPE_API_KEY`, etc.)

4️⃣ **Run the development server:**
```sh
 npm run dev
```

5️⃣ **Access the application:**  
Visit **`http://localhost:3000`** in your browser.

---

## 📁 Project Structure
```
carbon-credit-platform/
├── backend/   # Express.js backend
│   ├── controllers/   # Business logic
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   ├── utils/         # Utility functions
│   ├── config/        # Configuration files
│   └── index.js      # Entry point
│
├── frontend/  # React.js frontend
│   ├── components/    # Reusable components
│   ├── context/       # Context API for state management
│   ├── pages/         # Page components
│   ├── styles/        # Tailwind styles
│   ├── services/      # API call logic
│   └── App.js         # Main application file
│
└── README.md  # Project documentation
```

---

## 🔗 API Endpoints

| Method | Endpoint            | Description |
|--------|--------------------|-------------|
| **POST** | `/api/auth/register` | Register a new user |
| **POST** | `/api/auth/login` | User login |
| **POST** | `/api/auth/verify-otp` | OTP Verification |
| **GET** | `/api/credits` | Get all carbon credits |
| **POST** | `/api/credits` | Create a new listing |
| **PATCH** | `/api/credits/:id` | Update a listing |
| **DELETE** | `/api/credits/:id` | Delete a listing |
| **POST** | `/api/payment` | Process a payment |

---

## 🖥️ Frontend Components
- **Authentication Pages (Login, Register, OTP Verification)**  
- **Dashboard (User & Admin with Analytics)**  
- **Carbon Credit Listings**  
- **Trading Interface**  
- **Profile & Payment Management**  

---

💡 *Empowering a sustainable future through technology!* 🌱

