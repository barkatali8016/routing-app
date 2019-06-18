import React, { Component } from 'react'
import {NavLink}from 'react-router-dom'
 class Navbar extends Component {
  render() {
    return (
      <div>
            <NavLink to='/'>Login</NavLink>
            <NavLink to='/register'>Register</NavLink>
            <NavLink to='/aboutus'>About Us</NavLink>   
            <NavLink to='/support'>Support</NavLink>
          
      </div>
    )
  }
}

export default Navbar
