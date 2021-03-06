import React from 'react';
import { Button as BootstrapButton } from 'reactstrap';
import styled from 'styled-components';

const StyledButton = styled(BootstrapButton)`
  display: flex;
  justify-content: center;
`;
const StyledImage = styled.img`
  height: 100%;
  margin: 0;
  padding-right: 1em;
  height: 1.5em;
`;

const Button = ({ children, color, onClick, image }) => {
  return (
    <StyledButton
      className="btn-block shadow-sm"
      color={color || 'success'}
      onClick={onClick}
    >
      {image && <StyledImage src={image} alt={image} />}
      {children}
    </StyledButton>
  );
};

export default Button;
