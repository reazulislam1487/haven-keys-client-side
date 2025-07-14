# 🏃 Marathon Zone

![Marathon Zone Screenshot](https://i.postimg.cc/CMZttcGK/Screenshot-2025-06-25-053132.png)


---

### 📜 Project Overview

**Marathon Zone** is a full-stack web application that connects marathon organizers and participants. Organizers can create events, while users can register and manage their activities from a personal dashboard. The platform offers a clean UI, secure authentication, and a responsive experience across all devices.

---

### 🌐 Live & Source Code Links

* 🔗 **Live Site:** [https://marathonzonebyreaz.netlify.app](https://marathonzonebyreaz.netlify.app)
* 💻 **Client Repository:** [GitHub - Client](https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-reazulislam1487-1.git)
* 🛠️ **Server Repository:** [GitHub - Server](https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-reazulislam1487-1.git)

---

### 🛠️ Main Technologies Used

#### 🔠 **Frontend**

* React.js
* Tailwind CSS
* Firebase Authentication
* React Router DOM

#### 🔠 **Backend**

* Node.js
* Express.js
* MongoDB
* JWT (JSON Web Token)

---

### 🚀 Key Features

* 🔐 JWT-authenticated private routes
* 📋 Full CRUD operations for marathons and registrations
* 📱 Fully responsive across mobile, tablet, and desktop
* 🔍 Server-side search and sort functionality
* 🌃 Dark/Light mode toggle
* ⏱ Countdown timer for upcoming marathons
* 🗓 Integrated datepicker for event scheduling
* 🎨 Clean and animated UI with alerts and interactivity

---

### 📦 Project Dependencies

<details>
<summary>Click to expand</summary>

```json
"dependencies": {
  "@tailwindcss/vite": "^4.1.7",
  "axios": "^1.9.0",
  "daisyui": "^5.0.37",
  "dotenv": "^16.5.0",
  "firebase": "^11.8.1",
  "icons": "^1.0.0",
  "lottie-react": "^2.4.1",
  "lucide-react": "^0.513.0",
  "motion": "^12.14.0",
  "react": "^19.1.0",
  "react-countdown-circle-timer": "^3.2.1",
  "react-datepicker": "^8.4.0",
  "react-dom": "^19.1.0",
  "react-icons": "^5.5.0",
  "react-router": "^7.6.1",
  "react-slick": "^0.30.3",
  "slick-carousel": "^1.8.1",
  "sweetalert2": "^11.22.0",
  "swiper": "^11.2.8",
  "tailwindcss": "^4.1.7"
}
```

</details>

---

### 💻 Getting Started (Run Locally)

#### 📁 Clone and install client:

```bash
git clone https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-reazulislam1487-1.git
cd b11a11-client-side-reazulislam1487-1
npm install
npm run dev
```

#### 📁 Clone and install server:

```bash
git clone https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-reazulislam1487-1.git
cd b11a11-server-side-reazulislam1487-1
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
```

---


