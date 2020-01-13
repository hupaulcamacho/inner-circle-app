import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Switch, Route, Link } from "react-router-dom";
import './App2.css';
import Mainpage from './Components/Mainpage'
import Login from './Login'
import SignUp from './SignUp'
class App2 extends React.Component {
  render() {
    return(
      <div>
        <nav>
          <Link to="/">Mainpage</Link>
          {"  "}
          <Link to="/login">Log In</Link>
         {"  "}
          <Link to="/signup">Sign Up</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Mainpage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp}/>
        </Switch>
      </div>
  
    );
  }
  
}
    

  export default App2
