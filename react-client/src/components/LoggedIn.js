import CreateArticle from './CreateArticle';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
//
import axios from 'axios';
//
function LoggedIn (props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
  const [article, setArticle] = useState('');
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable 
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get('http://localhost:5000/signout', {withCredentials: true});
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyCookie = async () => {
    try {
      const res = await axios.get('/welcome', {withCredentials: true});
      console.log(res.data)
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  //
  const listArticles = (username) => {

    console.log('in lisArticles: ',username)
    //setArticle('n')

  }
  //
  //
  return (
    <div>
      {article !== 'y'
        ?           
            <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div>
            {/* <p>{screen}</p>
            <p>{data}</p> */}
            <div className="d-flex justify-content-center">
              <Button className="m-3"  variant="primary" onClick={deleteCookie}>Log out</Button>
              <Button className="m-3"  variant="primary" href="/addCourse">Add Course</Button>
              <Button className="m-3"  variant="primary"  href="/listCourses">List Courses</Button>
              <Button className="m-3" variant="primary" href="/listStudents">List Students</Button>
            </div>
            
          </div>  
              </div>
            </div>
          </div>
        : <CreateArticle screen={screen} setScreen={setScreen} />
      }
    </div>
  );
}

//
export default LoggedIn;