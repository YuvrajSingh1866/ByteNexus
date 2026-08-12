const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  type: { type: String, enum: ["pdf", "video", "link"], default: "pdf" }
});

const firstYearSubjectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: "Explore resources for this subject." },
  resources: {
    notes: [resourceSchema],
    pyqs: [resourceSchema],
    cho: [resourceSchema],
    assignments: [resourceSchema],
    importantQuestions: [resourceSchema],
    videoResources: [resourceSchema]
  }
}, { timestamps: true });

module.exports = mongoose.model("FirstYearSubject", firstYearSubjectSchema);
