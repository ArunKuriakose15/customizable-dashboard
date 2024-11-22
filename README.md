This repository contains a customizable dashboard application built with modern web technologies. It allows users to toggle the visibility of various widgets, persist their preferences, and authenticate securely.

Features
1. Dashboard Page UI
<b>Main Dashboard: Displays multiple widgets with different types of data (e.g., statistics, text).
Intuitive Layout: Designed for a clean and user-friendly experience using Shadcn UI.</b>
2. Widget Customization
Dropdown & Checkboxes: A dropdown lists all available widgets, and checkboxes allow toggling visibility.
Visibility Toggle: Users can show or hide widgets on the dashboard.
Preference Persistence: Widget visibility preferences persist across page refreshes.
3. Backend Integration
Widget State Management: Backend logic stores widget visibility states in PostgreSQL.
State Retrieval: Fetches widget visibility states on page load.
State Updates: Handles updates and ensures preferences are saved efficiently.
4. Database Management
PostgreSQL & Drizzle ORM: Database schema and operations are handled with Drizzle ORM for robust and type-safe database management.
5. Authentication
User Authentication:
Secures the application using JWT for session management.
User-specific widget preferences are stored and retrieved.
Supports multiple user sessions.

Tech Stack
Frontend
Framework: Next.js with TypeScript
UI Components: Shadcn UI
Backend
API: Node.js with Express
Database: PostgreSQL
ORM: Drizzle ORM
Authentication
Libraries:
bcryptjs: For password hashing.
jsonwebtoken (JWT): For secure user session management.

Installation
1. Clone the Repository:

git clone https://github.com/ArunKuriakose15/customizable-dashboard.git  
cd customizable-dashboard

2. Install Dependencies:

npm install

3. Building for Production
Build the app for production:

npm run build

4. Running the Application
Start the development server:

npm run dev
# or
yarn dev

Open http://localhost:3000 with your browser to see the result.

Setting Up the Backend

5. Navigate to the Backend Directory:
cd Backend

6. Install Dependencies:

npm install

7. Setup Environment Variables:
Create a .env file in the backend directory with the following variables:

DB_HOST=YOUR_HOST_NAME   
DB_USER=YOUR_USER_NAME   
DB_NAME=YOUR_DATABASE_NAME  
DB_PORT=YOUR_PORT_NUMBER   
DB_PASSWORD=YOUR_POSTGRES_PASSWORD  
JWT_SECRET=YOUR_JWT_SECRET 

8.  Run the Server:

node app.js

The server will run on http://localhost:8085.
