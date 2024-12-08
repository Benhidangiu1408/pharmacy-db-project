import { useState } from "react";
import React from "react";
import "./App.css";

import ScannerComponent from "./pages/ScannerComponent";
import GrpcData from "./pages/test";

const App = () => {
  // return <ScannerComponent />;
  return <GrpcData/>
};

export default App;
