import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import NavBar from './components/navbar.js'
import Login from './components/login.js';
import Signup from './components/signup.js';
import NewAppt from './components/newappt.js';
import Home from './components/home.js';
import Appt from './components/appt.js';

function App() {
  //const history = useHistory();

  return ( 
    <Router>
      <div className="App container py-3">
          {NavBar()}
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