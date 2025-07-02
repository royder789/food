**Food Delivery Web App** 🍔🌐



## 🔍 Project Overview

A full-stack **Food Delivery Web Application** that enables users to browse, select, and order meals seamlessly. The project comprises a Node.js/Express backend and a React-based frontend, delivering a responsive, intuitive UI for food ordering.

## ⭐ Features

* 🍽️ **Browse Menu:** View categorized food items with images, descriptions, and prices.
* 🛒 **Cart Management:** Add, remove, and update item quantities in the shopping cart.
* 🧑‍💻 **User Authentication:** Sign up, log in, and maintain secure sessions.
* 💳 **Order Processing:** Place orders, view order history, and receive confirmation.
* 📦 **Admin Panel:** CRUD operations for menu items and order status updates.
* 📱 **Responsive Design:** Mobile-first layout for all devices.

## 🛠️ Technology Stack

| Layer          | Technology            |
| -------------- | --------------------- |
| Frontend       | React, Tailwind CSS   |
| Backend        | Node.js, Express      |
| Database       | MongoDB (Mongoose)    |
| Authentication | JSON Web Tokens (JWT) |
| Deployment     | Render.com            |

## 🚀 Live Demo

Access the live frontend here:

**[Food App Live](https://food-frontend-i3z9.onrender.com/)**

## ⚙️ Getting Started

Follow these steps to run the project locally.

### Prerequisites

* Node.js (v14+)
* npm (v6+)
* MongoDB Atlas account or local MongoDB instance

### Backend Setup

1. **Clone the repo** and navigate to the backend directory:

   ```bash
   git clone https://github.com/royder789/food.git
   cd food/backend
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Configure environment variables:**

   * Create a `.env` file in `backend/` with:

     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
4. **Start the server:**

   ```bash
   node server.js
   ```

   The backend API will run at `http://localhost:5000`.

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd ../frontend
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Configure environment variables:**

   * Create a `.env` file in `frontend/` with:

     ```env
     REACT_APP_API_URL=http://localhost:5000
     ```
4. **Start the React app:**

   ```bash
   npm run ndev
   ```

   The frontend will launch at `http://localhost:3000`.

## 📡 API Endpoints

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/auth/register` | Register a new user     |
| POST   | `/api/auth/login`    | Log in existing user    |
| GET    | `/api/menu`          | Fetch all menu items    |
| POST   | `/api/cart`          | Add item to cart        |
| GET    | `/api/cart`          | Get current user's cart |
| POST   | `/api/order`         | Place a new order       |
| GET    | `/api/order/history` | Get user order history  |
| GET    | `/api/admin/menu`    | \[Admin] All menu CRUD  |

## 📂 Folder Structure

```
food/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
└── README.md


## 🤝 Contributors

* **Mihir Kumar Roy** – *Full-Stack Developer*

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

*\*Enjoy building and customizing your Food Delivery App!* 🍽️
