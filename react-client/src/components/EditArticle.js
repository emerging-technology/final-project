import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function EditArticle(props) {
  console.log('edituser props:',props.match.params)
  const [article, setArticle] = useState({ _id: '', title: '', 
  content: '' });  
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:5000/api/articles/" + props.match.params.id;
  // const apiUrl = "http://localhost:3000/api/articles/" + props.match.params.id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setArticle(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateArticle = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { title: article.title, content: article.content};
    axios.put(apiUrl, data, {withCredentials: true})
      .then((result) => {
        console.log('after calling put to update',result.data )
        setShowLoading(false);
        props.history.push('/showarticle/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = (e) => {
    e.persist();
    setArticle({...article, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form onSubmit={updateArticle}>
          <Form.Group>
            <Form.Label> Title</Form.Label>
            <Form.Control type="text" name="title" id="title" placeholder="Enter article title" value={article.title} onChange={onChange} />
            </Form.Group>
          <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control type="text" name="content" id="content" placeholder="Enter article content" value={article.content} onChange={onChange} />
          </Form.Group>
          
          
        
          <Button variant="primary" type="submit">
            Update Article
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(EditArticle);
