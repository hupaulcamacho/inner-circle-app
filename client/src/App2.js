import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { BrowserRouter, Route, Link } from "react-router-dom";
import './App2.css';
import Mainpage from './Components/Mainpage'
import Login from './Login'
import SignUp from './SignUp'
const App2 = () => (
    <div>
      <nav>
        <Link to="/">Mainpage</Link>
        {"  "}
        <Link to="/login">Log In</Link>
        {"  "}
        <Link to="/signup">Sign Up</Link>
      </nav>
      <div>
        <Route exact path="/" component={Mainpage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </div>
    </div>
  );

  export default App2
