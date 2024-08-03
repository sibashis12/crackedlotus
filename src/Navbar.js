import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
        <img src="./logo.png" alt="App logo" className="logo"></img>
        <h1>Questify</h1>
        <div className="add-button">
          <Link to='/add'><i className="fa-solid fa-plus" title="Add Task"></i>Add Task</Link>
        </div>
    </div>
  )
}

export default Navbar