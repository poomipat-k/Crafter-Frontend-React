import React from 'react';
import Polo1 from './Polo1';

const PoloSVG = (props) => {
    let pocketStyle = null;
    if (props.canvasData.pocket) {
        pocketStyle = `.Polo-pocket{fill: ${props.canvasData.pocket.colors}}`
    }
 
    return (
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
            viewBox="0 0 373.9 411.8">
            <style type="text/css">{`
                .Polo-shadow{opacity:0.3;}
                .Polo-sleeve-shadow-wrap{opacity:0.6;}
                .Polo-sleeve-shadow{fill:#D6D7DD;}

                .Polo-inner-collar{fill: ${props.canvasData.body.colors}; opacity: 0.3}
                .Polo-body{fill: ${props.canvasData.body.colors};}
                .Polo-collar{fill: ${props.canvasData.collar.colors};}
                .Polo-placket{fill: ${props.canvasData.placket.colors};}
                .Polo-sleeveEdge{fill: ${props.canvasData.sleeveEdge.colors};}
                .Polo-button{fill: ${props.canvasData.button.colors};}
                
                ${pocketStyle}
                `}
            </style>
            <Polo1 />
        </svg>
        );
}

export default PoloSVG;
