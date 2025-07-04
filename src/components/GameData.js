import React, { useState } from "react";
import * as styles from "../css/GameData.module.css";
import SliderCard from "./SliderCard";
import AddToBasketBtn from "./AddToBasketBtn";
import { getDiscountedPrice } from "../utils/getDiscountedPrice";
import Star from "../icons/Star.svg";
import StarWhite from "../icons/Star-white.svg";
import Check from "../icons/Check.svg";
import Cart from "../icons/Cart.svg";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const GameData = ({ h1, html, screen1, screen2, screen3, game }) => {
  const fullStars = Math.floor(game.rating);
  const emptyStars = 5 - fullStars;
  const dispatch = useDispatch();
  const [Added, setAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(game));
    setAdded(true);
  };
  return (
    <div className="container">
      <div className={styles.game}>
        <div className={styles.data}>
          <SliderCard screen1={screen1} screen2={screen2} screen3={screen3} />
          <div className={`${styles.info}`}>
            <h1 className={styles.h1}>{h1}</h1>
            <div className={styles.rating}>
              {game.rating}
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
              <span className={styles.reviews}>({game.reviews})</span>
            </div>
            <div className={`${styles.basket}  ${styles.mob}`}>
              {game.sale ? (
                <span className={`${styles.price}`}>
                  <span>{getDiscountedPrice(game.price, game.sale)}£</span>
                  <span className={styles.old}>{game.price}£</span>
                </span>
              ) : (
                <span className={`${styles.price}`}>{game.price}£</span>
              )}
              <div className={`btn ${styles.btn}`} onClick={handleAddToCart}>
                {Added ? "Added" : "Add to Basket"}
              </div>
              <div className={styles.shipping}>
                Shipping<span className={styles.free}>Free</span>
              </div>
            </div>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <div className={styles.features}>
              <div className={styles.title}>Key Features:</div>
              <ul>
                {game.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={`${styles.basket}  ${styles.desk}`}>
            {game.sale ? (
              <span className={`${styles.price}`}>
                <span>{getDiscountedPrice(game.price, game.sale)}£</span>
                <span className={styles.old}>{game.price}£</span>
              </span>
            ) : (
              <span className={`${styles.price}`}>{game.price}£</span>
            )}
            <div className={`btn ${styles.btn}`} onClick={handleAddToCart}>
              {Added ? "Added" : "Add to Basket"}
            </div>
            <div className={styles.shipping}>
              Shipping<span className={styles.free}>Free</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameData;
