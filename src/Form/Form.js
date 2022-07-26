import React, { useState } from "react";
import axios from "axios";

import "./Form.css";

const Form = () => {
  const url = "https://vapi.verifyme.ng";
  const testSecret = process.env.REACT_APP_TEST_SECRET_KEY;
//   const liveSecret = process.env.REACT_APP_LIVE_SECRET_KEY;

  const [chasis, setChasis] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [itemNumber, setItemNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(chasis, plateNumber, itemNumber);

    axios
      .post(
        url,
        {
          chasis,
          plateNumber,
          itemNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${testSecret}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      }).catch((error) => {
          console.log(error);
      })
  };

  return (
    <div className="container">
      <form action="action_page.php">
        <div className="row">
          <div className="col-25">
            <label htmlFor="fname">Chasis Number</label>
          </div>
          <div className="col-75">
            <input
              type="number"
              name="chasis"
              onChange={(e) => setChasis(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="lname">Plate Number</label>
          </div>
          <div className="col-75">
            <input
              type="number"
              name="plate"
              onChange={(e) => setPlateNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="lname">Item Number</label>
          </div>
          <div className="col-75">
            <input
              type="number"
              name="item"
              onChange={(e) => setItemNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <input type="submit" value="search" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default Form;
