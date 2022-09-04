import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [verification, setVerification] = useState("PlateNumber");

  const handleSelectChange = (e) => {
    setVerification(e.target.value);
  };

  return (
    <div className="form-container home">
      <h1>Choose Verification Action</h1>
      <select id="verification" onChange={handleSelectChange}>
        <option value="PlateNumber">Plate Number</option>
        <option value="FaceVerification">Face Verification</option>
      </select>

      <Link
        className="nav"
        to={
          verification === "PlateNumber"
            ? "/license-verification"
            : verification === "FaceVerification"
            ? "/face-verification"
            : "/"
        }
      >
        Continue
      </Link>
    </div>
  );
};

export default Home;
