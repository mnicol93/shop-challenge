import { Navbar, Col, Container, Nav, NavDropdown, Row } from "react-bootstrap";
import { Redirect, Route, Router } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";
import './NavBar.css';

import Home from '../Home';
import Epic from '../Epic';
import About from '../About';
import NotFound from '../NotFound';
function NavBar(){
    return(
        <>
        <Navbar bg="light">
            <LinkContainer to="/">
            <Navbar.Brand>Spacegram</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                    <NavDropdown
                        id="nav-dropdown"
                        title="Browse"
                        menuVariant="dark"
                    >
                        <NavDropdown.Item href="">EPIC</NavDropdown.Item>
                        <NavDropdown.Item href="">La 2</NavDropdown.Item>
                        <NavDropdown.Item href="">La 3</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="">La Xiula</NavDropdown.Item>
                    </NavDropdown>
                <Nav.Link href="#home">ABOUT</Nav.Link>                
            </Nav>
        </Navbar>
        <br />
        </>
    );
}

export default NavBar;