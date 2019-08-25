import React, { useState } from 'react';
import { useAuth } from 'enhancers/useAuth';
import { useToasts } from 'react-toast-notifications';
import { Card, CardBody, Button, Input, Col } from 'reactstrap';
import styled from 'styled-components';

const InputRow = styled.div`
  display: flex;
`;

const CardTitle = styled.h2`
  font-size: 2em;
`;

const SettingTitle = styled.h3`
  font-size: 1.3em;
  margin: 10px 0;
`;

const StyledInput = styled(Input)`
  margin-right: 1em;
`;

const SettingsPage = () => {
  const { user } = useAuth();
  const { addToast } = useToasts();
  const [name, setName] = useState(user.displayName || '');
  const [firstPW, setFirstPW] = useState('');
  const [secondPW, setSecondPW] = useState('');
  const [validPW, setValidPW] = useState(true);

  const changePassword = () => {
    setValidPW(true);
    if (firstPW !== secondPW || firstPW === '') {
      setValidPW(false);
      return;
    }
    user
      .updatePassword(firstPW)
      .then(() => {
        setFirstPW('');
        setSecondPW('');
        addToast('Successfully changed password', {
          appearance: 'success',
          autoDismiss: true,
        });
      })
      .catch(({ code }) => {
        setValidPW(false);
        addToast('Error: ' + code, {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  const changeName = () => {
    user
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        addToast('Successfully changed name', {
          appearance: 'success',
          autoDismiss: true,
        });
      })
      .catch(({ code }) => {
        addToast('Error: ' + code, {
          appearance: 'error',
          autoDismiss: false,
        });
      });
  };

  return (
    <Card>
      <Col xs={12} lg={8} xl={6} className="p-0">
        <CardBody>
          <CardTitle>Settings</CardTitle>
          <SettingTitle>Change Name</SettingTitle>
          <InputRow>
            <StyledInput
              type="text"
              name="displayName"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Button onClick={changeName}>Change</Button>
          </InputRow>
          <SettingTitle>Change password</SettingTitle>
          <InputRow>
            <StyledInput
              type="password"
              name="pw1"
              invalid={!validPW}
              value={firstPW}
              placeholder="new password"
              onChange={e => setFirstPW(e.target.value)}
            />
            <StyledInput
              type="password"
              name="pw2"
              invalid={!validPW}
              value={secondPW}
              placeholder="repeat password"
              onChange={e => setSecondPW(e.target.value)}
            />
            <Button onClick={changePassword}>Change</Button>
          </InputRow>
        </CardBody>
      </Col>
    </Card>
  );
};

export default SettingsPage;
