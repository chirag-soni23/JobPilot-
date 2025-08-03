# JobPilot

JobPilot is a full-stack job portal application, organized into two main folders:

- **frontend**: React + Vite client application
- **backend**: Node.js + Express REST API server

---

## Frontend (`frontend/`)

Built with React and Vite, the frontend provides a fast, modern UI for job seekers and employers.

**Features:**

- Browse and search jobs
- Apply for jobs
- User authentication
- Admin dashboard

**Setup:**

```sh
cd frontend
npm install
npm run dev
```

Runs at [http://localhost:5173](http://localhost:5173).

---

## Backend (`backend/`)

Built with Node.js, Express, and MongoDB, the backend exposes RESTful APIs for job management and user authentication.

**Features:**

- User registration and login
- Job CRUD operations
- Job applications
- Admin endpoints

**Setup:**

```sh
cd backend
npm install
npm start
```

Runs at [http://localhost:5000](http://localhost:5000).

---

## Project Structure

```
JobPilot/
├── frontend/
│   └── ... (React + Vite app)
├── backend/
│   └── ... (Node.js + Express API)
```

---

## Environment Variables

Both folders require `.env` files for configuration. See any `.env.example` files for details.
