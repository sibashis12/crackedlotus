import React from 'react'
import {Link} from 'react-router-dom';
const NotFound = () => {
  return (
    <div class="container">
        <div className="color-filler hide"></div>
        <div>
            <h2 className="header">Page Not Found</h2>
            <p>Uh Oh! The page you are looking for does not exist.</p>
            <div className="center">
                <button className="button"><Link to="/">Home</Link></button>
            </div>
        </div>
        <div className="color-filler hide"></div>
    </div>
  )
}

export default NotFound