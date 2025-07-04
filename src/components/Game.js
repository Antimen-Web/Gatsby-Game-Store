import React from "react";
import * as styles from "../css/Game.module.css";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import AddToBasketBtn from "./AddToBasketBtn";
import { getDiscountedPrice } from "../utils/getDiscountedPrice";

const Game = ({ game }) => {
  const image = getImage(game.image.childImageSharp);

  return (
    <div className={styles.game}>
      <div className={styles.image}>
        <Link to={`/${game.url}`}>
          <GatsbyImage
            image={image}
            alt={game.h1}
            placeholder="none"
            loading="eager"
          />
        </Link>
        <AddToBasketBtn game={game} />
      </div>
      <div className={styles.content}>
        <Link to={`/${game.url}`} className={styles.title}>
          {game.h1}
        </Link>
        <div className={styles.tags}>
          {game.sale ? (
            <>
              {game.sale ? (
                <span className={`${styles.price}`}>
                  <span>{getDiscountedPrice(game.price, game.sale)}£</span>
                  <span className={styles.old}>{game.price}£</span>
                </span>
              ) : (
                <span className={`${styles.price}`}>{game.price}£</span>
              )}

              <span className={`${styles.price} ${styles.sale}`}>
                {game.sale}
              </span>
            </>
          ) : (
            <span className={`${styles.price}`}>{game.price}£</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
