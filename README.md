Apollo Clone Project
Overview
This is a clone of Apollo 24/7, a platform that provides virtual consultations with doctors in various specialties. The project includes functionalities like searching for doctors based on specialty, location, and experience, filtering by consultation fee, sorting by availability, and more.

Features
Doctor Search: Search for doctors by specialty, location, experience, and consultation fee.

Filter Options: Filter doctors based on experience, consultation fee, and languages.

Sort Doctors: Sort doctors by relevance, availability, consultation fee (low to high or high to low), experience, etc.

Real-time Availability: Displays the minutes until the doctor is available for consultation.

Tech Stack (backend)

Node.js

Express

MongoDB


Setup Instructions
Prerequisites
Ensure you have the following installed:

Node.js: Download Node.js

MongoDB: If you’re using a local MongoDB instance, install MongoDB. Alternatively, use MongoDB Atlas.

Backend Setup
Clone the repository:

git clone https://github.com/your-username/apollo-clone.git

Install dependencies:
npm install

Create a .env file and add the following environment variables:

MONGO_URI = mongoDB connection string
PORT = port number
CLOUD_NAME = cloudinary name
CLOUD_API_KEY = cloudinary API key
CLOUD_API_SECRET = cloudinary API secret key

Start the backend server:
npm start
