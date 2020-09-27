import React from 'react';
import Nav from './nav';
import { useHistory } from "react-router-dom";

const Navbar = () => {
    const history = useHistory();
    const href = history.location.pathname + history.location.search;

    if (!href.includes("Reader")){
        return <Nav />
    } else {
        return <></>
    }
}

export default Navbar;