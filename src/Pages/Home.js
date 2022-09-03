import React from 'react'

const Home = () => {
  return (
    <div>
        <h1>Choose Verification Action</h1>
        <select id="verification">
            <option value="PlateNumber">Plate Number</option>
            <option value="FaceVerification">Face Verification</option>
        </select>
    </div>
  )
}

export default Home;