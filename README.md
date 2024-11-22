<h1>Customizable Dashboard</h1>
<p>
      This repository contains a customizable dashboard application built with modern web technologies.
      It allows users to toggle the visibility of various widgets, persist their preferences, and authenticate securely.
</p>
<h2>Features</h2>
<ol>
    <li>
    <h3>Dashboard Page UI</h3>
    <ul>
<li><strong>Main Dashboard:</strong> Displays multiple widgets with different types of data (e.g., statistics, text).</li>
<li><strong>Intuitive Layout:</strong> Designed for a clean and user-friendly experience using Shadcn UI.</li>
</ul>
    </li>

<li>
<h3>Widget Customization</h3>
    <ul>
<li><strong>Dropdown & Checkboxes:</strong> A dropdown lists all available widgets, and checkboxes allow toggling visibility.</li>
<li><strong>Visibility:</strong> Users can show or hide widgets on the dashboard.</li>
<li><strong>Preference Persistence:</strong> Widget visibility preferences persist across page refreshes.</li>
</ul>
    </li>

<li>
<h3>Backend Integration</h3>
    <ul>
<li><strong>Widget State Management: </strong> Backend logic stores widget visibility states in PostgreSQL. </li>
<li><strong>State Retrieval: </strong> Fetches widget visibility states on page load. </li>
<li><strong>State Updates: </strong> Handles updates and ensures preferences are saved efficiently. </li>
</ul>
    </li>

<li>
<h3>Database Management</h3>
    <ul>
<li><strong>PostgreSQL & Drizzle ORM: </strong> Database schema and operations are handled with Drizzle ORM for robust and type-safe database management. </li>
</ul>
    </li>

<li>
<h3>Authentication</h3>
    <ul>
<li><strong>User Authentication: </strong>  </li>
<li>Secures the application using JWT for session management. </li>
<li>User-specific widget preferences are stored and retrieved. </li>
<li>Supports multiple user sessions. </li>
</ul>
    </li>

<h2>Tech Stack</h2>
    <h3>Frontend</h3>
      <ul>
        <li><strong>Framework:</strong> Next.js with TypeScript</li>
        <li><strong>UI Components:</strong> Shadcn UI</li>
      </ul>
   <h3>Backend</h3>
      <ul>
        <li><strong>API:</strong> Node.js with Express</li>
        <li><strong>Database:</strong> PostgreSQL</li>
        <li><strong>ORM:</strong> Drizzle ORM</li>
      </ul>
      <h3>Authentication</h3>
      <ul>
        <li><strong>Libraries:</strong></li>
        <li><code>bcryptjs</code>: For password hashing.</li>
        <li><code>jsonwebtoken (JWT)</code>: For secure user session management.</li>
      </ul>

<h2>Installation</h2>
      <ol>
        <li>
          <p><strong>Clone the Repository:</strong></p>
          <pre>
git clone https://github.com/ArunKuriakose15/customizable-dashboard.git  
cd customizable-dashboard
          </pre>
        </li>
        <li>
          <p><strong>Install Dependencies:</strong></p>
          <pre>npm install</pre>
        </li>
        <li>
          <p><strong>Building for Production:</strong></p>
          <pre>npm run build</pre>
        </li>
        <li>
          <p><strong>Running the Application:</strong></p>
          <p>Start the development server</p>
          <pre>
npm run dev
# or
yarn dev
          </pre>
          <p>Open <a>http://localhost:3000</a> with your browser to see the result.</p>
        </li>
 <li>
    <p><strong>Setting Up the Backend</strong></p>
        <ol>
        <li><p>Navigate to the Backend Directory:</p>
        <pre>cd Backend</pre>
        </li>
        <li><p>Install Dependencies:</p>
        <pre>npm install</pre>
        </li>
        <li>
    <p>Setup Environment Variables:</p>
        <p>Create a <code>.env</code> file in the backend directory with the following variables:</p>
            <pre>
DB_HOST=YOUR_HOST_NAME   
DB_USER=YOUR_USER_NAME   
DB_NAME=YOUR_DATABASE_NAME  
DB_PORT=YOUR_PORT_NUMBER   
DB_PASSWORD=YOUR_POSTGRES_PASSWORD  
JWT_SECRET=YOUR_JWT_SECRET
              </pre>
        </li>
    <li>
        <p>Run the Server:</p>
        <pre>node app.js</pre>
        <p>The server will run on <a>http://localhost:8085</a> </p>
    </li>









    

        
      
    

       
            
            

