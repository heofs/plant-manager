import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { withAuthentication } from 'utils/authentication';
import LoadingPage from 'components/LoadingPage';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import ForgotForm from './ForgotForm';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #f5f5f5;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCard = styled.div`
  overflow: hidden;
  margin: 0;
  width: 300px;
  padding: 1em;
`;

const LoginPage = ({
  currentUser,
  login,
  rememberLogin,
  googleLogin,
  getUser,
  register,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [inputs, setInputs] = useState({
    displayName: '',
    email: '',
    password: '',
  });
  const [selection, setSelection] = useState('login');
  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    getUser()
      .then(user => {
        isLoading && setLoading(false);
      })
      .catch(e => {
        isLoading && setLoading(false);
      });
  }, [isLoading, getUser]);
  if (currentUser) {
    return <Redirect to={'/'} />;
  }
  if (isLoading) {
    return <LoadingPage />;
  }
  const renderSelection = () => {
    if (selection === 'register') {
      return (
        <RegistrationForm
          inputs={inputs}
          setSelection={setSelection}
          handleInputChange={handleInputChange}
          register={register}
        />
      );
    }
    if (selection === 'forgotpw') {
      return (
        <ForgotForm
          inputs={inputs}
          setSelection={setSelection}
          handleInputChange={handleInputChange}
        />
      );
    }
    return (
      <LoginForm
        inputs={inputs}
        setSelection={setSelection}
        handleInputChange={handleInputChange}
        login={login}
        loginPersist={rememberLogin}
        loginGoogle={googleLogin}
      />
    );
  };
  return (
    <Wrapper>
      <StyledCard className="card text-center mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Plantager</h1>
        <h1 className="h3 mb-3 font-weight-normal">
          API URL = "{process.env.REACT_APP_API_URL}"
        </h1>
        <h1 className="h3 mb-3 font-weight-normal">
          NODE_ENV = {process.env.NODE_ENV}
        </h1>
        {renderSelection()}
      </StyledCard>
    </Wrapper>
  );
};

export default withAuthentication(LoginPage);