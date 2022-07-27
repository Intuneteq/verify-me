import React from "react";
import { Toaster } from "react-hot-toast";

import "./App.css";
import Form from "./Form/Form";

function App() {
  return (
    <>
      <Toaster />
      <div className="App">
        <Form />
      </div>
    </>
  );
}

export default App;
