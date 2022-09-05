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
    <div className="form-container-biometrics bg-success">
      <form>
        <div className="text-center">
          <h2 className="fw-bold">Face matching and verification</h2>
          <p>How Would You Like To be Verified?</p>
        </div>
        <fieldset class="form-group d-flex gap-5">
          <div class="form-check">
            <input id="bvn" name="id"
              value="bvn"
              onChange={(e) => setIdType(e.target.value)} class="form-check-input" type="radio" />
            <label class="form-check-label" for="bvn">
              BVN
            </label>
          </div>
          <div class="form-check">
            <input id="nin" class="form-check-input" type="radio" name="id"
              value="nin"
              onChange={(e) => setIdType(e.target.value)} />
            <label class="form-check-label" for="nin">
              NIN
            </label>
          </div>
          <div class="form-check disabled">
            <input id="frsc" class="form-check-input" type="radio" name="id"
              value="frsc"
              onChange={(e) => setIdType(e.target.value)} />
            <label class="form-check-label" for="frsc">
              FRSC
            </label>
          </div>
        </fieldset>

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

        <fieldset class="form-group d-flex gap-3">
          <div class="form-check">
            <input id="uli"
              class="form-check-input"
              name="image"
              value="photo"
              onChange={(e) => setPhotoData(e.target.value)} type="radio" />
            <label class="form-check-label" for="uli">
              Upload Image
            </label>
          </div>
          <div class="form-check">
            <input id="tp" class="form-check-input" type="radio" name="image"
              value="photoUrl"
              onChange={(e) => setPhotoData(e.target.value)} />
            <label class="form-check-label" for="tp">
              Take Picture
            </label>
          </div>
        </fieldset>
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
        <input
          type="submit"
          value="Search"
          class="btn btn-outline-success d-block w-100"
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
          <div className="img-box">
            <img src={illustration} alt="agentX" />
            {photoData === "photoUrl" ? (
              <TbFaceId onClick={() => setImageVerification(true)} />
            ) :
              <button onClick={() => { document.getElementById('fileInput').click() }} className="btn img-btn bg-transparent text-light">
                Select Image
                <input
                  id="fileInput"
                  className="text-dark d-none"
                  type="file"
                  name="myImage"
                  accept="image/jpg"
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    setPhoto(event.target.files[0]);
                  }}
                />
              </button>

            }
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
