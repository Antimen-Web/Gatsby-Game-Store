import React, { useState } from "react";
import * as styles from "../css/ContactForm.module.css";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setSuccessMessage("We will contact you soon!");
    setEmail("");

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div>
      <h3 className={styles.h3}>Submit Your Order Request</h3>
      <form
        method="POST"
        action="/newsletter"
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <p className={styles.description}>
          Want to get your hands on this? Leave your contact info and we'll
          reach out with everything you need to finalize your order. Quick.
          Easy. No pressure.
        </p>
        <div className={styles.btns}>
          <input
            type="email"
            placeholder="Enter Your Email..."
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className="btn gray">
            MAKE AN ORDER
          </button>
        </div>
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
