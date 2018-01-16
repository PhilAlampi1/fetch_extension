import React from 'react'
import { Link, Prompt } from 'react-router-dom'

const Header = () => (
    <div>
        <span>
            <Link to='/main'><h1>Fetch</h1></Link>
            {/* <Link to='/'>
                <h1>Fetch</h1>
            </Link>
            <Link to='/importfile'>Import</Link>
            <Link to='/results'>TEMPResults</Link> */}
        </span>
    </div>
)

export default Header