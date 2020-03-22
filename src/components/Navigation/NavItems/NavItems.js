import React from 'react';

import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';
import { withRouter } from 'react-router-dom';

const navItems = props => {
    return (
    <ul className={classes.NavItems}>
        <NavItem link="/" exact {...props}>Home</NavItem>
        <NavItem link="/shop" {...props}>Shop</NavItem>
        <NavItem link="/design" {...props}>Design</NavItem>
        <NavItem link="/about" {...props}>About</NavItem>
        <NavItem link="/auth" {...props}>Log In / Sign Up</NavItem>
    </ul>
    );
}
export default withRouter(navItems);