// components/MainNav.js
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';

const MainNav = () => {
  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-dark" expand="lg">
        <Container>
          <Navbar.Brand>Ahmad Mashal </Navbar.Brand> { }
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link>Movies</Nav.Link>
              </Link>
              <Link href="/about" passHref legacyBehavior>
                <Nav.Link>About</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br /><br /> {/* Two line breaks to ensure content is not hidden behind the fixed Navbar */}
    </>
  );
};

export default MainNav;
