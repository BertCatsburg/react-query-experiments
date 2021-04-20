import React from 'react';
import {
    Link
} from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/planets"><button>Planets</button></Link></li>
                <li><Link to="/people"><button>People</button></Link></li>
                <li><Link to="/invalidatequery"><button>Invalidate</button></Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
