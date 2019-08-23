import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import LoadingPage from 'components/LoadingPage';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import ForgotForm from './ForgotForm';
import styled from 'styled-components';
import { useAuth } from 'enhancers/useAuth';

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

const LoginPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [inputs, setInputs] = useState({
    displayName: '',
    email: '',
    password: '',
  });
  const [selection, setSelection] = useState('login');
  const { user, signin, signup, signinPersist, signinGoogle } = useAuth();
  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (!user && isLoading) {
      setLoading(false);
    }
  }, [user, isLoading]);

  if (user) {
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
          signup={signup}
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
        signin={signin}
        signinPersist={signinPersist}
        signinGoogle={signinGoogle}
      />
    );
  };
  return (
    <Wrapper>
      <StyledCard className="card text-center mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Plantager</h1>
        {renderSelection()}
      </StyledCard>
    </Wrapper>
  );
};

export default LoginPage;
