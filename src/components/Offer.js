import React, { useState } from "react";
import * as styles from "../css/Offer.module.css";
import { StaticImage } from "gatsby-plugin-image";

const Offer = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    await fetch("/api/promocode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    // Показываем сообщение и очищаем форму
    setSuccessMessage("Subscription successful!");
    setEmail("");

    // Скрываем сообщение через 3 секунды
    setTimeout(() => setSuccessMessage(""), 3000);
  };
  return (
    <div className={`container ${styles.offer}`}>
      <div className={styles.content}>
        <div>
          <h2 className={styles.h2}>Exclusive Discount</h2>
          <h3 className={styles.h3}>For New Customers</h3>
        </div>
        <p className={styles.text}>
          Sing up to receive special offers on consoles, games, board games, and
          accessories
        </p>
        <form
          method="POST"
          action="/promocode"
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <div className={styles.btns}>
            <input
              type="email"
              placeholder="Enter Your Email..."
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className={styles.input}
            />

            <button type="submit" className="btn gray">
              {successMessage ? (
                <div className={styles.btn}>YOUR DISCOUNT IS ON ITS WAY</div>
              ) : (
                "Get Discount"
              )}
            </button>
          </div>
        </form>
      </div>
      <div className={styles.logo}>
        <StaticImage
          src="../images/back.png"
          alt="gift"
          imgStyle={{ width: "100%", height: "auto" }}
          className={styles.image}
          layout="constrained"
        />
      </div>
    </div>
  );
};

export default Offer;
