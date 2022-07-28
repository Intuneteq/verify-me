import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  BsFillPersonFill,
  BsPhone,
  BsFillCalendarDateFill,
} from "react-icons/bs";

import "./Form.scss";
import illustration from "../Assets/illustrator.webp";
import illustratehead from "../Assets/illustratehead.webp";

const Form = () => {
  const url = `https://vapi.verifyme.ng/v1/verifications/identities/drivers_license/10000000001`;
  const testSecretKey = process.env.REACT_APP_TEST_SECRET_KEY;

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [items, setItems] = useState([]);
  const [dataConfirmed, setDataConfirmed] = useState(false);

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
        console.log(res.data.data);
        setItems(res.data.data);
        setDataConfirmed(true);
        toast.success(`${firstname} ${lastname} verification successful`);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to Fetch Information");
      });
  };

  return (
    <div className="form-container">
      <form>
        <h1>Verify Your License</h1>
        <p>Enter your Credentials to Verify your License</p>

        <label>
          <span>
            <BsFillPersonFill />
          </span>
          <input
            id="fname"
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label>
          <span>
            <BsFillPersonFill />
          </span>
          <input
            id="lname"
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <label>
          <span>
            <BsPhone />
          </span>
          <input
            id="phone"
            type="tel"
            maxLength="11"
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>

        <label>
          <span>
            <BsFillCalendarDateFill />
          </span>
          <input
            type="text"
            placeholder="DD-MM-YYYY"
            maxLength="10"
            onChange={(e) => setDob(e.target.value)}
          />
        </label>

        <input
          type="submit"
          value="Search"
          onClick={handleSubmit}
          className="search"
        />
      </form>

      <div className={dataConfirmed ? "form-info" : "form-illustrator"}>
        {dataConfirmed ? (
          <>
            <div>
              <img src={illustratehead} alt="alt" />
            </div>
            <p>
              FIRST NAME: <span>{items.firstname}</span>
            </p>
            <p>
              LAST NAME: <span>{items.lastname}</span>
            </p>
            <p>
              MIDDLE NAME: <span>{items.middlename}</span>
            </p>
            <p>
              DATE OF BIRTH: <span>{items.birthdate}</span>
            </p>
            <p>
              GENDER: <span>{items.gender}</span>
            </p>
            <p>
              LICENSE NUMBER: <span>{items.licenseNo}</span>
            </p>
            <p>
              ISSUED DATE: <span>{items.issuedDate}</span>
            </p>
            <p>
              EXPIRY DATE: <span>{items.expiryDate}</span>
            </p>
            <p>
              STATE OF ISSUE: <span>{items.stateOfIssue}</span>
            </p>
          </>
        ) : (
          <div>
            <img src={illustration} alt="agentX" />
            <h1>Fill Form to get user Info</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
