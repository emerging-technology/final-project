import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function SignUp(props) {
  const [user, setUser] = useState({ _id: '', firstName: '', lastName: '', 
                email: '',password: '', userType: 'Nurse'});
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:5000/";
  // const apiUrl = "http://localhost:3000/";

  const saveUser = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { firstName: user.firstName, lastName: user.lastName, 
      email: user.email, password: user.password, userType: user.userType};
    axios.post(apiUrl, data, {withCredentials: true})
      .then((result) => {
        setShowLoading(false);
        props.history.push('/')
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setUser({...user, [e.target.name]: e.target.value});
  }
  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
        <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h5 className="mt-5">Sign Up</h5>
            <Form onSubmit={saveUser}>
          <Form.Group>
            <Form.Label> First Name</Form.Label>
            <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter first name" value={user.firstName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter last name" value={user.lastName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter email" value={user.email} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" name="password" id="password" placeholder="Enter password" value={user.password} onChange={onChange} />
          </Form.Group>
         
        <Form.Group controlId="userType">
        <Form.Label>Select Type</Form.Label>
        <Form.Control as="select" name="userType" value={user.userType} onChange={onChange} >
          <option>Nurse</option>
          <option>Patient</option>
        </Form.Control>
      </Form.Group>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
          </div>
        </div>
      </div> 
    </div> 
  );
}

export default withRouter(SignUp);
