import React from 'react';

import classes from './ColorBox.module.css';

const ColorBox = (props) => {
    return (
            <span 
                title={props.children} 
                className={classes.ColorBox} 
                style={{backgroundColor: props.color}}
                onClick={props.clicked}>
                    {props.children}</span>
    );
};

export default ColorBox;