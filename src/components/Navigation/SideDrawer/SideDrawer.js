import React from 'react';

import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = props => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <React.Fragment>
            {props.open && <Backdrop onClick={props.closed}/>}
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems />
                </nav>
            </div>
        </React.Fragment>
    );
}

export default SideDrawer;