import React from "react";
import * as styles from "../css/GameList.module.css";
import Game from "./Game";
import Right from "../icons/Right.svg";
import { Link } from "gatsby";

const GameList = ({ allGames, title, games, index, cat, url }) => {
  // Функция для поиска игры по `url`
  const findGameTitle = gameUrl => {
    const game = allGames.find(g => g.frontmatter.url === gameUrl);
    return game ? game.frontmatter : gameUrl;
  };

  return (
    <div
      id={`list${index}`}
      className={`${styles.wrapper} container ${cat ? styles.cat : ""}`}
    >
      {title ? (
        <div className={styles.header}>
          <div className={styles.h2}>
            <h3>{title}</h3>
          </div>
          {url ? (
            <Link to={`/category/${url}`} className="btn">
              More
            </Link>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      <div className={styles.game_list}>
        {games.map((gameUrl, index) => {
          return (
            <Game
              game={allGames ? findGameTitle(gameUrl) : gameUrl}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GameList;
