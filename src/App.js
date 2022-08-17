import React from "react";
import { Toaster } from "react-hot-toast";

import "./App.scss";
import Form from "./Form/Form";
import FormFace from "./FaceForm/Form";

function App() {
  const face = true;
  return (
    <>
      <Toaster />
      <div className="App">{face ? <FormFace /> : <Form />}</div>
    </>
  );
}

export default App;
