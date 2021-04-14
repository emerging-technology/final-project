import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { Card } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function PatientPage(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
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

  return (
    <div className="container">
      <div className="flex">
        <h5>Patient Full Name: {data.fullName}</h5>
        <h5>Vital Signs</h5>
        <Button href="/add_emergency">
          Add Emergency Message
        </Button>        
        <br/>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/zJpfX8R6Lfo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>      
    </div>
  );
}

export default withRouter(PatientPage);
