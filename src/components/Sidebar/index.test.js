import React from 'react';
import { render } from '../../tests/utils/rtl';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBraille } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './';
import SidebarLink from './SidebarLink';

library.add(faBraille);

describe('Sidebar', () => {
  it('renders without crashing', () => {
    const { container } = render(<Sidebar />);

    expect(container.innerHTML).toBeTruthy();
  });

  describe('SidebarLink', () => {
    it('renders without crashing', () => {
      const { getByText } = render(
        <SidebarLink to={'/'} icon={'braille'}>
          My sidebar button
        </SidebarLink>
      );
      const buttonText = getByText('My sidebar button');
      expect(buttonText).toBeTruthy();
    });
  });
});
