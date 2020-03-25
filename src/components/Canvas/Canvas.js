import React from 'react';
import { connect } from 'react-redux';

import PoloSVG from './PoloSVG/PoloSVG';


const Canvas = (props) => <PoloSVG canvasData={props.canvas}/>;

const mapStateToProps = state => {
    return {
        canvas: state.design.canvas
    }
}

export default connect(mapStateToProps)(Canvas);
