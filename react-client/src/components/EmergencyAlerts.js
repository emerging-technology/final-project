import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { Card } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
function EmergencyAlerts(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    console.log("start");
    axios
      .get("http://localhost:5000/emergencies", {
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
  const responseEmergency = (emergency)=>{
    axios
    .put("http://localhost:5000/emergencies",emergency, {
      withCredentials: true,
    })
    .then((result) => {
      console.log("result.data:", result.data);
      //check if the user has logged in
      window.location.reload();
    })
    .catch((error) => {
      setShowLoading(false);
      console.log("error in fetchData:", error);
    });
  }
  return (
    <div className="container">
      <div className="flex">
        <h5>Emergency Alerts</h5>
      </div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}

      {data.length !== 0 ? (
        data.map((emergencyAlert, idx) => (
          <Card className="my-2" key={idx}>
            <Card.Body>
              <Card.Title>
              Emergency Alert requested at {" "}
                {new Date(emergencyAlert.addedOn).toLocaleString()}
              </Card.Title>
              <Card.Text>
                {emergencyAlert.message}
              </Card.Text>
              <Card.Text>
                Request by: {emergencyAlert.patient.firstName} {emergencyAlert.patient.lastName}
              </Card.Text>
              <Button onClick={()=>responseEmergency(emergencyAlert)}>Respose</Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div className="d-flex justify-content-around">
          No Daily Tip records
        </div>
      )}
    </div>
  );
}

export default withRouter(EmergencyAlerts);
