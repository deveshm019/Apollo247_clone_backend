const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  experience: Number,
  rating: Number,
  available: Number,
  location: String,
  consultationFee: Number,
  languages: [String],
  apolloDoctor: {
    type: Boolean,
    default: true,
  },
  degree: String,
  profilePic: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
