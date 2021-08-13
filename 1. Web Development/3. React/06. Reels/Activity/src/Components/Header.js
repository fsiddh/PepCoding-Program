import { Button } from '@material-ui/core'
import { flexbox } from '@material-ui/system';
import React from 'react'
import { useContext } from 'react';
import {AuthContext} from '../Context/AuthProvider';
function Header() {
     const {logout} =useContext(AuthContext);
    return (
        <nav class="navbar navbar-light bg-light" style={{padding:"10px"}}>
            <div style={{fontFamily: 'Style Script,cursive',fontSize:"20px"}}>
                Reels
            </div>
            <div>
                <Button variant="contained" component='span' 
                size='medium' color="primary" onClick={logout}>
                    Logout
                </Button>
            </div>
		</nav>
    
    )
}

export default Header
