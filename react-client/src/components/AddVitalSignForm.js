import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function AddVitalSignForm(props) {
  const [screen, setScreen] = useState("auth");
  const [course, setCourse] = useState({
    bodyTemperature: "",
    heartRate: "",
    bloodPressure: "",
    respiratoryRate: "",
  });
  const [showLoading, setShowLoading] = useState(false);
  if (props.match.params.id === undefined) {
    props.match.params.id = "";
  }
  console.log("id: " + props.match.params.id);
  const apiUrl = "http://localhost:5000/vital_signs/" + props.match.params.id;
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
  const saveVitalSign = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      bodyTemperature: parseFloat(course.bodyTemperature),
      heartRate: parseInt(course.heartRate),
      bloodPressure: course.bloodPressure,
      respiratoryRate: parseInt(course.respiratoryRate),
    };
    axios
      .post(apiUrl, data, { withCredentials: true })
      .then((result) => {
        setShowLoading(false);
        props.history.push("/patient_vital_signs/" + props.match.params.id);
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setCourse({ ...course, [e.target.name]: e.target.value });
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
              Create a Vital Sign
            </h5>
            <Form onSubmit={saveVitalSign}>
              <Form.Group>
                <Form.Label>Body Temperature (degree Celsius)</Form.Label>
                <Form.Control
                  type="number"
                  name="bodyTemperature"
                  id="courseCode"
                  placeholder="Enter a number"
                  value={course.courseCode}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Heart Rate (beats per minute)</Form.Label>
                <Form.Control
                  type="number"
                  name="heartRate"
                  id="courseName"
                  placeholder="Enter a number"
                  value={course.courseName}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Blood Pressure (mmHg)</Form.Label>
                <Form.Control
                  type="text"
                  name="bloodPressure"
                  id="section"
                  placeholder="Enter a number/number"
                  value={course.section}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Respiratory Rate (breaths per minute)</Form.Label>
                <Form.Control
                  type="text"
                  name="respiratoryRate"
                  id="semester"
                  placeholder="Enter a number"
                  value={course.semester}
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

export default withRouter(AddVitalSignForm);
