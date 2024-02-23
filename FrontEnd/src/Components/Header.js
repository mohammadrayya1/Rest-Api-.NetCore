import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { User } from "../Context/UserProvider";
import { useContext } from "react";
export default function Header() {
  const usercontect = useContext(User);

  const removelocalstoreg = () => {
    window.localStorage.removeItem("email");
    window.location.pathname = "/home";
  };
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/features" className="nav-link">
              Features
            </Link>
            <Link to="/pricing" className="nav-link">
              Pricing
            </Link>
          </Nav>
          {!usercontect.auth ? (
            <Nav>
              <Link to="/login" className="nav-link" style={{ color: "white" }}>
                Login
              </Link>
              <Link
                to="/signup"
                className="nav-link"
                style={{ color: "white" }}
              >
                Sign Up
              </Link>
            </Nav>
          ) : (
            <button
              onClick={removelocalstoreg}
              className="nav-link"
              style={{ color: "white", background: "none", border: "none" }}
            >
              Logout
            </button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
