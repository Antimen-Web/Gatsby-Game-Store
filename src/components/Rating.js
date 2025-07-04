import React from "react";
import * as styles from "../css/Rating.module.css";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import StarWhite from "../icons/Star-white.svg";
import Star from "../icons/Star.svg";

const Rating = ({ rating, stars, reviews }) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;
  return (
    <div className={`container`}>
      <h3 className={styles.h3}>Reviews</h3>
      <div className={styles.reviews}>
        <div className={styles.left}>
          <div className={styles.rating}>{rating}</div>
          <div className={styles.stars}>
            {Array(fullStars)
              .fill()
              .map((_, i) => (
                <StarWhite key={`full-${i}`} />
              ))}
            {Array(emptyStars)
              .fill()
              .map((_, i) => (
                <Star key={`empty-${i}`} />
              ))}
          </div>
          <div className={styles.review}>{reviews} Reviews</div>
        </div>
        <div className={styles.right}>
          {stars.map((star, index) => (
            <div key={index} className={styles.star}>
              {5 - index}
              <div className={styles.line}>
                <div
                  className={styles.white}
                  style={{ width: `${star}%` }}
                ></div>
              </div>
              {star}%
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rating;
