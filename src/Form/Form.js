import React, { useState } from "react";
import axios from "axios";

import "./Form.css";

const Form = () => {
  const url = 'https://vapi.verifyme.ng/v1/verifications/identities/drivers_license/10000000001';
  const testSecret = process.env.REACT_APP_TEST_SECRET_KEY;
    // const liveSecret = process.env.REACT_APP_LIVE_SECRET_KEY;

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(firstname, lastname, phone, dob);
    console.log('url', url);

    axios
      .post(
        url,
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${testSecret}`,
          },
        },
        {
          firstname,
          lastname,
          phone,
          dob,
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <form action="action_page.php">
        <div className="row">
          <div className="col-25">
            <label htmlFor="fname">First Name</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="fname"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="lname">Last Name</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="lname"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="phnum">Phone Number</label>
          </div>
          <div className="col-75">
            <input
              type="number"
              name="item"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="DOB">Date of Birth</label>
          </div>
          <div className="col-75">
            <input
              type="date"
              name="DOB"
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
        </div>
        {/* <div className="row">
          <div className="col-25">
            <label htmlFor="license">Driver's License</label>
          </div>
          <div className="col-75">
            <input
              type="number"
              name="license"
              onChange={(e) => setLicense(e.target.value)}
            />
          </div>
        </div> */}
        <div className="row">
          <input type="submit" value="search" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default Form;
