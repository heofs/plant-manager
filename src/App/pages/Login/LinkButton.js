import React from 'react';
import { Button } from 'reactstrap';

const LinkButton = ({ className, color, onClick, children }) => {
  return (
    <Button className={'mt-2 ' + className} color="link" onClick={onClick}>
      {children}
    </Button>
  );
};

export default LinkButton;
