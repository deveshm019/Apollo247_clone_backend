import express from "express";
import Doctor from "../models/Doctor.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const {
    page = 1,
    limit = 10,
    experience,
    consultationFee,
    language,
    apolloDoctor,
    sort,
  } = req.query;

  const andConditions = [];

  if (experience) {
    const experienceConditions = experience.split(",").map((range) => {
      if (range === "0-5") return { experience: { $gte: 0, $lte: 5 } };
      if (range === "6-10") return { experience: { $gte: 6, $lte: 10 } };
      if (range === "11-16") return { experience: { $gte: 11, $lte: 16 } };
      if (range === "16+") return { experience: { $gte: 17 } };
      return {};
    });
    andConditions.push({ $or: experienceConditions });
  }

  if (consultationFee) {
    const feeConditions = consultationFee.split(",").map((range) => {
      if (range === "100-500")
        return { consultationFee: { $gte: 100, $lte: 500 } };
      if (range === "500-1000")
        return { consultationFee: { $gte: 500, $lte: 1000 } };
      if (range === "1000+") return { consultationFee: { $gte: 1000 } };
      return {};
    });
    andConditions.push({ $or: feeConditions });
  }

  if (language) {
    const languagesArray = language.split(",").map((lang) => lang.trim());
    andConditions.push({ languages: { $in: languagesArray } });
  }

  if (apolloDoctor === "true" || apolloDoctor === "false") {
    andConditions.push({ apolloDoctor: apolloDoctor === "true" });
  }

  const query = andConditions.length > 0 ? { $and: andConditions } : {};

  let sortOption = {};
  switch (sort) {
    case "availability":
      sortOption = { available: 1 };
      break;
    case "price-low-high":
      sortOption = { consultationFee: 1 };
      break;
    case "price-high-low":
      sortOption = { consultationFee: -1 };
      break;
    case "experience":
      sortOption = { experience: -1 };
      break;
    case "most-liked":
      sortOption = { rating: -1 };
      break;
    default:
      sortOption = {};
  }

  try {
    const doctors = await Doctor.find(query)
      .sort(sortOption)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Doctor.countDocuments(query);

    res.json({
      data: doctors,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
