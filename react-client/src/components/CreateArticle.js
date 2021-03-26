import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';

//
function CreateArticle(props) {
    //
    const username = props.screen;
    console.log('props.screen',props.screen)
    const [article, setArticle] = useState({ _id: '', title: '', content: '', username: '' });
    const [showLoading, setShowLoading] = useState(false);
    //
    const apiUrl = "http://localhost:5000/api/courses"
    // const apiUrl = "http://localhost:3000/api/courses"
    //
    const saveArticle = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {title: article.title, code: article.content };
        //
        axios.post(apiUrl, data, {withCredentials: true})
        .then((result) => {
            setShowLoading(false);
            console.log('results from save article:',result.data)
            props.history.push('/showarticle/' + result.data._id)

        }).catch((error) => setShowLoading(false));
    };
    //
    const onChange = (e) => {
        e.persist();
        setArticle({...article, [e.target.name]: e.target.value});
      }
    
    return (
        <div>
        <h2> Create an article {username} </h2>
        {showLoading && 
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner> 
        } 
        <Jumbotron>
            <Form onSubmit={saveArticle}>
              <Form.Group>
                <Form.Label> Title</Form.Label>
                <Form.Control type="text" name="title" id="title" placeholder="Enter title" value={article.title} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Content</Form.Label>
                <Form.Control as="textarea" rows="3" name="content" id="content" placeholder="Enter Content" value={article.content} onChange={onChange} />
              </Form.Group>
                            
              <Button variant="primary" type="submit">
                Save Article
              </Button>
            </Form>
          </Jumbotron>
        </div>
    );


}

export default withRouter(CreateArticle);
