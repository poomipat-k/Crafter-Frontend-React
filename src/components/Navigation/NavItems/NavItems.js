import React from 'react';

import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const navItems = props => {
    return (
    <ul className={classes.NavItems}>
        <NavItem link="/" exact >Home</NavItem>
        <NavItem link="/shop" >Shop</NavItem>
        <NavItem link="/design" >Design</NavItem>
        <NavItem link="/about" >About</NavItem>
        <NavItem link="/auth" >Log In / Sign Up</NavItem>
    </ul>
    );
}
export default navItems;