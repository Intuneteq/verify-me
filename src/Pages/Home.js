import React, { useState } from 'react';
// import { Link, useNavigate  } from "react-router-dom";

const Home = () => {
    // let navigate = useNavigate();

    const [verification, setVerification] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        // navigate('/face-verification');
        
    }


    
  return (
    <div className='form-container home'>
        <h1>Choose Verification Action</h1>
        <select id="verification">
            <option value="PlateNumber" onChange={(e) => setVerification(e.target.value)}>Plate Number</option>
            <option value="FaceVerification" onChange={(e) => setVerification(e.target.value)}>Face Verification</option>
        </select>
        
        <input type="submit" value="Continue" onClick={handleSubmit}/>
    </div>
  )
  }

export default Home;