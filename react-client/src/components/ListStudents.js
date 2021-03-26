import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Login from './Login';
import Button from 'react-bootstrap/Button';
//import { read } from '../../../app/controllers/students.server.controller';

function ListStudents(props) {
  const [data, setData] = useState([]);
  // const [email, setEmail] = useState()
  const [showLoading, setShowLoading] = useState(true);
  const [listError, setListError] = useState(false);
  const apiUrl = "http://localhost:5000/students";

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl, {withCredentials: true})
        .then(result => {
          console.log('result.data:', result.data)
          //check if the user has logged in
          if(result.data.screen !== 'auth')
          {
            console.log('~~~~~~~~~~~~~~data in if:', result.data)
            setData(result.data);
            setShowLoading(false);
          }
        }).catch((error) => {
          console.log('error in fetchData:', error)
          setListError(true)
        });
      };  
    fetchData();
  }, []);


  return (
    <div className="container">
    { data.length !== 0
      ? <div>
        {showLoading && <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> }
        <ListGroup>
          {data.map((student, idx) => (
            <ListGroup.Item key={idx}>
              <div className="d-flex justify-content-around">
                {student.fullName}
                <Button href={"/showStudentCourses/" + student._id}>Show Courses</Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      : < Login />
    }
  </div>

  );
}
//
export default withRouter(ListStudents);
