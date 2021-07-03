import React from 'react'
//  linking css (main tarika bad me)
import './nav.css'
// react ka anchor tag
import {Link} from 'react-router-dom'
function Nav() {
    return (
        // class = className in react
        <nav className='nav-class'>
            <h1>Logo</h1>
            <ul className="list">
                {/* to = ext */}
                <Link to='/'><li>Home</li></Link>
                <Link to='/about'><li>About</li></Link>
                <Link to='/movies'><li>Movies</li></Link>
            </ul>
        </nav>
    )
}

export default Nav
