import React, { useState } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

import StyledButton from './Button';
import LinkButton from './LinkButton';

import GoogleLogo from 'images/google-logo.svg';

const LoginForm = ({
  inputs,
  handleInputChange,
  setSelection,
  signinPersist,
  signin,
  signinGoogle,
}) => {
  const [rememberSignin, setRememberSignin] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isEmailValid, setEmailValid] = useState(true);
  const [displayMessage, setDisplayMessage] = useState(false);
  return (
    <>
      <StyledButton
        onClick={e => {
          e.preventDefault();
          signinGoogle();
        }}
        image={GoogleLogo}
      >
        Sign in with Google
      </StyledButton>
      <Form className="mt-3">
        {displayMessage && (
          <p style={{ color: 'red' }}>Username or password is wrong</p>
        )}
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
        <FormGroup className="custom-control custom-checkbox mb-2">
          <Input
            type="checkbox"
            className="custom-control-input"
            id="remember-id"
            checked={rememberSignin}
            onChange={() => setRememberSignin(!rememberSignin)}
          />
          <Label className="custom-control-label" htmlFor="remember-id">
            Remember login
          </Label>
        </FormGroup>
        <StyledButton
          type="submit"
          onClick={async e => {
            e.preventDefault();
            setDisplayMessage(false);
            if (rememberSignin === true) {
              signinPersist(inputs.email, inputs.password);
            }
            signin(inputs.email, inputs.password).catch(({ code }) => {
              if (
                code.includes('invalid-email') ||
                code.includes('wrong-password')
              ) {
                setEmailValid(false);
                setPasswordValid(false);
                setDisplayMessage('Wrong username or password');
              }
              if (code.includes('user-not-found')) {
                setEmailValid(false);
                setPasswordValid(false);
                setDisplayMessage('User not found');
              }
            });
          }}
        >
          Sign in
        </StyledButton>
      </Form>
      <LinkButton
        onClick={e => {
          e.preventDefault();
          setSelection('register');
          setDisplayMessage(false);
        }}
      >
        Forgot your password?
      </LinkButton>
      <LinkButton
        onClick={e => {
          e.preventDefault();
          setSelection('register');
          setDisplayMessage(false);
        }}
      >
        Create an account
      </LinkButton>
    </>
  );
};

export default LoginForm;
