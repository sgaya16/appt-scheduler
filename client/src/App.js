import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login.js';
import Signup from './components/signup.js';
import NewAppt from './components/newappt.js';
import Home from './components/home.js';
import Appt from './components/appt.js';

function App() {

  return ( 
    <Router>
      <div className="App container py-3">
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
            </Nav>
          </Navbar.Collapse>
        </Navbar>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/newappt" component={NewAppt} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/appt/:id" component={Appt}></Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;