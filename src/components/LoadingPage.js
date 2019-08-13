import React from 'react';
import styled from 'styled-components';
import { Spinner } from 'reactstrap';

const Wrapper = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; /*centers items on the line (the x-axis by default)*/
  align-items: center; /*centers items on the cross-axis (y by default)*/
`;

const StyledSpinner = styled(Spinner)`
  min-width: 4rem;
  min-height: 4rem;
`;

const LoadingPage = () => {
  return (
    <Wrapper>
      <StyledSpinner color="secondary" type={'grow'} />
    </Wrapper>
  );
};

export default LoadingPage;
