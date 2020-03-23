import React from 'react';

import classes from './Button.module.css';

const Button = props => {
    return (
    <button 
        className={[classes.Button, classes[props.btnType], classes[props.active]].join(' ')}
        disabled={props.disabled}
        onClick={props.onClick}
        >
            {props.children}
    </button>
)};

export default Button;