import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./Design.module.css";
import Canvas from "../../components/Canvas/Canvas";
import CraftControler from "../../components/CraftControler/CraftControler";
import ErrorModal from "../../components/UI/Modal/ErrorModal";
import LoadingSpinner from "../../components/UI/LodingSpinner/LoadingSpinner";
import * as actions from "../../store/action/index";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Design = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const dispatch = useDispatch();
  const { canvas, content } = useSelector((state) => state.design);

  const fetchDesignData = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/design/polo/1/cotton`
      );
      dispatch(actions.setDesignTemplate(responseData));
    } catch (err) {}
  }, [sendRequest, dispatch]);

  useEffect(() => {
    fetchDesignData();
  }, [fetchDesignData]);

  let designTemplate;
  if (content && canvas) {
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
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {designTemplate}
      <h1 className="center">Under developing by Poomipat Khamai.</h1>
    </React.Fragment>
  );
};

export default Design;
