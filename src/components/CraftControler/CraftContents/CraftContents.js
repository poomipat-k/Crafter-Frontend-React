import React from 'react';
import { connect } from 'react-redux';

import classes from './CraftContents.module.css';
import ProductAttributes from './ProductAttributes/ProductAttributes';
import AttributeValues from './AttributeValues/AttributeValues';
import * as actions from '../../../store/action/index';

const CraftContents = (props) => {
    const designAttributes = {...props.attributes}
    const attributeKeys = Object.keys(designAttributes);
    const currentFocus = props.focusing;
    
    return (
        <div className={classes.CraftContentsContainer}>
            <ProductAttributes 
                attributes={attributeKeys}
                focusing={currentFocus}
                onFocusing={props.onFocusing}/>
            <AttributeValues 
                attributesData={designAttributes[currentFocus]}
                focusing={currentFocus}
                onChangeColor={props.onChangeColorHandler}
                />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        attributes: state.design.content,
        focusing: state.design.focusing,
        canvas: state.design.canvas
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeColorHandler: (focus, color) => dispatch(actions.setFocusColor(focus, color)),
        onFocusing: (id) => dispatch(actions.setFocus(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CraftContents);