import React from "react";
import { useDispatch } from "react-redux";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Check from "../icons/Check.svg";
import Close from "../icons/Close.svg";
import * as styles from "../css/Basket.module.css";
import { changeQuantity, removeFromCart } from "../redux/slices/cartSlice";
import { getDiscountedPrice } from "../utils/getDiscountedPrice";
import { roundToTwo } from "../utils/roundToTwo";

const BasketItem = ({ game, quantity, isSelected, onToggle }) => {
  const dispatch = useDispatch();
  const image = getImage(game.image.childImageSharp);

  const itemFinal = getDiscountedPrice(game.price, game.sale) * quantity;
  const itemOriginal = game.price * quantity;

  return (
    <div className={`${styles.elem} ${styles.game}`}>
      <div className={styles.left}>
        <Check
          stroke="#fff"
          className={`${styles.icon} ${isSelected ? styles.selected : ""}`}
          onClick={() => onToggle(game.url)}
        />
        {image && (
          <GatsbyImage
            image={image}
            alt={game.title}
            className={styles.image}
          />
        )}
        <div className={styles.info}>
          <h4 className={styles.title}>{game.h1}</h4>
          <div className={styles.prices}>
            <div className={styles.header}>{roundToTwo(itemFinal)}£</div>
            {game.sale && (
              <div className={`${styles.header} ${styles.sale}`}>
                {roundToTwo(itemOriginal)}£
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.price}>
          <div className={styles.count}>
            <span
              onClick={() =>
                dispatch(
                  changeQuantity({
                    url: game.url,
                    quantity: Math.max(1, quantity - 1),
                  })
                )
              }
            >
              −
            </span>
            <span>{quantity}</span>
            <span
              onClick={() =>
                dispatch(
                  changeQuantity({
                    url: game.url,
                    quantity: quantity + 1,
                  })
                )
              }
            >
              +
            </span>
          </div>
        </div>

        <Close
          className={`${styles.close} ${styles.icon}`}
          stroke="#9C9C9C"
          onClick={() => dispatch(removeFromCart(game.url))}
        />
      </div>
    </div>
  );
};

export default BasketItem;
