import React from 'react';

import classes from './CraftControler.module.css';
import CraftHeaders from './CraftHeaders/CraftHeaders';
import CraftContents from './CraftContents/CraftContents';

const CraftControler = (props) => {


    
    return (
        <div className={classes.CraftControler}>
            <CraftHeaders />
            <CraftContents />  
        </div>
    );
};

export default CraftControler;