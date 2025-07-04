import * as styles from "../css/SliderMain.module.css";
import React, { useRef, useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Slider from "react-slick";

const SliderCard = ({ screen1, screen2, screen3 }) => {
  const thumbSliderRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [screen1, screen2, screen3];

  const thumbSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    vertical: true,
    arrows: false,
    autoplay: true,
    centerPadding: "100px",
    beforeChange: (_, newIndex) => {
      setCurrentImageIndex(newIndex);
    },
  };

  return (
    <div className={styles.slide}>
      <Slider
        ref={thumbSliderRef}
        {...thumbSettings}
        className={styles.thumbSlider}
      >
        {images.map((screenshot, index) => (
          <div
            key={index}
            className={styles.thumb}
            onClick={() => setCurrentImageIndex(index)}
          >
            <GatsbyImage
              image={getImage(screenshot)}
              alt={`screenshot ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
      <GatsbyImage
        image={getImage(images[currentImageIndex])}
        alt="screenshot"
        className={styles.current_image}
      />
    </div>
  );
};

export default SliderCard;
