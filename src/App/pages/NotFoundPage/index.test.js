import React from 'react';
import NotFoundPage from './';
import { render } from 'tests/utils/rtl';

describe('Not found page', () => {
  const wrongRoute = '/something-that-does-not-match';

  test('should show a 404 message', () => {
    const { getByText } = render(<NotFoundPage />, {
      route: wrongRoute,
    });
    const element = getByText('Sorry, the page was not found');
    expect(element).toBeTruthy();
  });

  test('should display a message with the route', () => {
    const { getByText } = render(<NotFoundPage />, {
      route: wrongRoute,
    });

    const element = getByText(wrongRoute);
    expect(element).toBeTruthy();
  });
});
