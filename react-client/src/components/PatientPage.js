import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
//
import axios from "axios";
//
function PatientPage(props) {
  console.log(props.patient);
  // read the info from props, coming from the ancestor component
  return (
    <div className="container">
      <h3>Welcome Patient {props.patient.fullName}!</h3>
    </div>
  );
}

//
export default PatientPage;
