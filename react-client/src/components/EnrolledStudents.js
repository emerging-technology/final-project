import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Login from './Login';


function EnrolledStudents(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:5000/api/enrolled/" + props.match.params.id;

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl, {withCredentials: true})
        .then(result => {
          console.log("~~~", result.data)
          setShowLoading(false);
          setData(result.data);
        }).catch((error) => {
          console.log('error in fetchData:', error)
        });
    };  
    fetchData();
  }, []);

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <ListGroup>
        { data.length !== 0 ? 
            data.map((item, idx) => (
              <ListGroup.Item key={idx}>
                <div className="d-flex justify-content-around">
                  {item.studentNumber} {item.fullName} {item.email}
                </div>
              </ListGroup.Item>
            ))
        : <div className="d-flex justify-content-around">
            The student is not enrolled in any courses
          </div> }
      </ListGroup>
    </div>
  );
}
//
export default withRouter(EnrolledStudents);
