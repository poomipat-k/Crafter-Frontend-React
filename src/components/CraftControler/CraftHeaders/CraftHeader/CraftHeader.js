import React from 'react';

import classes from './CraftHeader.module.css';

const CraftHeader = (props) => {
    return (
            <button 
                className={classes.CraftHeader}>
                    {props.children}
            </button>
    );
};

export default CraftHeader;