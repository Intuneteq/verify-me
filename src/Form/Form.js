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
    <section className="form-container bg-success">
      <form>
        <h1 className="fw-bold">Driver License owner data</h1>
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
            type="date"
            placeholder="DD-MM-YYYY"
            maxLength="10"
            onChange={(e) => setDob(console.log(e.target.value.toString()))}
          />
        </label>

        <input
          // id="submit"
          type="submit"
          value="Search"
          onClick={handleSubmit}
          className="btn btn-outline-success w-100 mt-5"
        />
      </form>

      <section className={dataConfirmed ? "form-info" : "form-illustrator"}>
        {dataConfirmed ? (
          <>
            <div>
              <img src={illustratehead} alt="alt" />
            </div>
            <section>
              <span className="field">FIRST NAME:</span>
              <span>{items.firstname}</span>
            </section>
            <section>
              <span className="field">LAST NAME:</span>
              <span>{items.lastname}</span>
            </section>
            <section>
              <span className="field">MIDDLE NAME:</span>
              <span>{items.middlename}</span>
            </section>
            <section>
              <span className="field">DATE OF BIRTH:</span>
              <span>{items.birthdate}</span>
            </section>
            <section>
              <span className="field">GENDER:</span>
              <span>{items.gender}</span>
            </section>
            <section>
              <span className="field">LICENSE NUMBER:</span>
              <span>{items.licenseNo}</span>
            </section>
            <section>
              <span className="field">ISSUE DATE:</span>
              <span>{items.issuedDate}</span>
            </section>
            <section>
              <span className="field">EXPIRY DATE:</span>
              <span>{items.expiryDate}</span>
            </section>
            <section>
              <span className="field"> STATE OF ISSUE:</span>
              <span>{items.stateOfIssue}</span>
            </section>
          </>
        ) : (
          <div className="img-box">
            <img src={illustration} alt="agentX" />
            <h3 className="fw-bold">Fill Form to get user Info</h3>
          </div>
        )}
      </section>
    </section>
  );
};

export default Form;
