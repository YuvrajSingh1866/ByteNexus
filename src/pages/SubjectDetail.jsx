
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const SubjectDetail = () => {
  const location = useLocation();

  const driveLink = location.state?.drive;

  console.log("Drive link:", driveLink); // debug

  return (
    <>
      <Navbar />

      <div style={{ padding: "60px", textAlign: "center" }}>
        <h1>Subject Notes</h1>

        {driveLink ? (
          <a href={driveLink} target="_blank" rel="noopener noreferrer">
            Open Notes Folder
          </a>
        ) : (
          <p>No notes available</p>
        )}
      </div>
    </>
  );
};

export default SubjectDetail;
