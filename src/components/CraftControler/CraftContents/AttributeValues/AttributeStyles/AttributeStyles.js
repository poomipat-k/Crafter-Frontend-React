import React from 'react';

import classes from './AttributeStyles.module.css';

const AttributeStyles = (props) => {

    let styleItems = [];
    if (props.styles) {
        props.styles.forEach(style => {
            styleItems.push(<span 
                    key={style}
                    className={classes.StyleItem}
                    >{style}</span>)
        });
    } else {
        styleItems = null;
    }
    return (
        <div>
            <div className={classes.AttributeStyles}>
                {styleItems}
            </div>
        </div>
    );
};

export default AttributeStyles;