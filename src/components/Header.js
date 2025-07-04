import * as React from "react";
import { Link } from "gatsby";
import * as styles from "../css/Header.module.css";
import Cart from "../icons/Cart.svg";
import User from "../icons/User.svg";
import Burger from "../icons/Menu.svg";
import Close from "../icons/Close.svg";
import { useDispatch, useSelector } from "react-redux";
import { openLoginForm, openRegisterForm } from "../redux/slices/authSlice";
import Search from "./Search";
import { StaticImage } from "gatsby-plugin-image";
import { useState } from "react";

const Header = () => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const total = items.reduce((total, item) => total + item.quantity, 0);
  const [menu, setMenu] = useState(false);

  return (
    <header className={`${styles.header} ${menu ? styles.active : ""}`}>
      <div className="container">
        <div className={styles.header_item}>
          <Link className={styles.link} to="/">
            <StaticImage
              src="../images/logo.png"
              alt="logo"
              loading="eager"
              layout="constrained"
              className={styles.logo}
            />
            <span className={styles.title}>GameStore</span>
          </Link>
          <div className={styles.menu}>
            <Link className={styles.item} to="/category/featured">
              Featured
            </Link>
            <Link className={styles.item} to="/category/consoles">
              Consoles
            </Link>
            <Link className={styles.item} to="/category/games">
              Games
            </Link>
            <Link className={styles.item} to="/category/board-games">
              Board Games
            </Link>
          </div>
        </div>

        <div className={styles.header_item}>
          <Search />

          <div
            className={`${styles.round}`}
            onClick={() => dispatch(openRegisterForm())}
          >
            <User className={styles.svg} />
          </div>

          <Link to="/cart/" className={`${styles.round} ${styles.cart}`}>
            <Cart className={styles.svg} />
            {total > 0 ? <div className={styles.counter}>{total}</div> : ""}
          </Link>

          <div
            className={`${styles.round} ${styles.burger}`}
            onClick={() => setMenu(true)}
          >
            <Burger className={styles.svg} fill="#fff" />
          </div>
          <div
            className={`${styles.round} ${styles.close}`}
            onClick={() => setMenu(false)}
          >
            <Close className={styles.svg} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
