import React from "react";

import "./Alert.css";
import { CSSTransition } from "react-transition-group";

const Alert = props => {
  return (
    <CSSTransition
      in={props.showSuccessAlert}
      mountOnEnter
      unmountOnExit
      timeout={500}
      classNames="alert_animation"
    >
      <div className="alert_style">{props.message}</div>
    </CSSTransition>
  );
};

export default Alert;
