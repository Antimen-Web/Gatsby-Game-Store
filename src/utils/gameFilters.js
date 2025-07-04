// Функция фильтрации
import { SORT_OPTIONS } from "./constants";
import { getDiscountedPrice } from "./getDiscountedPrice";

export const filterGames = (games, filterOnSale) => {
  return filterOnSale ? games.filter(game => game.frontmatter.sale) : games;
};

// Функция сортировки
export const sortGames = (games, sortBy) => {
  switch (sortBy) {
    case SORT_OPTIONS.PRICE_ASC:
      return [...games].sort(
        (a, b) =>
          (getDiscountedPrice(a.frontmatter.price) ||
            getDiscountedPrice(a.frontmatter.price)) -
          (getDiscountedPrice(b.frontmatter.price) ||
            getDiscountedPrice(b.frontmatter.price))
      );
    case SORT_OPTIONS.PRICE_DESC:
      return [...games].sort(
        (a, b) =>
          (getDiscountedPrice(b.frontmatter.price) ||
            getDiscountedPrice(b.frontmatter.price)) -
          (getDiscountedPrice(a.frontmatter.price) ||
            getDiscountedPrice(a.frontmatter.price))
      );
    case SORT_OPTIONS.TITLE_ASC:
      return [...games].sort((a, b) =>
        a.frontmatter.title.localeCompare(b.frontmatter.title)
      );
    case SORT_OPTIONS.TITLE_DESC:
      return [...games].sort((a, b) =>
        b.frontmatter.title.localeCompare(a.frontmatter.title)
      );
    default:
      return games;
  }
};
