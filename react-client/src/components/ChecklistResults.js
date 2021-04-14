import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { NavLink } from "react-router-dom";

const ChecklistResults = (props) => {
  const [data, setData] = useState({});
  const [type, setType] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  const checklist = 
    (props.location && props.location.state) || {};
  const apiUrl = "http://localhost:5000/checklistResults";
  //runs once after the first rendering of page
  useEffect(() => {
    const fetchData = async () => {
      axios
        // .post(apiUrl, checklist, {headers: {
        //         "Access-Control-Allow-Origin": "*",
        //         "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        //         "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token" }})
        .post(apiUrl, checklist, {withCredentials: true})
        .then(result => {
          console.log("result.data:", result.data);
          setData(result.data);
          setShowLoading(false);
        })
        .catch((error) => {
          console.log("error in fetchData:", error);
        });
    };
    fetchData();
  }, []);

  return (
    <div>
      {showLoading === false ? (
        <div>
          {showLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          <h1>Prediction Results</h1>
          <h2>the values for species will be:</h2>
          <li>setosa: 1, 0, 0</li>              
          <li>virginica: 0, 1, 0</li>
          <li>versicolor: 0, 0, 1 </li>
          <br/> <br/>
          <h2>Results of Input</h2>
          {/* <div>
            {data.row1.map((value, index) => (
              <p key={index}>{value}</p>
            ))}
          </div> */}
          <div>
            <NavLink to="/" activeClassName="active">
              Go Back
            </NavLink>
          </div>
        </div>
      ) : (
        <div>
          {showLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Waiting for results...</span>
            </Spinner>
          )}
        </div>
      )}
    </div>
  );
};
export default ChecklistResults;
