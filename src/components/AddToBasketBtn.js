import React, { useState } from "react";
import * as styles from "../css/AddToBasketBtn.module.css";
import Cart from "../icons/Cart.svg";
import Check from "../icons/Check.svg";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const AddToBasketBtn = ({ game }) => {
  const dispatch = useDispatch();
  const [Added, setAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(game));
    setAdded(true);
  };
  return (
    <div
      className={`${styles.btn} ${Added ? styles.added : ""}`}
      onClick={handleAddToCart}
    >
      {Added ? <Check /> : <Cart />}
    </div>
  );
};

export default AddToBasketBtn;
