import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import addDoctorRoute from "./routes/add-doctor.js";
import listDoctorRoute from "./routes/list-doctor-with-filter.js";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/add-doctor", addDoctorRoute);
app.use("/api/list-doctor-with-filter", listDoctorRoute);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

startServer();
