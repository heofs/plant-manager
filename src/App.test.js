import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContext } from './utils/authentication';
import { act } from 'react-dom/test-utils';

describe('App', () => {
  const customRender = (container, values) =>
    act(() => {
      ReactDOM.render(
        <AuthContext.Provider value={values}>
          <App />
        </AuthContext.Provider>,
        container
      );
    });

  it('renders without crashing', () => {
    const container = document.createElement('div');
    customRender(container, {
      currentUser: jest.fn(),
    });

    ReactDOM.unmountComponentAtNode(container);
  });
  it('should render login page', () => {
    const container = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <AuthContext.Provider
          value={{
            currentUser: {},
          }}
        >
          <App />
        </AuthContext.Provider>,
        container
      );
    });
    ReactDOM.unmountComponentAtNode(container);
  });
});
