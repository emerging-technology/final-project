import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
//
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./App.css";
import SignUp from "./components/SignUp";
import AddVitalSignForm from "./components/AddVitalSignForm";
import PatientVitalSignsPage from "./components/PatientVitalSignsPage";
import Checklist from "./components/Checklist";
import ChecklistResults from "./components/ChecklistResults";

import Login from "./components/Login";
import AddEmergency from "./components/AddEmergency";
import SendDailyTip from "./components/SendDailyTip";
import EmergencyAlerts from "./components/EmergencyAlerts"
import PatientDailyTips from "./components/PatientDailyTips";
//
function App() {
  return (
    <Router>
      <br />
      <br />
      <div className="container">
        <div className="col-lg-12 text-center">
          <a className="mt-5 h1 text-dark" href="/login">
            A Hospital System
          </a>
          <img src={process.env.PUBLIC_URL + "/logo.png"} alt="logo" />
        </div>
      </div>
      <br />
      <br />

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/create">
          <SignUp />
        </Route>
        <Route render={() => <AddVitalSignForm />} path="/add_vital_sign/:id" />
        <Route
          render={() => <PatientVitalSignsPage />}
          path="/patient_vital_signs/:id"
        />
        <Route
          render={() => <SendDailyTip />}
          path="/patient_daily_tip/:id"
        />
        <Route
          render={() => <AddEmergency />}
          path="/add_emergency"
        />
        
        <Route
          render={() => <EmergencyAlerts />}
          path="/emergenies_alerts"
        />
        <Route
          render={() => <PatientDailyTips />}
          path="/patient_daily_tips/:id"
        />
        <Route component={Checklist} path="/checklist" />
        <Route component={ChecklistResults} path="/checklistResults" />
      </Switch>
      <Route path="/" exact>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <Row>
                <Col>
                  <Button href="/create">Register</Button>
                </Col>
                <Col>
                  <Button href="/login">Log In</Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Route>
    </Router>
  );
}
export default App;
