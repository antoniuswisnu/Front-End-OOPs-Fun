import React from "react";
import  {Link} from 'react-router-dom';
const Nav=()=>{
    return (
        <div>
            <ul>
                <li> <Link to="/"> Test </Link> </li>
                <li> <Link to="/tes"> Test link </Link> </li>
            </ul>
        </div>
    )
}

export default Nav;