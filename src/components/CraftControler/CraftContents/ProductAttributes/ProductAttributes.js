import React from 'react';

import classes from './ProductAttributes.module.css';
import Button from '../../../UI/Button/Button';

const ProductAttributes = (props) => {
    let attributeKeys = props.attributes

    let buttons = [];
    attributeKeys.forEach(itemKey => {
        buttons.push(<Button 
            key={itemKey}
            btnType="Cool"
            active={props.focusing === itemKey ? 'active' : null}
            onClick={() => props.onFocusing(itemKey)}>
                {itemKey}</Button>)
    })

    return (
        <ul className={classes.ProductAttributes}>
            {buttons}
        </ul>
    );
};

export default ProductAttributes;