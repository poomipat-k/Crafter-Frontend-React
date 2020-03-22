import React from 'react';

import classes from './CraftHeaders.module.css';
import CraftHeader from './CraftHeader/CraftHeader';

const CraftHeaders = (props) => {
    return (
        <div className={classes.CraftHeadersContainer}>
            <CraftHeader>Polo</CraftHeader>
            <CraftHeader>Pattern</CraftHeader>
            <CraftHeader>Material</CraftHeader>

        </div>
    );
};

export default CraftHeaders;