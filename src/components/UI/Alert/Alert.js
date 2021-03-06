import React from "react";

import "./Alert.css";
import { CSSTransition } from "react-transition-group";

const Alert = (props) => {
  return (
    <CSSTransition
      in={props.show}
      mountOnEnter
      unmountOnExit
      timeout={500}
      classNames="alert_animation"
    >
      <div className={`alert_style ${props.alertClass}`} style={props.style}>
        {props.message}
      </div>
    </CSSTransition>
  );
};

export default Alert;
