import React from 'react';
import {NavLink} from 'react-router-dom';

const nav = (props) => {

  const styleA = {
    paddingLeft: '20px'
  }

  const styleNav = {
    paddingTop: '5px',
    boxShadow: '5px 10px'
  }

  return(
    <div>
      <nav style={styleNav}>
        {!props.isAuth
        ? <NavLink style={styleA} to="/login">Login</NavLink> :
          <NavLink style={styleA} to="/logout">Logout</NavLink>
        }
        <NavLink style={styleA} to="/">TimeKeeper</NavLink>
        <NavLink style={styleA} to="/past">Past Tasks</NavLink>
      </nav>
    </div>
  )
}

export default nav;
