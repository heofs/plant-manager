import React, { useState } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

import StyledButton from './Button';
import LinkButton from './LinkButton';

const ForgotForm = ({
  inputs,
  setSelection,
  handleInputChange,
  sendPasswordResetEmail,
}) => {
  const [info, setInfo] = useState({ msg: false, color: 'text-danger' });
  const [isEmailValid, setEmailValid] = useState(true);

  return (
    <>
      <Form>
        {info.msg && <p className={info.color}>{info.msg}</p>}

        <FormGroup>
          <Input
            type="email"
            name="email"
            id="email-id"
            placeholder="Email address"
            invalid={!isEmailValid}
            value={inputs.email}
            onChange={e => {
              handleInputChange(e);
              setEmailValid(true);
            }}
          />
        </FormGroup>
        <StyledButton
          color="success"
          onClick={e => {
            e.preventDefault();
            setInfo(false);
            if (!inputs.email) {
              setInfo({
                msg: 'You must provide your email address.',
                color: 'text-danger',
              });
              return;
            }

            sendPasswordResetEmail(inputs.email)
              .then(e => {
                setInfo({
                  msg: `Password reset instructions sent to ${inputs.email}`,
                  color: 'text-success',
                });
              })
              .catch(e => {
                if (!e.code) {
                  return;
                }
                if (e.code.includes('invalid-email')) {
                  setInfo({
                    msg: 'Invalid email address.',
                    color: 'text-danger',
                  });
                } else if (e.code.includes('user-not-found')) {
                  setInfo({
                    msg: 'Email not found.',
                    color: 'text-danger',
                  });
                }
              });
          }}
        >
          Reset password
        </StyledButton>
      </Form>
      <LinkButton
        onClick={e => {
          e.preventDefault();
          setSelection('login');
          setInfo(false);
        }}
      >
        Return to login
      </LinkButton>
    </>
  );
};

export default ForgotForm;
