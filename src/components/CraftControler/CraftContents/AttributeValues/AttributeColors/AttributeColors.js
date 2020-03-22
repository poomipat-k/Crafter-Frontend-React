import React from 'react';

import classes from './AttributeColors.module.css';
import ColorBox from './ColorBox/ColorBox';

const AttributeColors = (props) => {

    let colorBoxes = [];
    if (props.colors) {
        const focusing = props.focusing;
        props.colors.forEach(color => {
            colorBoxes.push(<ColorBox 
                key={color} 
                color={color}
                clicked={() => props.onChangeColor(focusing, color)}
                >
                    id</ColorBox>)
        })
    } else {
        colorBoxes = null;
    }
    return (
        <div>
            <div className={classes.ColorsWrapper}>
                {colorBoxes}
            </div>
        </div>
    );
};

export default AttributeColors;