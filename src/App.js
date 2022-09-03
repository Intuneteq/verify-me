import React from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

import "./App.scss";
import Form from "./Form/Form";
import FormFace from "./FaceForm/Form";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <Toaster />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/face-verification' element={<FormFace />} />
          <Route path='/license-verification' element={<Form />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
