import React, { useState } from "react";

import classes from "./ImageSlide.module.scss";
import NextIcon from "../../../assets/buttonIcon/next.svg";
import BackIcon from "../../../assets/buttonIcon/back.svg";

const ImageSlide = props => {
  const IMAGES = props.images;
  const [displayImage, setDisplayImage] = useState(IMAGES[0]);
  const [slidebarRange, setSlidebarRange] = useState({
    start: 0,
    end: 3
  });

  const changeDisplayImageHandler = image => {
    setDisplayImage(image);
  };

  const nextSlidebarHandler = () => {
    setSlidebarRange(prevState => {
      if (prevState.end === IMAGES.length) {
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

  const slideBar = IMAGES.slice(slidebarRange.start, slidebarRange.end).map(
    image => {
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
    }
  );

  return (
    <React.Fragment>
      <div className={classes.Container}>
        <div className={classes.DisplayImage}>
          <img src={displayImage} alt={displayImage} />
        </div>

        <div className={classes.SlideBar}>
          {IMAGES.length > 3 && (
            <img
              onClick={backSlidebarHandler}
              className={[
                classes.ArrowButton,
                slidebarRange.start === 0 && classes.hidden
              ].join(" ")}
              src={BackIcon}
              alt="back"
            />
          )}
          {slideBar}

          {IMAGES.length > 3 && (
            <img
              onClick={nextSlidebarHandler}
              className={[
                classes.ArrowButton,
                slidebarRange.end === IMAGES.length && classes.hidden
              ].join(" ")}
              src={NextIcon}
              alt="next"
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ImageSlide;
