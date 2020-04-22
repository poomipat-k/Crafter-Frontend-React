import React from "react";

import "./Popover.css";

const Popover = (props) => {
  return (
    <div className="popover__wrapper">
      <a href="/">
        <h2 className="popover__title">Hover:me</h2>
      </a>
      <div className="popover__content">
        <p className="popover__message">Joseph Francis "Joey" Tribbiani, Jr.</p>
        <img
          alt="Joseph Francis Joey Tribbiani, Jr."
          src="https://media.giphy.com/media/11SIBu3s72Co8w/giphy.gif"
        />
      </div>
    </div>
  );
};

export default Popover;
