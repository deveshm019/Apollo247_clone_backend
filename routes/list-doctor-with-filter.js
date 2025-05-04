const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

router.get("/", async (req, res) => {
  const {
    page = 1,
    limit = 10,
    experience,
    consultationFee,
    language,
    apolloDoctor,
    sort, // ✅ New
  } = req.query;

  const andConditions = [];

  // Experience filter
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

  // Consultation fee filter
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

  // Language filter
  if (language) {
    const languagesArray = language.split(",").map((lang) => lang.trim());
    andConditions.push({ languages: { $in: languagesArray } });
  }

  // Apollo Doctor filter
  if (apolloDoctor === "true" || apolloDoctor === "false") {
    andConditions.push({ apolloDoctor: apolloDoctor === "true" });
  }

  const query = andConditions.length > 0 ? { $and: andConditions } : {};

  // ✅ Sorting logic
  let sortOption = {};
  switch (sort) {
    case "availability":
      sortOption = { available: 1 }; // show available doctors first
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
      sortOption = { rating: -1 }; // assuming 'rating' represents popularity
      break;
    default:
      sortOption = {}; // relevance / default order
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
module.exports = router;
