import React from 'react';
import { Link  } from "react-router-dom";

const Home = () => {
  return (
    <div className='form-container home'>
        <h1>Choose Verification Action</h1>

        <Link className='nav' to = '/face-verification'>Face Verification</Link>
        <Link className='nav' to= '/license-verification'>License Verification</Link>
    </div>
  )
  }

export default Home;