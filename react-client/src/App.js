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
//
import ListStudents from "./components/ListStudents";
import EditUser from "./components/EditUser";
import EditArticle from "./components/EditArticle";
import ListCourses from "./components/ListCourses";
import StudentSignUp from "./components/StudentSignUp";
import ShowUser from "./components/ShowUser";
import AddCourse from "./components/AddCourse";
import EditCourse from "./components/EditCourse";
import ShowStudentCourses from "./components/ShowStudentCourses";
import ShowArticle from "./components/ShowArticle";

import Login from "./components/Login";
//
function App() {
  return (
    <Router>
      {/* <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/list">List of Users</Nav.Link>
            <Nav.Link href="/create">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar> */}
      <br/>
      <br/>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <a className="mt-5 h1 text-dark" href="/">A Student/Course System</a>
            <p className="lead">Using the MERN stack</p>
          </div>
        </div>
      </div>
      <br/>
      <br/>

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/create">
          <StudentSignUp />
        </Route>
        <Route render={() => <ListStudents />} path="/listStudents" />
        <Route render={() => <AddCourse />} path="/addCourse" />
        <Route render={() => <EditUser />} path="/edit/:id" />
        <Route render={() => <ShowUser />} path="/show/:id" />
        <Route render={() => <ShowStudentCourses />} path="/showStudentCourses/:id" />
        <Route render={() => <ListCourses />} path="/listCourses" />
        <Route render={() => <EditArticle />} path="/editarticle/:id" />
        <Route render={() => <EditCourse />} path="/editCourse/:id" />
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
//<Route render ={()=> < App />} path="/" />
export default App;
