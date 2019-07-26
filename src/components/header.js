import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Navbar } from 'reactstrap';

const StyledWrapper = styled.div`
  display: flex;
`;

const StyledToggle = styled.div`
  padding: 1em;
`;

const StyledNavbar = styled(Navbar)`
  /* background-color: grey; */
  position: fixed;
  @media screen and (min-width: 992px) {
    display: none !important;
  }
`;

const SidebarToggler = styled.button`
  border: 1px solid black !important;
  padding: 12px !important;
`;

class Header extends PureComponent {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { toggleSidebar } = this.props;
    return (
      <StyledNavbar>
        <StyledWrapper>
          <StyledToggle>
            <SidebarToggler
              type="button"
              className="navbar-toggler"
              onClick={() => toggleSidebar()}
              style={{ border: 'red' }}
            >
              Toggle
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </SidebarToggler>
          </StyledToggle>
        </StyledWrapper>
      </StyledNavbar>
    );
  }
}

export default Header;
