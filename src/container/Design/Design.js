import React, { useEffect } from "react";
import { connect } from "react-redux";

import classes from "./Design.module.css";
import Canvas from "../../components/Canvas/Canvas";
import CraftControler from "../../components/CraftControler/CraftControler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/action/index";

const Design = props => {
  const { onGetDesignTemplate } = props;

  useEffect(() => {
    console.log("useEffect call api");
    let url = `http://localhost:5000/api/design/polo/1/cotton`;
    onGetDesignTemplate(url);
  }, [onGetDesignTemplate]);

  let designTemplate = props.error ? (
    <h1 style={{ textAlign: "center" }}>
      Error: <br />
      Can not load design template from Server!
      <br /> Please try again in a moment
    </h1>
  ) : (
    <Spinner />
  );

  if (props.content && props.canvas) {
    designTemplate = (
      <div className={classes.DesignLayout}>
        <div className={classes.Canvas}>
          <Canvas />
        </div>
        <div className={classes.CraftControl}>
          <CraftControler />
        </div>
      </div>
    );
  }
  return designTemplate;
};

const mapStateToProps = state => {
  return {
    error: state.design.error,
    content: state.design.content,
    canvas: state.design.canvas
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetDesignTemplate: url => dispatch(actions.getDesignTemplate(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Design);
