# TaskCloud 📝

A simple full-stack Task Manager app built with:

- **Frontend**: React.js (with Context API & Routing)
- **Authentication**: JWT-based login/register
- **Backend**: Node.js + Express.js + MySQL (via `mysql2/promise`)
- **Features**: Filters, Priority/Deadline sorting, Statistics, Auth-guarded tasks

---

## 🚀 How to Run the Project

### 1. Backend (Node.js + Express)

```bash
cd backend
npm install
````

### 2. Setup MySQL Database via phpMyAdmin

1. Open `phpMyAdmin` in XAMPP.
2. Create a database named: `taskcloud`
3. Import the provided SQL file from `backend/taskcloud_schema.sql` or similar.
4. It will create tables like `users`, `tasks`.

### 3. Frontend (React)

```bash
cd frontend
npm install
```

### 4. How to run

```bash
cd mainfolder
npm install
npm start
```

* Make sure you are running this command in main folder.
* Make sure MySQL is running via **XAMPP** or any MySQL server.
* Update DB credentials in `server.js` if needed (`host`, `user`, `password`, `database`).

---

## ✅ Assumptions Made

* Every task is linked to a specific user via `user_id`.
* Users must log in before creating/viewing/updating tasks.
* No email verification or password reset for now.
* App runs locally with no deployment yet.

---

## 🔧 Improvements (Given More Time)

### Features

* Add pagination or infinite scroll
* Real-time reminders/notifications (via socket.io)
* Recurring tasks & subtasks support
* Calendar View for deadline visualization
* Better UI
* Dark mode toggle support
* Deployment
* CI/CD pipeline via GitHub Actions

---

## 📁 Folder Structure Overview

```
project/
├── backend/              # Express.js backend
│   └── server.js
│   └── taskcloud.sql
├── frontend/             # React.js frontend
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.test.js
│   ├── public/
│   └── package.json
└── README.md
```

---