import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import PatientPage from "./PatientPage";
import NursePage from "./NursePage";
//
function Login(props) {
  //state variable for the screen, admin or user
  const [screen, setScreen] = useState("auth");
  //store input field data, user name and password
  const [email, setUsername] = useState();
  const [password, setPassword] = useState();
  const apiUrl = "http://localhost:5000/signin";
  //send email and password to the server
  // for initial authentication
  const auth =  () => {
    console.log("calling auth");
    console.log(email);
    try {
      //make a get request to /authenticate end-point on the server
      const loginData = { auth: { email, password }};
      //call api
      axios.post(apiUrl, loginData,  {
        withCredentials: true,
      }).then(result=>{
        console.log(result.data.screen);
        //process the response
        setScreen(result.data.screen);
      }).catch(error=>{

        console.log(error);
      });
    
    } catch (e) {
      //print the error
      console.log(e);
    }
  };

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
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []); //only the first render

  return (
    <div>
      { 
        !screen||screen === "auth" ? 
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h5 className="mt-5">User Log In</h5>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    id="email"
                    placeholder="Enter email"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    id="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={auth}>
                  Log In
                </Button>
              </div>
            </div>
          </div>
        :screen.userType === "Nurse" ? 
          <NursePage  nurse={screen} />
         : screen.userType === "Patient" &&
          <PatientPage patient={screen} />
      }
    </div>
  );
}

export default Login;
