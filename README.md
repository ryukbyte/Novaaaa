NOVA Login
A responsive login page built with React and Vite, connected to a Node.js and Express backend. The project demonstrates frontend form validation, a mock login API, error handling, and a simple Dashboard view after successful login.
Note: This project uses mock credentials in the backend for demonstration. It is not production authentication and does not use a database or secure session management.

Features
- Responsive NOVA login interface
- Frontend validation for empty fields, invalid email addresses, and passwords shorter than 8 characters
- Express API endpoint for login
- Mock credential verification
- Error messages for invalid credentials or unavailable backend
- Dashboard view after a successful login
- Sign-out button to return to the login page
Tech Stack
- React
- Vite
- JavaScript
- CSS
- Node.js
- Express
- CORS
Project Structure
nova-login/
├── src/
│   ├── App.jsx
│   ├── App.css
│   └── index.css
├── server/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── package.json
└── README.md
Requirements
Install a current version of Node.js and npm.
Setup
1. Install frontend dependencies
Open a terminal in the project root (nova-login) and run:
npm install
2. Install backend dependencies
In the same terminal, run:
cd server
npm install
The backend uses Express and CORS.
Run the Project Locally
Run the frontend and backend in two separate terminal tabs.
Terminal 1 — Frontend
From the project root:
cd ~/Coding/React-tingting/nova-login
npm run dev
Open the local URL shown by Vite, usually:

http://localhost:5173/
Terminal 2 — Backend
cd ~/Coding/React-tingting/nova-login/server
node server.js
The backend should print:
NOVA API running at http://localhost:5001
The backend's port is configured in server/server.js. This project uses port 5001 because port 5000 was already occupied on the development Mac.

You can check the API by opening:

http://localhost:5001/

Expected response:
{"message":"NOVA API is running!"}
Keep both terminals running while testing the application.
Demo Login
Use these credentials on the login page:
- Email: demo@nova.com
- Password: Nova1234
A successful login displays the Dashboard view. Incorrect credentials should display an error message.
API Endpoint
POST /api/login
URL:
http://localhost:5001/api/login
Example JSON request:
{
  "email": "demo@nova.com",
  "password": "Nova1234"
}
A successful request returns a success message and a demo user object. Missing fields return HTTP 400; incorrect credentials return HTTP 401.
Troubleshooting
- Frontend does not open: Make sure the frontend terminal is running npm run dev and use the URL Vite prints.
- Login says it cannot connect: Check that the backend is running in the second terminal and that src/App.jsx sends requests to http://localhost:5001/api/login.
- Port 5001 is busy: Change PORT in server/server.js and update the URL in src/App.jsx to match.
- Dependencies are missing: Run npm install in the project root and npm install inside server/.
Future Improvements
- Add a database for user accounts
- Use password hashing and proper authentication/session handling
- Add a dedicated route for the Dashboard
- Add automated tests
- Configure environment variables for API URLs
Created as a learning project to practise React form handling and connecting a frontend to an Express API.
