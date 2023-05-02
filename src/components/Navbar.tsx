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
                        <NavDropdown title="Consultar">
                            <Link href="/consultar-codigo" style={{textDecoration: 'none'}}>
                                <NavDropdown.Item as={Box}>Código</NavDropdown.Item>
                            </Link>

                            <Link href="/consultar-materiales" style={{ textDecoration: 'none' }}>
                                <NavDropdown.Item as={Box}>Materiales</NavDropdown.Item>
                            </Link>

                            <Link href="/consultar-procesos" style={{ textDecoration: 'none' }}>
                                <NavDropdown.Item as={Box}>Procesos</NavDropdown.Item>
                            </Link>
                        </NavDropdown>

                        {/* <Nav.Link href="/consultar">Consultar</Nav.Link> */}

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

