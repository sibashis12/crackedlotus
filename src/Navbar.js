import React from 'react'
import {Link, Switch, Route, useHistory} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
        <img src="./logo.png" alt="App logo" className="logo"></img>
        <h1>Questify</h1>
        <div className="add-button">
          <Switch>
            <Route exact path="/">
              <Link to='/add'><i className="fa-solid fa-plus scoot" title="Add Task"></i>Add Task</Link>
            </Route>
            <Route path="*">
              <Link to='/'><i className="fa-solid fa-house scoot" title="Home"></i>Home</Link>
            </Route>
            </Switch>
        </div>
    </div>
  )
}

export default Navbar