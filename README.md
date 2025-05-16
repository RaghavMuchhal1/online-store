# Online Store - FullStack Developer Tech Task

## 🚀 Project Description

This project is a FullStack web application for an online mobile phone store. The app allows **Admins** to manage products and **Customers** to browse available products.

---

## 🌟 Features

### Admin Features:

* User Authentication (Signup, Login)
* Add, Edit, Delete Products
* View all products created by the admin
* Search, Filter, and Pagination for products
* Logout functionality

### Customer Features:

* Browse all available products
* View product details
* Logout functionality

---

## 🛠️ Tech Stack

* **Frontend:** React, Redux, React Router, Tailwind CSS, Axios, React Toastify
* **Backend:** Node.js, Express, PostgreSQL, Sequelize, JWT for authentication
* **Testing:** Jest, Supertest for API testing
* **Documentation:** Swagger for API documentation

---

## 💻 Installation and Setup

### Prerequisites:

* Node.js and npm installed
* PostgreSQL installed and running

### Step 1: Clone the repository

```bash
git clone https://github.com/username/online-store.git
cd online-store
```

### Step 2: Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```
2. Install backend dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file:

   ```
   PORT=5500
   JWT_SECRET=your_jwt_secret_key
   DATABASE_URL=postgres://username:password@localhost:5432/online_store
   ```
4. Run database migrations:

   ```bash
   npx sequelize db:migrate
   ```
5. Start the backend server:

   ```bash
   npm start
   ```
6. Verify API is running:

   ```
   http://localhost:5500
   ```

### Step 3: Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd ../frontend
   ```
2. Install frontend dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file:

   ```
   REACT_APP_API_URL=http://localhost:5500/api
   SKIP_PREFLIGHT_CHECK=true
   ```
4. Start the frontend server:

   ```bash
   npm start
   ```
5. Access the application:

   ```
   http://localhost:3000
   ```

---

## 🧪 Running Tests

### Unit Tests:

To run the unit tests for both frontend and backend:

```bash
npm test
```

### E2E Tests:

To run end-to-end tests:

```bash
npm run e2e
```

---

## 📚 API Documentation

The project uses **Swagger** for API documentation.
To view the documentation, start the backend server and visit:

```
http://localhost:5500/api-docs
```

---

## 🗂️ Project Structure

```
online-store/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # API business logic
│   ├── middleware/     # Authentication and authorization
│   ├── models/         # Sequelize models
│   ├── routes/         # API endpoints
│   ├── tests/          # Unit and integration tests
│   └── server.js       # Entry point for the backend
└── frontend/
    ├── src/
    │   ├── components/ # Reusable components
    │   ├── features/   # Feature-specific pages
    │   ├── redux/      # State management with Redux
    │   └── App.js      # Main application file
```

---

## 🎥 Loom Video Demo

Click [here](https://loom.com/share/your-video-link) to view the demo of the application.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch:

   ```
   git checkout -b feature-branch
   ```
3. Make your changes.
4. Commit your changes:

   ```
   git commit -m "Add new feature"
   ```
5. Push to your branch:

   ```
   git push origin feature-branch
   ```
6. Create a pull request.

---

## 📜 License

This project is licensed under the MIT License.
