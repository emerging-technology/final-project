import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Checklist = (props) => {
  const [state, setState] = useState({});

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
          <h1>What do you want to test?</h1>
          <Form className="register-form" onSubmit={handleOnSubmit}>
              <Form.Group>
              <Form.Check type="checkbox" name="abdominal_pain" label="Abdominal Pain" onChange={handleInputChange}/>
              <Form.Check type="checkbox" name="acid_taste" label="Acid Taste" onChange={handleInputChange}/>
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
