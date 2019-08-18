import React, { useState } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import StyledButton from './Button';
import LinkButton from './LinkButton';

const RegistrationForm = ({
  inputs,
  handleInputChange,
  setSelection,
  register,
}) => {
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isEmailValid, setEmailValid] = useState(true);
  const [displayMessage, setDisplayMessage] = useState(false);
  return (
    <div>
      <p>Create new account</p>
      <Form>
        {displayMessage && <p style={{ color: 'red' }}>Some message</p>}
        <FormGroup>
          <Input
            type="displayName"
            name="displayName"
            id="displayName-id"
            placeholder="Your name (optional)"
            onChange={e => {
              handleInputChange(e);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="email"
            name="email"
            id="email-id"
            placeholder="Email address"
            invalid={!isEmailValid}
            onChange={e => {
              handleInputChange(e);
              setEmailValid(true);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            id="password-id"
            placeholder="Password"
            invalid={!isPasswordValid}
            onChange={e => {
              handleInputChange(e);
              setPasswordValid(true);
            }}
          />
        </FormGroup>

        <StyledButton
          color="success"
          onClick={e => {
            e.preventDefault();
            register(inputs.displayName, inputs.email, inputs.password)
              .then(e => {
                console.log('Success: ', e);
              })
              .catch(e => {
                console.log(e);
              });
          }}
        >
          Create account
        </StyledButton>
      </Form>
      <LinkButton
        className="mt-2"
        color="link"
        onClick={() => setSelection('login')}
      >
        Back to login
      </LinkButton>
    </div>
  );
};

export default RegistrationForm;
