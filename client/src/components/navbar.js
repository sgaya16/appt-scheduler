import { Navbar, Nav } from "react-bootstrap";

  export default function NavBar() {

    function logOut(event) {
        event.preventDefault();
        localStorage.clear();
        window.location = "/login";
    }

    return (
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
          <Navbar.Brand href="/" className="font-weight-bold text-muted">
            Appointment Scheduler
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/newappt">New Appt</Nav.Link>
              <Nav.Link href="/signup">Signup</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link onClick={logOut}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }