import React, { useState, useEffect } from "react";
/* Style */
import "./btntop.scss";

const BtnTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300 && !isVisible) {
        setIsVisible(true);
      }
      if (!window.pageYOffset && isVisible) setIsVisible(false);
    });
    return window.removeEventListener("scroll", () => {});
  }, [isVisible]);

  const backToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <>
      <button
        className="btn-top"
        onClick={backToTop}
        style={{ display: isVisible ? "block" : "none" }}
      >
        Top
      </button>
    </>
  );
};

export default BtnTop;
