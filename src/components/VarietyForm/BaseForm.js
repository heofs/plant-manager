import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, Col, Row } from 'reactstrap';

const BaseForm = ({
  handleInputChange,
  varietyName,
  flowerTime,
  growTime,
  varietyNotes,
}) => {
  return (
    <>
      <Row>
        <Col xs={12} md={6}>
          <FormGroup>
            <Label for="varietyName">Name</Label>
            <Input
              type="text"
              name="varietyName"
              id="varietyName"
              placeholder="Name of your variety"
              value={varietyName}
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
              value={flowerTime}
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
              value={growTime}
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
          value={varietyNotes}
          onChange={handleInputChange}
        />
      </FormGroup>
    </>
  );
};

BaseForm.propTypes = {
  varietyName: PropTypes.string.isRequired,
  flowerTime: PropTypes.string.isRequired,
  growTime: PropTypes.string.isRequired,
  varietyNotes: PropTypes.string.isRequired,
};

export default BaseForm;
