import { useState } from "react";
import React from "react";
import "./App.css";

import ScannerComponent from "./pages/ScannerComponent";
import GrpcData from "./pages/test";
import Input from "./pages/input";

const App = () => {
  // return <ScannerComponent />;
  // return <GrpcData/>
  return <Input/>
};

export default App;
