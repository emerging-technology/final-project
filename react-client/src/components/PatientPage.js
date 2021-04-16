import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';

import Button from "react-bootstrap/Button";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { Card } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";

function PatientPage(props) {
  if(!props.patient){
    props.history.push('/');
  }
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
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

  useEffect(() => {
    console.log("start");
    axios
      .get("http://localhost:5000/users/", {
        withCredentials: true,
      })
      .then((result) => {
        console.log("result.data:", result.data);
        //check if the user has logged in
        setData(result.data);
        setShowLoading(false);
      })
      .catch((error) => {
        setShowLoading(false);
        console.log("error in fetchData:", error);
      });
  }, []);

  // read the info from props, coming from the ancestor component
  return (
    <div className="container">
      <div>
        <h5>Patient Full Name: {props.patient.fullName}</h5>
        <div  className="d-flex justify-content-around">

          <Button href="/add_emergency">
            Send Emergency Message
          </Button>        
          <Button variant="primary" href="/checklist">
            Check Symptoms
          </Button>
          <Button  variant="primary" className="mr-1"  href="/patient_vital_signs/">
            Check Vital Signs
          </Button>
          <Button variant="primary" href={"/patient_daily_tips/"+props.patient.id}>
            My Daily Tips 
          </Button>
          <Button variant="primary" onClick={deleteCookie}>
            Log Out
          </Button>
        </div>
        <br/>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/zJpfX8R6Lfo" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>      
    </div>
  );
}

export default withRouter(PatientPage);
