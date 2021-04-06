import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { Card } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function PatientVitalSignsPage(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    console.log("start");
    axios
      .get("http://localhost:5000/users/" + props.match.params.id, {
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
        <Button href={"/add_vital_sign/" + props.match.params.id}>
          Add vital sign
        </Button>
      </div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}

      {data.length !== 0 &&
      data.screen !== "auth" &&
      data.vitalSigns.length !== 0 ? (
        data.vitalSigns.map((vitalSign, idx) => (
          <Card className="my-2" key={idx}>
            <Card.Body>
              <Card.Title>
                Vital Sign Tested At{" "}
                {new Date(vitalSign.testedAt).toLocaleString()}
              </Card.Title>
              <Card.Text>
                Body Temperature: {vitalSign.bodyTemperature} Degress Celsius
              </Card.Text>
              <Card.Text>
                Heart Rate: {vitalSign.heartRate} Beats per minute
              </Card.Text>
              <Card.Text>
                Blood Pressure: {vitalSign.bloodPressure} mmHg
              </Card.Text>
              <Card.Text>
                Respiratory Rate: {vitalSign.respiratoryRate} Breaths per minute
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div className="d-flex justify-content-around">
          No Vital Sign records
        </div>
      )}
    </div>
  );
}

export default withRouter(PatientVitalSignsPage);
