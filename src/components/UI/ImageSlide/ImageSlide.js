import React, { useState } from "react";

import classes from "./ImageSlide.module.scss";

import NextIcon from "../../../assets/buttonIcon/next.svg";
import BackIcon from "../../../assets/buttonIcon/back.svg";

const IMAGES = [
  "https://cache.mrporter.com/variants/images/11813139151092701/in/w2000_q80.jpg",
  "https://www.aiiz.com/Product/ss19/Men/MD53BF-B6CW01_MODEL2.jpg",
  "https://www.levis.co.th/en/media/catalog/product/cache/image/700x560/e9c3970ab036de70892d86c6d221abfe/2/2/224010102_1.jpg",
  "https://images.giordano.com/materiel/GIO/CN/workpage/THSHOP/PC/MEN/MENHOME-GIO_20171120/POLOS.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJNE49ncwlcmJSqe-0a1L5aTDm8JrgNkBfvVGDiUlpSENWFusc",
  "https://www.12tees.com/assets/img/polobanner.jpg",
  "https://www.levis.co.th/media/catalog/product/cache/image/700x560/e9c3970ab036de70892d86c6d221abfe/5/8/588590016_1_1000x1000_2.jpg"
];

const ImageSlide = () => {
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
    <div className={classes.Container}>
      <div className={classes.DisplayImage}>
        <img src={displayImage} alt={displayImage} />
      </div>

      <div className={classes.SlideBar}>

          <img
            onClick={backSlidebarHandler}
            className={[classes.ArrowButton, (slidebarRange.start === 0 && classes.hidden)].join(' ')}
            src={BackIcon}
            alt="back"
          />

        {slideBar}

          <img
            onClick={nextSlidebarHandler}
            className={[classes.ArrowButton, (slidebarRange.end === IMAGES.length && classes.hidden)].join(' ')}
            src={NextIcon}
            alt="next"
          />

      </div>
    </div>
  );
};

export default ImageSlide;
