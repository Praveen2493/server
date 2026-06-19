# Task Management System - Backend API

## Project Overview

This is the backend API for the **Task Management System** developed using **Node.js**, **Express.js**, and **MongoDB**. It provides secure authentication using JWT and REST APIs for managing users, tasks, comments, dashboards, and profile management.

---

## Features

* User Registration
* User Login with JWT Authentication
* Protected API Routes
* User Profile Management
* Upload Profile Image
* Change Password
* Task Management (Create, Read, Update, Delete)
* Dashboard Statistics
* Task Comments
* MongoDB Atlas Database
* REST API Architecture

---

## Technology Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT (JSON Web Token)
* bcryptjs
* Multer
* CORS
* Dotenv

---

## Project Structure

```
server
│
├── config
│   └── db.js
│
├── controllers
│
├── middleware
│
├── models
│
├── routes
│
├── uploads
│
├── server.js
│
├── package.json
│
└── .env
```

---

## Installation

Clone the repository

```
git clone <your-backend-github-repository>
```

Move into the project

```
cd server
```

Install dependencies

```
npm install
```

Start development server

```
npm run dev
```

Run production server

```
npm start
```

---

## Environment Variables

Create a `.env` file in the project root.

Example:

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=https://your-frontend-url.netlify.app
```

---

## API Base URL

Development

```
http://localhost:5000/api
```

Production

```
https://your-render-app.onrender.com/api
```

---

## API Endpoints

### Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

### Users

| Method | Endpoint                   |
| ------ | -------------------------- |
| GET    | /api/users/profile         |
| PUT    | /api/users/profile         |
| PUT    | /api/users/change-password |
| POST   | /api/users/upload-profile  |

### Tasks

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /api/tasks     |
| POST   | /api/tasks     |
| PUT    | /api/tasks/:id |
| DELETE | /api/tasks/:id |

### Dashboard

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /api/dashboard |

### Comments

| Method | Endpoint              |
| ------ | --------------------- |
| GET    | /api/comments/:taskId |
| POST   | /api/comments         |

---

## Deployment

### Frontend

Netlify

### Backend

Render

### Database

MongoDB Atlas

---

## Frontend Repository

Add your frontend GitHub repository link here.

---

## Frontend Live URL

Add your Netlify URL here.

---

## Backend Live URL

Add your Render URL here.

---

## Author

Praveen Kumar

---

## License

This project is created for learning and educational purposes as part of the GUVI Full Stack Development Program.
