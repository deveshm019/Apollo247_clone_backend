Apollo Clone Project
Overview
This is a clone of Apollo 24/7, a platform that provides virtual consultations with doctors in various specialties. The project includes functionalities like searching for doctors based on specialty, location, and experience, filtering by consultation fee, sorting by availability, and more.

Features
Doctor Search: Search for doctors by specialty, location, experience, and consultation fee.

Filter Options: Filter doctors based on experience, consultation fee, and languages.

Sort Doctors: Sort doctors by relevance, availability, consultation fee (low to high or high to low), experience, etc.

Responsive Design: Fully responsive interface for both mobile and desktop views.

Real-time Availability: Displays the minutes until the doctor is available for consultation.

Tech Stack
Frontend:

Next.js

React

Tailwind CSS

Backend:

Node.js

Express

MongoDB

Additional Tools:

Apollo Client (for managing state with GraphQL)

MongoDB (for storing doctor data)

JWT Authentication (for user sessions)

Setup Instructions
Prerequisites
Ensure you have the following installed:

Node.js: Download Node.js

MongoDB: If you’re using a local MongoDB instance, install MongoDB. Alternatively, use MongoDB Atlas.

Backend Setup
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/apollo-clone.git
Navigate to the backend directory:

bash
Copy
Edit
cd apollo-clone/backend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file and add the following environment variables:

env
Copy
Edit
MONGO_URI=mongodb://localhost:27017/apollo-clone
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_BASE=http://localhost:5000
Start the backend server:

bash
Copy
Edit
npm start
