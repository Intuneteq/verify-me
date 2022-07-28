import React from 'react';
import { BsFillPersonFill, BsPhone, BsFillCalendarDateFill } from 'react-icons/bs'

import './Form.scss';

const Form = () => {
  return (
    <div className='form-container'>
        <form>
            <h1>Verify Your License</h1>
            <p>Enter your Credentials to Verify your License</p>

            <label>
                <span><BsFillPersonFill /></span>
                <input 
                id="fname"
                type="text"
                placeholder="First Name"
                // onChange={(e) => setFirstName(e.target.value)} 
                />
            </label>

            <label>
                <span><BsFillPersonFill /></span>
                <input 
                id="lname"
                type="text"
                placeholder="Last Name"
                // onChange={(e) => setLastName(e.target.value)} 
                />
            </label>

            <label>
                <span><BsPhone /></span>
                <input 
                id="phone"
                type="number"
                placeholder="Phone Number"
                // onChange={(e) => setPhoneNumber(e.target.value)} 
                />
            </label>

            <label>
                <span><BsFillCalendarDateFill /></span>
                <input 
                type="text"
                placeholder="DD-MM-YYYY"
                // onChange={(e) => setDob(e.target.value)} 
                />
            </label>

            <input
                type="submit"
                value="Search"
                // onClick={handleSubmit}
                className="search"
        />
        </form>
    </div>
  )
}

export default Form