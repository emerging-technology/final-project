import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { Card } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function PatientDailyTips(props) {
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
        <h5>Daily Tips</h5>
      </div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}

      {data.length !== 0 &&
      data.screen !== "auth" &&
      data.dailyTips.length !== 0 ? (
        data.dailyTips.map((dailyTip, idx) => (
          <Card className="my-2" key={idx}>
            <Card.Body>
              <Card.Title>
                Daily Tip at {" "}
                {new Date(dailyTip.createdAt).toLocaleString()}
              </Card.Title>
              <Card.Text>
                {dailyTip.message}
              </Card.Text>
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

export default withRouter(PatientDailyTips);
