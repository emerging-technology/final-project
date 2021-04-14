import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Checklist = (props) => {
  const [state, setState] = useState({});
  const checkboxValues = [
    "abdominal_pain",
    "arm_numbness",
    "arm_weakness",
    "back_ache",
    "back_burning_sensation",
    "chest_pain/pressure",
    "cold_sweat",
    "confusion",
    "diarrhea",
    "difficulty_with_speech",
    "dizziness",
    "ear_pain",
    "extreme_thirst",
    "fatigue",
    "fever",
    "heartburn",
    "insomnia",
    "leg_numbness",
    "less_frequent_urination",
    "lightheadedness",
    "muscle_weakness",
    "nausea",
    "overweight",
    "pelvic_pain",
    "severe_headache",
    "shortness_of_breath",
    "spine_damage",
    "taste_acid",
    "toothache",
    "vomiting",
    "weakness"
  ]

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log("state", state)
    props.history.push({
      pathname: "/checklistResults",
      state,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target
    console.log("name", name, " value", value)
    setState(prevState => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h1>Select your symptoms for analysis</h1>
          <Form className="register-form" onSubmit={handleOnSubmit}>
              <Form.Group>
              {/* <Form.Check type="checkbox" name="abdominal_pain" label="Abdominal Pain" onChange={handleInputChange}/>
              <Form.Check type="checkbox" name="acid_taste" label="Acid Taste" onChange={handleInputChange}/> */}
              {checkboxValues.map(x => (
                //   x
                <Form.Check type="checkbox" name={x} key={x}
                  label={x.split("_").map(x => x[0].toUpperCase() + x.slice(1)).join(" ")} 
                  onChange={handleInputChange}/>
              ))}
              </Form.Group>

              <Button variant="primary" type="submit">
              Evaluate
              </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Checklist;
