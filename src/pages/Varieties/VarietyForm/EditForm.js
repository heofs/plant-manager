import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Form, Card, CardBody, CardTitle, Col, Row } from "reactstrap";

import BaseForm from "../Form/BaseForm";

const VarietyEditForm = ({ targetData, handleCancelEdit, handleSaveEdit }) => {
  const [inputs, setInputs] = useState({
    varietyName: "",
    flowerTime: "",
    growTime: "",
    varietyNotes: ""
  });
  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };
  useEffect(
    () =>
      setInputs(() => ({
        varietyName: targetData.variety || "",
        flowerTime: targetData.flower_time || "",
        growTime: targetData.grow_time || "",
        varietyNotes: targetData.notes || ""
      })),
    [
      targetData.variety,
      targetData.flower_time,
      targetData.grow_time,
      targetData.notes
    ]
  );
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <h1>Editing: {targetData.variety}</h1>
        </CardTitle>
        {/* <CardSubtitle>Add your new varieties here.</CardSubtitle> */}
        <Form
          className="mt-2"
          onSubmit={e => handleSaveEdit(e, { id: targetData.id, ...inputs })}
        >
          <BaseForm
            handleInputChange={handleInputChange}
            varietyName={inputs.varietyName}
            flowerTime={inputs.flowerTime}
            growTime={inputs.growTime}
            varietyNotes={inputs.varietyNotes}
          />
          <Row>
            <Col md={8}>
              <Button color="primary" className={"w-100 mb-3 mb-md-0"}>
                Save
              </Button>
            </Col>
            <Col md={4}>
              <Button
                color="danger"
                className={"w-100"}
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

VarietyEditForm.propTypes = {
  targetData: PropTypes.object.isRequired,
  handleSaveEdit: PropTypes.func.isRequired,
  handleCancelEdit: PropTypes.func.isRequired
};

export default VarietyEditForm;
