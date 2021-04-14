import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { NavLink } from "react-router-dom";

const ChecklistResults = (props) => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  const checklist = 
    (props.location && props.location.state) || {};
  const apiUrl = "http://localhost:5000/checklistResults";
  const diseases = [
    "heart_attack",
    "stroke",
    "gastroenteritis",
    "irritable_bowel_syndrome",
    "appendicitis",
    "back_pain",
    "gastroesophageal_reflux_disease",
    "ear_infection",
    "dehydration",
    "dentin_hypersensitivity",
    "paresthesia",
    "muscular_dystrophy",
    "sleep_apnea"
  ]

  const dangerousDiseases = [
    "heart_attack",
    "stroke",
    "appendicitis",
    "muscular_dystrophy"
  ]

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
          console.log("result.data:", result.data[0]);
          setData(result.data[0]);
          setShowLoading(false);
        })
        .catch((error) => {
          console.log("error in fetchData:", error);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      {showLoading === false ? (
        <div className="row">
          <div className="col-lg-12">
          {showLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          <h1>Prediction Results</h1>
          <br/>
          <h2>Results of Input</h2>
          <h4>
            {diseases[data.indexOf(Math.max(...data))].split("_").map(x => x[0].toUpperCase() + x.slice(1)).join(" ")}, 
            at {Math.round(data[data.indexOf(Math.max(...data))] * 100)}% confidence
          </h4>
          <h5>
            You {dangerousDiseases.indexOf(diseases[data.indexOf(Math.max(...data))]) === -1 ? "do not" : ""} need to see a doctor
          </h5>
          <br/> <br/>
          <h2>Complete Results</h2>
          <ul>
            {data.map((value, index) => (
              <li key={index}>{diseases[index].split("_").map(x => x[0].toUpperCase() + x.slice(1)).join(" ")}, 
              at {Math.round(value * 100)}% confidence</li>
            ))}
          </ul>
          <div>
            <NavLink to="/" activeClassName="active">
              Go Back
            </NavLink>
          </div>
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
