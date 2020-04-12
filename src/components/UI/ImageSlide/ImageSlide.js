import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import * as actions from "../../../store/action/index";
import classes from "./ImageSlide.module.scss";
import NextIcon from "../../../assets/buttonIcon/next.svg";
import BackIcon from "../../../assets/buttonIcon/back.svg";

const ImageSlide = props => {
  const { images } = props;
  const [imageArray, setImageArray] = useState(images);
  const [displayImage, setDisplayImage] = useState(images[0]);
  const [slidebarRange, setSlidebarRange] = useState({
    start: 0,
    end: 3
  });
  
  const dispatch = useDispatch();

  const onSetDisplayImage = useCallback(
    img => dispatch(actions.setDisplayImage(img)),
    [dispatch]
  );

  useEffect(() => {
    setImageArray(images);
    setDisplayImage(images[0])
  }, [images]);

  useEffect(() => {
    //save data to redux when displayImage value change and get the image in the parent component
    onSetDisplayImage(displayImage);
  }, [onSetDisplayImage, displayImage]);

  const changeDisplayImageHandler = image => {
    setDisplayImage(image);
  };

  const nextSlidebarHandler = () => {
    setSlidebarRange(prevState => {
      if (prevState.end === imageArray.length) {
        return prevState;
      }
      return {
        start: prevState.start + 1,
        end: prevState.end + 1
      };
    });
  };

  const backSlidebarHandler = () => {
    setSlidebarRange(prevState => {
      if (prevState.start === 0) {
        return prevState;
      }
      return {
        start: prevState.start - 1,
        end: prevState.end - 1
      };
    });
  };

  let slideBar, back, next;
  if (imageArray) {
    slideBar = imageArray
      .slice(slidebarRange.start, slidebarRange.end)
      .map(image => {
        return (
          <div
            key={image}
            className={[
              classes.SlideItem,
              displayImage === image && classes.activeSlideItem
            ].join(" ")}
            onMouseEnter={() => changeDisplayImageHandler(image)}
          >
            <img onLoad={function() {}} src={image} alt={image} />
          </div>
        );
      });

    back = imageArray.length > 3 && (
      <img
        onClick={backSlidebarHandler}
        className={[
          classes.ArrowButton,
          slidebarRange.start === 0 && classes.hidden
        ].join(" ")}
        src={BackIcon}
        alt="back"
      />
    );

    next = imageArray.length > 3 && (
      <img
        onClick={nextSlidebarHandler}
        className={[
          classes.ArrowButton,
          slidebarRange.end === imageArray.length && classes.hidden
        ].join(" ")}
        src={NextIcon}
        alt="next"
      />
    );
  }

  return (
      <div className={classes.Container}>
        <div className={classes.DisplayImage}>
          <img src={displayImage} alt={displayImage} />
        </div>

        <div className={classes.SlideBar}>

          {back}
          {slideBar}
          {next}

        </div>
      </div>
  );
};

export default ImageSlide;
