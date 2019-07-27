import React from 'react';
import { createMemoryHistory } from 'history';
import { withRouter } from 'react-router';
import { Link, Route, Router, Switch } from 'react-router-dom';
import Sidebar from './';
import { render } from '@testing-library/react';

function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

it('renders without crashing', () => {
  const { container } = renderWithRouter(<Sidebar />);

  expect(container.innerHTML).toBeTruthy();
});
