import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import LoggedIn from './LoggedIn'
//
function App() {
  //state variable for the screen, admin or user
  const [screen, setScreen] = useState('auth');
  //store input field data, user name and password
  const [email, setUsername] = useState();
  const [password, setPassword] = useState();
  const apiUrl = "http://localhost:5000/signin";
  // const apiUrl = "http://localhost:3000/signin";
  //send email and password to the server
  // for initial authentication
  const auth = async () => {
    console.log('calling auth')
    console.log(email)
    try {
      //make a get request to /authenticate end-point on the server
      const loginData = { auth: { email, password } }
      //call api
      const res = await axios.post(apiUrl, loginData, {withCredentials: true});
      console.log(res.data.auth)
      console.log(res.data.screen)
      //process the response
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) { //print the error
      console.log(e);
    }
  
  };
  
  //check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log('--- in readCookie function ---');
      //
      const res = await axios.get('http://localhost:5000/read_cookie', {withCredentials: true});
      // const res = await axios.get('http://localhost:3000/read_cookie');
      // 
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen)
      }
    } catch (e) {
      setScreen('auth');
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []); //only the first render
  //
  return (
    <div>
      {screen === 'auth' 
        ?
        <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h5 className="mt-5">Student Log In</h5>
            <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" id="email" placeholder="Enter email" onChange={e => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" id="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={auth}>Log In</Button>
            {/* <div>
              <label>Username: </label>
              <br/>
              <input type="text" onChange={e => setUsername(e.target.value)} />
              <br/>
              <label>Password: </label>
              <br/>
              <input type="password" onChange={e => setPassword(e.target.value)} />
              <br/>
              <Button onClick={auth}>Login</Button>
            </div> */}
          </div>
        </div>
      </div> 
       
        : <LoggedIn screen={screen} setScreen={setScreen} />
      }
    </div>
  );
}

export default App;

