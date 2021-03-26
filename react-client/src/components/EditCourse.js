import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function EditCourse(props) {
  const [course, setCourse] = useState({ _id: '', courseCode: '', courseName: '', section: '', semester: '' })
  const [showLoading, setShowLoading] = useState(false);
  // console.log(props)
  const apiUrl = "http://localhost:5000/api/courses/" + props.match.params.id;
  // const apiUrl = "http://localhost:3000/api/courses/" + props.match.params.id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      // const result = await axios(apiUrl);
      console.log("first render")
      axios.get(apiUrl, {withCredentials: true})
        .then(result => {
          setCourse(result.data);
          console.log(result.data);
          setShowLoading(false);
        }).catch(error => setShowLoading(false))
    };
    fetchData();
  }, []);

  const updateCourse = (e) => {
    setShowLoading(true);
    e.preventDefault();
    // const data = { firstName: user.firstName, lastName: user.lastName, 
    //   email: user.email,username: user.username };
    const data = { courseCode: course.courseCode, courseName: course.courseName, section: course.section, semester: course.semester }
    console.log("data passed to backend", data)
    console.log("pressed button")
    axios.put(apiUrl, data, {withCredentials: true})
      .then((result) => {
        setShowLoading(false);
        // props.history.push('/show/' + result.data._id)
        props.history.push('/login')
        // props.history.push('/login')
      }).catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = (e) => {
    e.persist();
    setCourse({...course, [e.target.name]: e.target.value});
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
            <h5 className="mt-5">Edit Course</h5>
            <Form onSubmit={updateCourse}>
              <Form.Group>
                <Form.Label>Course Code</Form.Label>
                <Form.Control type="text" name="courseCode" id="courseCode" placeholder="Enter your course code" 
                  value={course.courseCode} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Course Name</Form.Label>
                <Form.Control type="text" name="courseName" id="courseName" placeholder="Enter your course name" 
                  value={course.courseName} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Section</Form.Label>
                <Form.Control type="text" name="section" id="section" placeholder="Enter your section" 
                  value={course.section} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Semester</Form.Label>
                <Form.Control type="text" name="semester" id="semester" placeholder="Enter your semester" 
                  value={course.semester} onChange={onChange} />
              </Form.Group>
              
              <Button variant="primary" type="submit">
                Update Course
              </Button>
            </Form>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default withRouter(EditCourse);
