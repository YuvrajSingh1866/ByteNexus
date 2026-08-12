import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StepIndicator from "../components/upload/StepIndicator";
import CourseInfoForm from "../components/upload/CourseInfoForm";
import LivePreview from "../components/upload/LivePreview";
import CompletionCard from "../components/upload/CompletionCard";
import "./UploadCourse.css";
const STEPS = [
  { id: "info", label: "Course Information" },
  { id: "curriculum", label: "Curriculum" },
  { id: "resources", label: "Resources" },
  { id: "publish", label: "Publish" },
];

const INITIAL_FORM_STATE = {
  thumbnail: null,
  thumbnailPreview: null,
  banner: null,
  bannerPreview: null,
  title: "",
  shortDescription: "",
  fullDescription: "",
  category: "",
  difficulty: "",
  language: "",
  courseType: "paid",
  price: "",
  duration: "",
  lessons: "",
  tags: [],
};

export default function UploadCourse() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleThumbnailUpload = (file) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      thumbnail: file,
      thumbnailPreview: previewUrl,
    }));
  };

  const handleBannerUpload = (file) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      banner: file,
      bannerPreview: previewUrl,
    }));
  };

  const handleAddTag = (tag) => {
    setFormData((prev) => {
      if (prev.tags.includes(tag)) return prev;
      return { ...prev, tags: [...prev.tags, tag] };
    });
  };

  const handleRemoveTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSaveDraft = () => {
    // No backend yet — this is where a draft save request will go later.
    console.log("Saved as draft (local only):", formData);
  };

  const handleContinue = () => {
    // No backend yet — this is where navigation to Step 2 will go later.
    console.log("Continue to Curriculum step:", formData);
  };

  return (
    <div className="upload-page">
      <Navbar />

      <header className="upload-hero">
        <h1 className="upload-hero__title">Create a New Course</h1>
        <p className="upload-hero__subtitle">
          Share your knowledge with thousands of learners on ByteNexus.
        </p>
      </header>

      <StepIndicator steps={STEPS} currentStep={1} />

      <div className="studio-container">
        <div className="studio-left">
          <CourseInfoForm
            formData={formData}
            onFieldChange={handleFieldChange}
            onThumbnailUpload={handleThumbnailUpload}
            onBannerUpload={handleBannerUpload}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
          />
        </div>

        <div className="studio-right">
          <LivePreview formData={formData} />
          <CompletionCard formData={formData} />
        </div>
      </div>

      <div className="studio-actions">
        <button
          type="button"
          className="studio-btn studio-btn--ghost"
          onClick={handleSaveDraft}
        >
          Save as Draft
        </button>
        <button
          type="button"
          className="studio-btn studio-btn--primary"
          onClick={handleContinue}
        >
          Continue →
        </button>
      </div>

      <Footer />
    </div>
  );
}
