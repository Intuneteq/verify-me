import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [verification, setVerification] = useState("PlateNumber");

  const handleSelectChange = (e) => {
    setVerification(e.target.value);
  };

  return (
    <div className="home">
      <h1 className="fw-bold">Choose Verification Action</h1>
      <div class="form-group">
        <select multiple="" class="form-select" id="verification" onChange={handleSelectChange}>
          <option value="DriversLicense">Driver License owner data</option>
          <option value="FaceVerification">Vehicle plate number owners details</option>
          <option value="FaceVerification">Face matching and verification</option>
        </select>
      </div>

      <Link
        to={
          verification === "PlateNumber"
            ? "/license-verification"
            : verification === "FaceVerification"
              ? "/face-verification"
              : "/plate-number-verification"
        }
      >
        <button type="button" class="btn btn-outline-success">
          Continue
        </button>

      </Link>
    </div>
  );
};

export default Home;
