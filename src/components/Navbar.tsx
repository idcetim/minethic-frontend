import { Box } from '@mui/material';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const CustomNavbar = () => {
    return (
        <Navbar bg="light" expand="lg" fixed="top">
            <Container>
                <Link href={"/"} style={{ textDecoration: 'none' }}> 
                    <Navbar.Brand>Minethic</Navbar.Brand>
                </Link> 
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link> 

                        <NavDropdown title="Consultar">
                            <Link href="/consultar-materiales" style={{ textDecoration: 'none' }}>
                                <NavDropdown.Item as={Box}>Materiales</NavDropdown.Item>
                            </Link>

                            <Link href="/consultar-procesos" style={{ textDecoration: 'none' }}>
                                <NavDropdown.Item as={Box}>Procesos</NavDropdown.Item>
                            </Link>
                        </NavDropdown>

                        <NavDropdown title="Registrar">
                            <Link href="/registrar-materiales" style={{ textDecoration: 'none' }}> 
                                <NavDropdown.Item as={Box}>Materiales</NavDropdown.Item>
                            </Link> 

                            <Link href="/registrar-procesos" style={{ textDecoration: 'none' }}> 
                                <NavDropdown.Item as={Box}>Procesos</NavDropdown.Item>
                            </Link> 
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;

