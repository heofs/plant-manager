import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  font-size: 1rem;
  height: 100%;
  margin-right: 0.2em;
  width: ${props => props.width};
  background-color: ${props => props.color};
  border-color: ${props => props.color};
  border: 1px solid transparent;
  color: white;
  text-align: center;
  vertical-align: middle;
  border-radius: 0.25rem;
  padding: 0;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const TableButton = ({ children, ...otherProps }) => (
  <Button {...otherProps}>{children}</Button>
);

export default TableButton;
