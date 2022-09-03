import React from "react";
import Webcam from "react-webcam";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BsFillPersonFill } from "react-icons/bs";
import { TbFaceId } from "react-icons/tb";
import {HiIdentification} from "react-icons/hi";

import "./Form.scss";
import illustration from "../Assets/illustrator.webp";

const Form = () => {
  const webRef = useRef(null);
  const url = "https://vapi.verifyme.ng/v1/verifications/identities/biometrics";
  const facialRecognitionTestKey =
    process.env.REACT_APP_FACIAL_RECOGNITION_TEST_KEY;

    // const encodedParams = new URLSearchParams();
    // encodedParams.append("objecturl", "http://er128.eyerecognize.com/img/jfd_group.jpg");

  const [idType, setIdType] = useState("nin");
  const [idNumber, setIdNumber] = useState("10000000001");
  const [imageVerification, setImageVerification] = useState(false);

  const verifyImage = async (e) => {
    e.preventDefault();

    const photoUrl = await webRef.current.getScreenshot();

    console.log(photoUrl, "photo: ", typeof photoUrl);
    console.log("id type: ", typeof idType, idType);
    console.log("id number: ", typeof idNumber, idNumber);
    console.log("test key", facialRecognitionTestKey);

    axios
      .post(
        url,
        {
          idNumber,
          idType,
          photoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${facialRecognitionTestKey}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success(`verification successful`);
      })
      .catch((error) => {
        console.log(error);
        toast.error(`${error.response.data.message}`);
      });
  };

  return (
    <div className="form-contain">
      <form>
        <h1>Face Verification form</h1>
        <p>How Would You Like To be Verified ?</p>
        <div className="radio">
          <span><HiIdentification /></span>
          <label>
            <span>BVN</span>
            <input
              type="radio"
              name="id"
              value="bvn"
              onChange={(e) => setIdType(e.target.value)}
            />
          </label>
          <label>
            <span>NIN</span>
            <input
              type="radio"
              name="id"
              value="nin"
              onChange={(e) => setIdType(e.target.value)}
            />
          </label>
          <label>
            <span>FRSC</span>
            <input
              type="radio"
              name="id"
              value="frsc"
              onChange={(e) => setIdType(e.target.value)}
            />
          </label>
        </div>
        
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
        <div className="">
          
          
        </div>
      </form>
      <div className={imageVerification ? "form-info" : "form-illustrator"}>
        {imageVerification ? <>
          
          <Webcam
            ref={webRef}
            screenshotFormat="image/jpeg"
            width={200}
            height={200}
          />
          <input
          type="submit"
          value="Search"
          className="search"
          onClick={verifyImage}
        />
        
        </> : 
          (
            <div>
              <img src={illustration} alt="agentX" />
              <TbFaceId onClick={() => setImageVerification(true)} />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Form;
