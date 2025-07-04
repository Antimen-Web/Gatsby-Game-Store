import React from "react";
import * as styles from "../css/GameFilters.module.css";

const GameFilters = ({ filterOnSale, setFilterOnSale, sortBy, setSortBy }) => {
  return (
    <div className="container">
      <div className={styles.filters}>
        <div className={styles.sale_filter}>
          <label>
            <input
              type="checkbox"
              checked={filterOnSale}
              onChange={() => setFilterOnSale(!filterOnSale)}
            />
            <span className={styles.checkbox}></span>
            On sale only
          </label>
        </div>

        <div className={styles.sorting}>
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className={styles.sortingSelect}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price (low to high)</option>
            <option value="price-desc">Price (high to low)</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default GameFilters;
