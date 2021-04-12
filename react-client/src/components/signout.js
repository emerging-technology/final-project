import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

//
//import View from './View'
//
function App() {
    //state variable for the screen, patient or nurse
    const [screen, setScreen] = useState("auth");
    const apiUrl = "http://localhost:5000/read_cookie";
  
    const signout = ()=> {
      const apiUrl2 = "http://localhost:5000/signout";
    
      const fetchData = async () => {
        const result = await axios(apiUrl2);
        let check = result.status === 200;
        console.log(check);
        return result.status === 200;
      };
    
      fetchData();
    }
  
    //check if the user already logged-in
    const readCookie = async () => {
      try {
        console.log("--- in readCookie function ---");
  
        //
        const res = await axios(apiUrl);
        //
        if (res.data.screen !== undefined) {
          setScreen(res.data.screen);
          console.log(res.data.screen);
        }
      } catch (e) {
        setScreen("auth");
        console.log(e);
      }
  
      if(screen !== "auth"){
          signout();
      }
    };
    //runs the first time the view is rendered
    //to check if user is signed in
    useEffect(() => {
      readCookie();
    }, []); //only the first render
    //
    return (
      <div className="App">
        {screen === "auth" ? (
          <Home />
        ) : (
          <div />
        )}
      </div>
    );
  }
  
  export default App;