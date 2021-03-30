import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Login from './Login';


function ListCourses(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:5000/api/courses";
  // const apiUrl = "http://localhost:3000/api/courses";

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl, {withCredentials: true})
        .then(result => {
            setData(result.data);
            setShowLoading(false);
        }).catch((error) => {
          console.log('error in fetchData:', error)
        });
      };  
    fetchData();
  }, []);

  const enrollInCourse = async course => {
    console.log(course)
    setShowLoading(true);
    axios.put(`http://localhost:5000/api/enroll/${course._id}`, {}, {withCredentials: true}).then(result=>{
      console.log("~~~", result.data);
      setShowLoading(false);
    })
  }

  const dropCourse = async course => {
    console.log(course)
    setShowLoading(true);
    axios.put(`http://localhost:5000/api/drop/${course._id}`, {}, {withCredentials: true}).then((result)=>{
        setShowLoading(false);
    });
  }


  const updateCourse = course => {
    console.log(course)
    props.history.push({
      pathname: '/editCourse/' + course._id
    });
  }

  const deleteCourse = course => {
    console.log(course)
    setShowLoading(true)
  
    //app.route('/api/courses/:courseId')
    axios.delete("http://localhost:5000/api/courses/" + course._id, {withCredentials: true})
    // axios.delete("http://localhost:3000/api/courses/" + course._id)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/login')
      }).catch((error) => setShowLoading(false));
  }

  return (
    <div>
      { data.length !== 0
        ? <div className="container">
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> }
          <ListGroup>
            {data.map((item, idx) => (
              <ListGroup.Item key={idx}>
                <div className="d-flex justify-content-around">
                  {item.courseCode} {item.courseName} Sec{item.section}
                  {/* TODO: complete the following functionality */}
                  <Button  onClick={() => { enrollInCourse(item) }}>Enroll in Course</Button>
                  <Button  onClick={() => { dropCourse(item) }}>Drop Course</Button>
                  <Button  href={"/enrolledStudents/" + item._id}>Enrolled Students</Button>
                  <Button  onClick={() => { updateCourse(item) }}>Update Course</Button>
                  <Button variant="danger" onClick={() => { deleteCourse(item) }}>Delete Course</Button>
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
export default withRouter(ListCourses);
