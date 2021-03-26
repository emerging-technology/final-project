import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function ShowArticle(props) {
  console.log('props.match.params',props.match.params.id)
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:5000/api/articles/" + props.match.params.id;
  // const apiUrl = "http://localhost:3000/api/articles/" + props.match.params.id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl, {withCredentials: true});
      console.log('results from articles',result.data);

      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editArticle = (id) => {
    props.history.push({
      pathname: '/editarticle/' + id
    });
  };

  const deleteArticle = (id) => {
    setShowLoading(true);
    const article = { title: data.title, content: data.content };
    //
    axios.delete(apiUrl, article, {withCredentials: true})
      .then((result) => {
        setShowLoading(false);
        props.history.push('/listarticles')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <Jumbotron>
        <h1>Title: {data.title}</h1>
        <p>Content: {data.content}</p>

        <p>
          <Button type="button" variant="primary" onClick={() => { editArticle(data._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteArticle(data._id) }}>Delete</Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowArticle);
