import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => (
  <Navbar bg="primary" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="/">React Multi-Page</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/form">Form</Nav.Link>
        <Nav.Link as={Link} to="/about">About</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default AppNavbar;
