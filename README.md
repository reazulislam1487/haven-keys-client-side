# New HavenKeys README content

HavenKeys

![HavenKeys Screenshot](https://i.postimg.cc/BnpnZSCm/Screenshot-2025-07-26-000143.png)

---

### 📜 Project Overview

**HavenKeys** is a full-stack real estate web platform where users can explore, wishlist, review, and purchase properties. It supports multiple roles (User, Agent, Admin), and features dashboards tailored to each role with advanced property and user management. The site is built using the MERN stack with modern web practices and a fully responsive UI.

---

### 🌐 Live & Source Code Links

- 🔗 **Live Site:** [https://havenkeys.vercel.app](https://haven-keys.web.app/)
- 💻 **Client Repository:** [GitHub - Client](https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-reazulislam1487)
- 🛠️ **Server Repository:** [GitHub - Server](https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-reazulislam1487)

---

### 🛠️ Main Technologies Used

#### 🔠 **Frontend**

- React.js
- Tailwind CSS
- Firebase Authentication
- React Router
- React Hook Form
- SweetAlert2
- Swiper.js

#### 🔠 **Backend**

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token)
- Stripe for Payment

---

### 🚀 Key Features

- 🧑‍🤝‍🧑 Role-based dashboard: User, Agent, Admin
- ❤️ Add to Wishlist & make offers on properties
- 🏷️ Price validation and secure Stripe payment
- 🧾 Full CRUD: Properties, Reviews, Users
- 🔐 JWT-authenticated private routes
- 🧮 Real-time dashboard stats, search & sorting
- 📈 Selling statistics chart for agents
- 📢 Property reporting and advertisement control
- 📱 Fully responsive across mobile, tablet, and desktop

---

### 📦 Project Dependencies (Client Side)

<details>
<summary>Click to expand</summary>

```json
"dependencies": {
  "axios": "^1.5.0",
  "firebase": "^11.0.0",
  "jwt-decode": "^3.1.2",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-icons": "^5.0.0",
  "react-router-dom": "^6.4.0",
  "react-hook-form": "^7.43.1",
  "sweetalert2": "^11.4.8",
  "swiper": "^9.0.0",
  "recharts": "^2.5.0",
  "tanstack/react-query": "^4.29.2",
  "stripe": "^11.0.0"
}
```

#### 💻 Getting Started (Run Locally)

#### 📁 Clone and install client:

```bash
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-reazulislam1487
cd b11a12-client-side-reazulislam1487
npm install
npm run dev
```

#### 📁 Clone and install server:

```bash
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-reazulislam1487
cd b11a12-server-side-reazulislam1487
npm install
npm start
```

---

### 🔐 Environment Variable Setup

#### 🔠 Client `.env` file:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_API_URL=http://localhost:5000
```

#### 🔠 Server `.env` file:

```
PORT=5000
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret

```

---
