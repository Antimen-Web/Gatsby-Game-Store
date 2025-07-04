import React from "react";
import * as styles from "../css/CategoryList.module.css";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

const CategoryList = ({ categories }) => {
  return (
    <div className={`container`}>
      <h3 className={styles.h3}>Browse by Category</h3>
      <div className={styles.cats}>
        {categories.map((cat, index) => {
          const image = getImage(cat.image.childImageSharp);
          return (
            <Link to={`/${cat.url}`} className={styles.cat} key={index}>
              <div className={styles.image}>
                <GatsbyImage image={image} alt={cat.h1} />
              </div>
              <div className={styles.title}>{cat.h1}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
