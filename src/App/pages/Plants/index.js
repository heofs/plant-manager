import React from 'react';
import { withToastManager } from 'react-toast-notifications';
import { flow } from 'lodash';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class PlantsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = event => {
    console.log('Email: ' + this.state.email);
    console.log('Password: ' + this.state.password);
    event.preventDefault();
  };

  render() {
    return (
      <div>
        {/* {console.log(this.props.client)} */}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="with a placeholder"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password placeholder"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default flow(withToastManager)(PlantsPage);
