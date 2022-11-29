import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

function Layout() {
  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Collapse>
            <Nav className="justify-content-center">
              <Nav.Item>
                <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to="/search"><Nav.Link>Search Results</Nav.Link></LinkContainer>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;