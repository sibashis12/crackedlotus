import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div class="navbar">
        <img src="./logo.png" alt="App logo" class="logo"></img>
        <h1>Questify</h1>
        <div class="add-button">
          <Link to='/add'><i class="fa-solid fa-plus" title="Add Task"></i>Add Task</Link>
        </div>
    </div>
  )
}

export default Navbar