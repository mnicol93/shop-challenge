import { Navbar, Nav, NavDropdown,} from "react-bootstrap";
import { Route, Routes, Link } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";

import Home from '../Home';
import Epic from '../Epic';
import Mars from '../Mars'
import About from '../About';
import NotFound from '../NotFound';

import './NavBar.css';

export default function NavBar(){
    return (
     <>
        <Navbar bg="light">
            <LinkContainer to="/">
            <Navbar.Brand>Spacegram</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                    <NavDropdown
                        id="nav-dropdown"
                        title="Browse"
                        menuVariant="dark"
                    >
                        <NavDropdown.Item href="/epic">EPIC</NavDropdown.Item>
                        <NavDropdown.Item href="/apod">APOD</NavDropdown.Item>
                        <NavDropdown.Item href="/mars">MRP</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="">La Xiula</NavDropdown.Item>
                    </NavDropdown>
                        <Nav.Link>ABOUT</Nav.Link>
            </Nav>
        </Navbar>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/apod' element={<Home />} />
            <Route path='/epic' element={<Epic />} />
            <Route path='/mars' element={<Mars />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
        <br />
     </>
    );
}

