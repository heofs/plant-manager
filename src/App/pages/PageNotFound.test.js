import React from 'react';
import PageNotFound from './PageNotFound';
import { render } from 'tests/utils/rtl';

test('should show a 404 message', () => {
  const { getByText } = render(<PageNotFound />, {
    route: '/something-that-does-not-match',
  });
  const element = getByText('404 - The page was not found.');
  expect(element).toBeTruthy();
});

test('should always redirect to /404', () => {
  const { history } = render(<PageNotFound />, {
    route: '/something-that-does-not-match',
  });

  expect(history.location.pathname).toBe('/404');
});
