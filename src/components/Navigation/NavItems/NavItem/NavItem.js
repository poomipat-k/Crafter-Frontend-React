import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavItem.module.css';
const navItem = props => {
    // let isActive = null
    // if (props.link === '/') {
    //     isActive = props.history.location.pathname === '/';
    // } else {
    //     isActive = props.history.location.pathname.includes(props.link);
    // }
    return (
        <li className={classes.NavItem}>
            <NavLink 
                to={props.link}
                exact={props.exact}
                // className={isActive ? classes.active : null}
                activeClassName={classes.active}
                >
                    {props.children}
            </NavLink>
        </li>
);}

export default navItem;