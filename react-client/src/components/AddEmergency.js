import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function AddEmergency(props) {
  const [screen, setScreen] = useState("auth");
  const [emergency, setEmergency] = useState({
    message: "",
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:5000/post_emergency";
  //check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log("--- in readCookie function ---");
      //
      const res = await axios.get("http://localhost:5000/read_cookie", {
        withCredentials: true,
      });
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) {
      setScreen("auth");
      props.history.push("/login");
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []);
  const saveMessage = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      message: emergency.message,
    };
    axios
      .post(apiUrl, data, { withCredentials: true })
      .then((result) => {
        setShowLoading(false);
        props.history.push("/login/");
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setEmergency({ ...emergency, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h5 className="mt-5">
              Create a Message
            </h5>
            <Form onSubmit={saveMessage}>
              <Form.Group>
                <Form.Label>Message</Form.Label>
                <Form.Control
                  type="string"
                  name="message"
                  id="message"
                  placeholder="Enter the message"
                  value={emergency.message}
                  onChange={onChange}
                />
              </Form.Group>             

              <Button variant="primary" type="submit">
                Create
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(AddEmergency);
