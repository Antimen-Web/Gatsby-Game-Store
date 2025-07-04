import * as React from "react";
import * as styles from "../css/cart.module.css";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import GameList from "../components/GameList";
import { graphql } from "gatsby";
import Basket from "../components/Basket";
import { useSelector } from "react-redux";
import { shuffleArray } from "../utils/shuffleArray";

const Cart = ({ data }) => {
  const items = useSelector(state => state.cart.items);
  const allGames = data.allGames.nodes;
  const gameUrls = allGames
    .filter(game => game.frontmatter.url.startsWith("games/game"))
    .map(game => game.frontmatter);
  const randomGames = shuffleArray(gameUrls).slice(0, 5);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Layout>
      <div className="cart">
        <div className="container">
          <div className={styles.header}>
            <h1>Shopping Cart</h1>
          </div>
        </div>
        <Basket />
        <GameList
          allGames={allGames}
          title="Featured Now"
          games={randomGames}
        />
      </div>
    </Layout>
  );
};

export const Head = ({ data }) => (
  <Seo title={data.markdownRemark.frontmatter.title} />
);

export default Cart;
export const query = graphql`
  query CartQuery($url: String) {
    markdownRemark(frontmatter: { url: { eq: $url } }) {
      frontmatter {
        title
        h1
      }
    }
    allGames: allMarkdownRemark(filter: { frontmatter: { url: { ne: "" } } }) {
      nodes {
        frontmatter {
          title
          description
          h1
          price
          sale
          categories
          image {
            childImageSharp {
              gatsbyImageData(height: 247, layout: CONSTRAINED)
            }
          }
          url
        }
      }
    }
  }
`;
