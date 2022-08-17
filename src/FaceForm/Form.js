import React from "react";
import Webcam from "react-webcam";
import { useRef, useState } from "react";
import axios from "axios";
import { BsFillPersonFill } from "react-icons/bs";

const Form = () => {
  const webRef = useRef(null);
  const url = "https://vapi.verifyme.ng/v1/verifications/identities/biometrics";
  const facialRecognitionTestKey =
    process.env.REACT_APP_FACIAL_RECOGNITION_TEST_KEY;

  const [idType, setIdType] = useState(0);
  const [idNumber, setIdNumber] = useState("");

  const onChange = (e) => {
    setIdType(e.target.value);
  };

  const verifyImage = (e) => {
    e.preventDefault();
    console.log("change", idType);

    const photoUrl = webRef.current.getScreenshot();
    
    console.log(photoUrl, 'photo', typeof(photoUrl));
    console.log("id type", typeof(idType), idType);
    console.log('id number', typeof(idNumber), idNumber);

    axios.post(
      url,
      {
        idNumber,
        idType,
        photoUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${facialRecognitionTestKey}`,
        },
      }
    )
    .then((res) => {
        console.log(res);
        // setItems(res.data.data);
        // setDataConfirmed(true);
        // toast.success(`${firstname} ${lastname} verification successful`);
      })
      .catch((error) => {
        console.log(error);
        // toast.error("Failed to Fetch Information");
      });
  };

  return (
    <div>
      <h1>form</h1>
      <form>
        <label>
          <span>BVN</span>
          <input type="radio" name="id" value="bvn" onChange={onChange} />
        </label>
        <label>
          <span>NIN</span>
          <input type="radio" name="id" value='nin' onChange={onChange} />
        </label>
        <label>
          <span>FRSC</span>
          <input type="radio" name="id" value='frsc' onChange={onChange} />
        </label>
        <label>
          <span>
            <BsFillPersonFill />
          </span>
          <input
            id="id"
            type="text"
            placeholder="Id Number"
            onChange={(e) => setIdNumber(e.target.value)}
          />
        </label>
      </form>
      <Webcam ref={webRef} screenshotFormat="image/jpeg" />
      <button onClick={verifyImage}>Verify Image</button>
    </div>
  );
};

export default Form;