import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function ShowStudentCourses(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true);
      axios.get("http://localhost:5000/showCourses/" + props.match.params.id, {withCredentials: true})
      .then(result => {
        console.log(result.data)
        setData(result.data);
      }).catch(error => console.log(error))
      setShowLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <ListGroup>
            {data.map((item, idx) => (
              <ListGroup.Item key={idx}>
                <div className="d-flex justify-content-around">
                  {item.courseCode} {item.courseName} Sec{item.section}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
    </div>
  );
}

export default withRouter(ShowStudentCourses);
