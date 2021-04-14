import React, { useState } from "react";
import { withRouter } from 'react-router-dom';

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
//
import axios from "axios";
//
function PatientPage(props) {
  const [screen, setScreen] = useState("auth");

  const deleteCookie = async () => {
    try {
      await axios.get('http://localhost:5000/signout', {withCredentials: true});
      setScreen('auth');
      props.history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  console.log(props.patient);
  // read the info from props, coming from the ancestor component
  return (
    <div className="container">
      <h3>Welcome Patient {props.patient.fullName}!</h3>
      <Button variant="primary" onClick={deleteCookie}>
        Log Out
      </Button>
    </div>
  );
}

//
export default withRouter(PatientPage);
