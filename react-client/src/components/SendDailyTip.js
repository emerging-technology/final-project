import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { Card } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { withRouter } from "react-router-dom";

function SendDailyTip(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [tip,setTip] = useState({
    message: "",
  });
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
  const onChange = (e) => {
    e.persist();
    setTip({ ...tip, [e.target.name]: e.target.value });
  };
  const saveMessage = (e) => {
    setShowLoading(true);
    e.preventDefault();
    axios
      .post("http://localhost:5000/daily_tips/" + props.match.params.id,  tip, { withCredentials: true })
      .then((result) => {
        setShowLoading(false);
        props.history.push("/login/");
      })
      .catch((error) => setShowLoading(false));
  };
  return (
    <div className="container">
      <div className="flex">
        <h5>Patient Full Name: {data.fullName}</h5>
        <h5>Send Daily Motivation Tip</h5>
      </div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}

      {data.length !== 0 &&
      data.screen !== "auth"? (
        <Form onSubmit={saveMessage}>
        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control
            type="text"
            name="message"
            id="message"
            placeholder="Enter tip"
            value={tip.message}
            onChange={onChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
                Send
              </Button>
        </Form>
      ) : (
        <div className="d-flex justify-content-around">
          Patient No Found
        </div>
      )}
    </div>
  );
}

export default withRouter(SendDailyTip);
