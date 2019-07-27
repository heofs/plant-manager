import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render } from './tests/utils/rtl';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('landing on a bad page', () => {
  const { getByText } = render(<App />, {
    route: '/something-that-does-not-match',
  });
  const notFoundPage = getByText('404 - The page was not found.');
  expect(notFoundPage).toBeTruthy();
});
