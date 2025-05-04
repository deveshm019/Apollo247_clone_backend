import express from "express";
import multer from "multer";
import Doctor from "../models/doctor.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("profilePic"), async (req, res) => {
  try {
    const {
      name,
      specialty,
      experience,
      rating,
      available,
      location,
      consultationFee,
      languages,
      apolloDoctor,
      degree,
    } = req.body;

    if (
      !name ||
      !specialty ||
      !experience ||
      !rating ||
      !available ||
      !location ||
      !consultationFee ||
      !languages ||
      !degree ||
      !req.file
    ) {
      return res.status(400).json({ message: "Please Enter Full Data!" });
    }

    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "doctor_profiles" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const uploadedImage = await streamUpload(req.file.buffer);

    const newDoctor = new Doctor({
      name,
      specialty,
      experience: Number(experience),
      rating: Number(rating),
      available: Number(available),
      location,
      consultationFee: Number(consultationFee),
      languages: JSON.parse(languages),
      apolloDoctor: apolloDoctor === "true",
      degree,
      profilePic: uploadedImage.secure_url,
    });

    await newDoctor.save();
    res.status(201).json({ success: true, data: newDoctor });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
