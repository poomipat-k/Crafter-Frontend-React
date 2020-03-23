import React, { useState } from 'react';

import classes from './AttributeValues.module.css';
import AttributeColors from './AttributeColors/AttributeColors';
import AttributeStyles from './AttributeStyles/AttributeStyles';
import Button from '../../../UI/Button/Button';

const AttributeValues = (props) => {
    const [selectingColor, setSelectingColor] = useState(true); // change to false later

    
    const showStylesHandler = () => {
        setSelectingColor(false);
    }

    const showColorsHandler = () => {
        setSelectingColor(true);
    }

    const attrData = {...props.attributesData};

    return (
        <div className={classes.AttributeValues}>
            <Button 
                onClick={showStylesHandler} 
                btnType="Success" 
                active={!selectingColor ? 'active' : null}>
                    Style
            </Button>
            <Button 
                onClick={showColorsHandler} 
                btnType="Success"
                active={selectingColor ? 'active' : null}>
                    Color
            </Button>

            { selectingColor 
                ? <AttributeColors 
                    colors={attrData.colors}
                    focusing={props.focusing}
                    onChangeColor={props.onChangeColor}
                    /> 
                : <AttributeStyles styles={attrData.styles} />}
        </div>
    );
};

export default AttributeValues;