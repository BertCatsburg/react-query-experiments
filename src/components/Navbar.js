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
                <li><Link to="/querycacheplay"><button>Query-Cache-Plays</button></Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
