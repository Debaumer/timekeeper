import React, { Component } from 'react';
import classes from './App.css';
import Nav from './Components/Nav';
import {Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import Logout from './Containers/Auth/Logout';
import Analytics from './Containers/Analytics';
import ToDo from './Containers/ToDo';
import Goals from './Containers/Goals';
import OldTask from './Containers/OldTask';
import * as actions from './store/actions/index';

import ClockContainer from './Containers/ClockContainer/ClockContainer';
import Auth from './Containers/Auth/Auth';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div className={classes.App}>
        <Nav
          isAuth={this.props.isAuthenticated}
        />
      <Switch>
        <Route path="/login" component={Auth} />
        <Route path="/logout" component={Logout} />
        <Route path="/todo" component={ToDo} />
        {this.props.isAuthenticated ? <Route path="/past" component={OldTask} /> : null}
        <Route path="/goals" component={Goals} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/" exact component={ClockContainer} />
        <Redirect from="/" to="/" />
      </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
