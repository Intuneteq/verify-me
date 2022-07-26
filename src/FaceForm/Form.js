import React from "react";
import Webcam from "react-webcam";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BsFillPersonFill } from "react-icons/bs";
import { TbFaceId } from "react-icons/tb";
import { HiIdentification } from "react-icons/hi";

import "./Form.scss";
import illustration from "../Assets/illustrator.webp";

const Form = () => {
  const webRef = useRef(null);
  const url = "https://vapi.verifyme.ng/v1/verifications/identities/biometrics";
  // const url = 'https://ivladmin-face-detection.p.rapidapi.com/faceSearch/detectFaces'
  const facialRecognitionTestKey =
    process.env.REACT_APP_FACIAL_RECOGNITION_TEST_KEY;

  const encodedParams = new URLSearchParams();
  encodedParams.append(
    "objecturl",
    "http://er128.eyerecognize.com/img/jfd_group.jpg"
  );

  const [idType, setIdType] = useState("nin");
  const [idNumber, setIdNumber] = useState("10000000001");
  const [imageVerification, setImageVerification] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoData, setPhotoData] = useState(null);

  const verifyImage = async (e) => {
    e.preventDefault();

    const photoUrl = async () => {
      if (photoData === "photoUrl") {
        return await webRef.current.getScreenshot();
      }
    };

    axios
      .post(
        url,
        // {data: encodedParams},
        {
          idNumber,
          idType,
          photoUrl,
          photo,
        },
        {
          headers: {
            Authorization: `Bearer ${facialRecognitionTestKey}`,
            "content-type": "application/x-www-form-urlencoded",
            // 'X-RapidAPI-Key': '77e41e52c9mshba4868f77b733eap196358jsn5e427740ca50',
            // 'X-RapidAPI-Host': 'ivladmin-face-detection.p.rapidapi.com'
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
        <p>How Would You Like To be Verified?</p>
        <div className="radio">
          <span>
            <HiIdentification />
          </span>
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
        <div className="radio">
          <span>
            <HiIdentification />
          </span>
          <label>
            <span>Upload Image</span>
            <input
              type="radio"
              name="image"
              value="photo"
              onChange={(e) => setPhotoData(e.target.value)}
            />
          </label>
          <label>
            <span>Take Pic</span>
            <input
              type="radio"
              name="image"
              value="photoUrl"
              onChange={(e) => setPhotoData(e.target.value)}
            />
          </label>
        </div>
        {photo && (
          <div>
            <img
              alt="not fount"
              height={"150px"}
              width={"150px"}
              src={URL.createObjectURL(photo)}
            />
            <br />
            <button onClick={() => setPhoto(null)}>Remove</button>
          </div>
        )}
        {photoData === "photo" && (
          <input
            type="file"
            name="myImage"
            accept="image/jpg"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setPhoto(event.target.files[0]);
            }}
          />
        )}
        <input
          id="submits"
          type="submit"
          value="Search"
          className="search"
          onClick={verifyImage}
        />
      </form>
      <div className={imageVerification ? "form-info" : "form-illustrator"}>
        {imageVerification ? (
          <>
            <Webcam
              ref={webRef}
              screenshotFormat="image/jpeg"
              width={200}
              height={200}
            />
          </>
        ) : (
          <div>
            <img src={illustration} alt="agentX" />
            {photoData === "photoUrl" && (
              <TbFaceId onClick={() => setImageVerification(true)} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
