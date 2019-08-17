import React, { useState } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Button from './Button';
import GoogleLogo from '../../images/google-logo.svg';

const LoginForm = ({
  inputs,
  handleInputChange,
  setSelection,
  loginPersist,
  login,
  loginGoogle,
}) => {
  const [rememberLogin, setRememberLogin] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isEmailValid, setEmailValid] = useState(true);
  const [displayMessage, setDisplayMessage] = useState(false);
  return (
    <Form>
      {displayMessage && (
        <p style={{ color: 'red' }}>Username or password is wrong</p>
      )}
      <FormGroup>
        <Label for="email-id">Email</Label>
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
        <Label for="password-id">Password</Label>
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
      <FormGroup className="custom-control custom-checkbox mb-2">
        <Input
          type="checkbox"
          className="custom-control-input"
          id="remember-id"
          checked={rememberLogin}
          onChange={() => setRememberLogin(!rememberLogin)}
        />
        <Label className="custom-control-label" htmlFor="remember-id">
          Remember me
        </Label>
      </FormGroup>
      <Button
        color="success"
        type="submit"
        onClick={async e => {
          e.preventDefault();
          setDisplayMessage(false);
          console.log(inputs);
          if (rememberLogin === true) {
            loginPersist(inputs.email, inputs.password);
          }
          const res = await login(inputs.email, inputs.password);
          console.log(res);
          if (res.includes('invalid-email')) {
            setEmailValid(false);
          }
          if (res.includes('invalid-email')) {
            setPasswordValid(false);
          }
          if (res.includes('user-not-found')) {
            setEmailValid(false);
            setPasswordValid(false);
            setDisplayMessage(true);
          }
        }}
      >
        Sign in
      </Button>
      <Button
        color="success"
        onClick={e => {
          e.preventDefault();
          loginGoogle();
        }}
        image={GoogleLogo}
      >
        Sign in with Google
      </Button>
      <Button
        color="info"
        onClick={e => {
          e.preventDefault();
          setSelection('register');
        }}
      >
        Register
      </Button>
    </Form>
  );
};

export default LoginForm;
