import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class PlantsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = event => {
    console.log('Email: ' + this.state.email);
    console.log('Password: ' + this.state.password);
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="with a placeholder"
              value={this.state.email}
              onChange={this.handleEmailChange}
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
              onChange={this.handlePasswordChange}
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default PlantsPage;
