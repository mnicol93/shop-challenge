import { Navbar, Container, Nav } from "react-bootstrap";

import './NavBar.css';

function NavBar(){
    return(
        <Navbar bg="primary" variant="light">
            <Container>
                <Navbar.Brand href="#">SPACEGRAM</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#home">Browse</Nav.Link>
                    <Nav.Link href="#home">ABOUT</Nav.Link>                
                </Nav>
            </Container>
            <hr style={{backgroundColor: "white"}}></hr>
        </Navbar>
    );
}

export default NavBar;