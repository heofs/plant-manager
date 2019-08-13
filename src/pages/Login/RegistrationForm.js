import React from 'react';

const RegistrationForm = ({ setSelection }) => {
  return (
    <div>
      registration
      <button onClick={() => setSelection('login')}>Login</button>
    </div>
  );
};

export default RegistrationForm;
