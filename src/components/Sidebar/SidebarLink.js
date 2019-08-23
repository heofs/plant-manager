import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledLink = styled(NavLink)`
  display: flex;
  cursor: pointer;
  font-size: 1.5em;
  /* position: relative; */
  color: white !important;
  margin: 10px 15px 0;
  text-decoration: none !important;
  padding: 10px 8px;
  line-height: 30px;
  opacity: 0.8;
  outline: none;
  &&&:focus {
    color: #28a745 !important;
  }
`;

const SidebarLink = ({ children, icon, to }) => {
  return (
    <li>
      <StyledLink to={to} activeClassName="ml-5 text-success">
        <FontAwesomeIcon className="mr-3" icon={icon} />
        {children}
      </StyledLink>
    </li>
  );
};

SidebarLink.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default SidebarLink;
