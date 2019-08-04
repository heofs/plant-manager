import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';

const VarietyEditForm = ({ targetData, handleCancelEdit, handleSaveEdit }) => {
  const [inputs, setInputs] = useState({
    varietyName: '',
    flowerTime: '',
    growTime: '',
    varietyNotes: '',
  });
  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };
  useEffect(
    () =>
      setInputs(() => ({
        varietyName: targetData.variety || '',
        flowerTime: targetData.flower_time || '',
        growTime: targetData.grow_time || '',
        varietyNotes: targetData.notes || '',
      })),
    [
      targetData.variety,
      targetData.flower_time,
      targetData.grow_time,
      targetData.notes,
    ]
  );
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <h1>Editing {targetData.variety}</h1>
        </CardTitle>
        {/* <CardSubtitle>Add your new varieties here.</CardSubtitle> */}
        <Form
          className="mt-2"
          onSubmit={e => handleSaveEdit(e, { id: targetData.id, ...inputs })}
        >
          <Row>
            <Col xs={12} md={6}>
              <FormGroup>
                <Label for="varietyName">Name</Label>
                <Input
                  type="text"
                  name="varietyName"
                  id="varietyName"
                  placeholder="Name of your variety"
                  value={inputs.varietyName}
                  onChange={handleInputChange}
                  data-message-required="This field is required."
                  required
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={6}>
              <FormGroup>
                <Label for="flowerTime">Flower time</Label>
                <Input
                  type="number"
                  name="flowerTime"
                  id="flowerTime"
                  placeholder="Days of flowering"
                  value={inputs.flowerTime}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="growTime">Grow time</Label>
                <Input
                  type="number"
                  name="growTime"
                  id="growTime"
                  placeholder="Days of growing"
                  value={inputs.growTime}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="varietyNotes">Notes</Label>
            <Input
              type="textarea"
              name="varietyNotes"
              id="varietyNotes"
              value={inputs.varietyNotes}
              onChange={handleInputChange}
            />
          </FormGroup>
          <Row>
            <Col md={8}>
              <Button color="primary" className={'w-100 mb-3 mb-md-0'}>
                Save
              </Button>
            </Col>
            <Col md={4}>
              <Button
                color="danger"
                className={'w-100'}
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
  handleCancelEdit: PropTypes.func.isRequired,
};

export default VarietyEditForm;
