import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import "./Form.scss";

const Form = () => {
  const url = `https://vapi.verifyme.ng/v1/verifications/identities/drivers_license/10000000001`;
  const testSecretKey = process.env.REACT_APP_TEST_SECRET_KEY;

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        url,
        {
          firstname,
          lastname,
          phone,
          dob,
        },
        {
          headers: {
            Authorization: `Bearer ${testSecretKey}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success(`${firstname} ${lastname} verification successful`)
      })
      .catch((error) => {
        console.log(error);
        toast.fail('Failed to fetch information')
      });
  };

  return (
    <div className="container">
      <h1>VERIFY ME</h1>
      <form>
        <label>
          <input
            id="fname"
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <span>First</span>
        </label>

        <label>
          <input
            id="lname"
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <span>Last Name</span>
        </label>

        <label>
          <input
            id="phone"
            type="number"
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <span>Phone Number</span>
        </label>

        <label>
          <input
            type="text"
            placeholder="DD-MM-YYYY"
            onChange={(e) => setDob(e.target.value)}
          />
          <span>Date of Birth</span>
        </label>

        <input
          type="submit"
          value="Search"
          onClick={handleSubmit}
          className="search"
        />
      </form>
    </div>
  );
};

export default Form;
