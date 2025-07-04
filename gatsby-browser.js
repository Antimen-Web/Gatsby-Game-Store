/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it
// В компоненте или layout
import "./src/css/slick.css";
import "./src/css/slick-theme.css";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux";

export const wrapRootElement = ({ element }) => (
  <Provider store={store}>{element}</Provider>
);

export const onRouteUpdate = () => {
  setTimeout(() => {
    for (let a of [...document.querySelectorAll("a")])
      a.href +=
        (a.href.includes("?") ? "&" : "?") + document.location.search.substr(1);
  }, 100);
};

export const shouldUpdateScroll = ({ routerProps, getSavedScrollPosition }) => {
  // Отключаем сохранение скролла при переходе
  return [0, 0];
};
