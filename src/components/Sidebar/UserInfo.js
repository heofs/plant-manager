import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'enhancers/useAuth';
import profileImage from 'images/user-icon.svg';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import styled from 'styled-components';

const Wrapper = styled(Dropdown)`
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1em;
`;

const DropdownList = styled(DropdownMenu)`
  /* padding: 5px; */
  /* display: flex;
  flex-direction: column; */
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  width: 100%;
  &:hover {
    text-decoration: none;
    color: black;
  }
`;

const StyledImage = styled.img`
  margin-right: 7px;
`;

const StyledToggle = styled(DropdownToggle)`
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 10px 0px; */
  border: 2px solid;
  padding: 5px 25px;
  border-radius: 20px;
  background-color: #ededed;
  cursor: pointer;
  font-size: 1.2em;
`;

const UserInfo = () => {
  const { user, signout } = useAuth();
  const [isOpen, setOpen] = useState(false);
  return (
    <Wrapper direction="up" isOpen={isOpen} toggle={() => setOpen(!isOpen)}>
      <StyledToggle
        tag="span"
        onClick={() => setOpen(!isOpen)}
        data-toggle="dropdown"
        aria-expanded={isOpen}
      >
        <StyledImage src={profileImage} alt="profile" />
        {user.displayName || 'User profile'}
      </StyledToggle>
      <DropdownList>
        <StyledLink to={'/settings'} onClick={() => setOpen(!isOpen)}>
          <DropdownItem>Settings</DropdownItem>
        </StyledLink>
        <DropdownItem
          onClick={() => {
            signout();
            setOpen(!isOpen);
          }}
        >
          Sign out
        </DropdownItem>
      </DropdownList>
    </Wrapper>
  );
};

export default UserInfo;
