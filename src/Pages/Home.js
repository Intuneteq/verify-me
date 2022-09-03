import React from 'react';
import { Link  } from "react-router-dom";

const Home = () => {

    // const [verification, setVerification] = useState('');
    // const [value, setValue] = useState('');

    // const handleChange = (e) => {
    //   setValue(e.target.value);
    // };
    
  return (
    <div className='form-container home'>
        <h1>Choose Verification Action</h1>
        {/* <select id="verification" value={value} onChange={handleChange} >
            <option value="PlateNumber" >Plate Number</option>
            <option value="FaceVerification" >Face Verification</option>
        </select>
        <Link onClick={console.log(value, 'value')} to ={value === "PlateNumber" ? '/license-verification': '/face-verification'} >Continue</Link> */}
        <Link to = '/face-verification'>Face Verification</Link>
        <Link to= '/license-verification'>License Verification</Link>
    </div>
  )
  }

export default Home;