import {
  Link
} from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import icon from "./../assets/logo.png"


const Navigation = ({ account, setShowModal, isOwner }) => {
  return (
      <Navbar expand="lg" bg="dark" variant="dark">
          <Container>
              <Navbar.Brand to="/" as={Link}>
                  <img src={icon} width="40" height="40" className="" alt="" />
                  &nbsp; Car Pooling
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                      <Nav.Link as={Link} to="/">Home</Nav.Link>
                      {account && <Nav.Link as={Link} to="/bookings">My Bookings</Nav.Link>}
                      {isOwner && <Nav.Link as={Link} to="/create">Register car</Nav.Link>}
                  </Nav>
                  <Nav>
                      {account ? (
                          <Nav.Link
                              href={`https://ropsten.etherscan.io/address/${account}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="button nav-button btn-sm mx-4">
                              <Button variant="outline-light">
                                  {account.slice(0, 5) + '...' + account.slice(38, 42)}
                              </Button>

                          </Nav.Link>
                      ) : (
                          <Button variant="outline-light" onClick={() => {setShowModal(true)}}>Connect Wallet</Button>
                      )}
                  </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
  )

}

export default Navigation;