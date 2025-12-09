# To-Do App

A simple, responsive web application for managing tasks built with React, Node.js, Express, and SQLite.

## Features

- ✅ Add new tasks with title and description
- ✏️ Edit existing tasks
- ✔️ Mark tasks as complete/incomplete
- 🗑️ Delete tasks
- 📱 Responsive design for mobile and desktop
- 🧪 Unit tests for frontend and backend

## Tech Stack

### Frontend
- React 19
- Vite (build tool)
- Vitest + Testing Library (testing)
- CSS3 (responsive design)

### Backend
- Node.js
- Express.js
- SQLite3 (database)
- Jest + Supertest (testing)

## Project Structure

```
.
├── backend/           # Node.js backend server
│   ├── server.js     # Express server with REST API
│   ├── server.test.js # Backend tests
│   └── package.json  # Backend dependencies
├── frontend/         # React frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   │   ├── AddTaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   └── *.test.jsx  # Component tests
│   │   ├── App.jsx      # Main app component
│   │   ├── main.jsx     # Entry point
│   │   └── index.css    # Styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd demo-to-do-agent-assignment
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```
The backend server will run on `http://localhost:5000`

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:3000`

3. Open your browser and navigate to `http://localhost:3000`

## Running Tests

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## API Endpoints

### Tasks API

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
  - Body: `{ "title": "string", "description": "string" }`
- `PUT /api/tasks/:id` - Update a task
  - Body: `{ "title": "string", "description": "string", "completed": boolean }`
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/health` - Health check endpoint

## Development

### Backend Development
The backend uses:
- Express for the REST API
- SQLite3 for data persistence
- CORS for cross-origin requests
- Built-in Express JSON parsing middleware

### Frontend Development
The frontend uses:
- Vite for fast development and building
- React hooks (useState, useEffect) for state management
- Fetch API for backend communication
- CSS with mobile-first responsive design

## Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

Key responsive features:
- Flexible grid layout
- Mobile-friendly touch targets
- Adaptive font sizes
- Collapsible task actions on small screens

## Security Considerations

This is a development/demo application. For production use, consider implementing:
- Rate limiting on API endpoints to prevent abuse
- Authentication and authorization
- Input validation and sanitization
- HTTPS/TLS encryption
- Environment-based configuration for sensitive data
- Database connection pooling and proper error handling

**Current Security Status:**
- ✅ No vulnerable dependencies detected
- ⚠️ Rate limiting not implemented (suitable for demo/development)
- ✅ SQL injection prevented through parameterized queries
- ✅ CORS configured for cross-origin requests

## License

This project is licensed under the ISC License - see the LICENSE file for details.
