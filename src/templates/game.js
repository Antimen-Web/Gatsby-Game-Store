import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import GameData from "../components/GameData";
import GameList from "../components/GameList";
import CategoryList from "../components/CategoryList";
import { shuffleArray } from "../utils/shuffleArray";
import Rating from "../components/Rating";

const GamePage = ({ data }) => {
  const {
    h1,
    price,
    link,
    screen1,
    screen2,
    image,
    url,
    sale,
    reviews,
    rating,
    stars,
    features,
  } = data.markdownRemark.frontmatter;
  const { html } = data.markdownRemark;
  const allGames = data.allGames.nodes;
  const allCats = data.allCats.nodes.map(cat => cat.frontmatter);
  const gameUrls = allGames
    .filter(game => game.frontmatter.url.startsWith("games/game"))
    .map(game => game.frontmatter);
  const randomGames = shuffleArray(gameUrls).slice(0, 5);

  return (
    <Layout>
      <GameData
        h1={h1}
        price={price}
        link={link}
        html={html}
        screen1={screen1}
        screen2={screen2}
        screen3={image}
        game={{ h1, price, sale, image, url, reviews, rating, stars, features }}
      />
      <Rating rating={rating} reviews={reviews} stars={stars} />
      <GameList
        allGames={allGames}
        title="Featured Now"
        url="featured"
        games={randomGames}
      />
    </Layout>
  );
};

export const Head = ({ data }) => (
  <Seo title={data.markdownRemark.frontmatter.title} />
);

export default GamePage;

export const query = graphql`
  query GamePage($url: String!) {
    markdownRemark(frontmatter: { url: { eq: $url } }) {
      frontmatter {
        title
        description
        h1
        price
        sale
        categories
        reviews
        rating
        stars
        features
        image {
          childImageSharp {
            gatsbyImageData(height: 500, layout: CONSTRAINED)
          }
        }
        screen1 {
          childImageSharp {
            gatsbyImageData(height: 500, layout: CONSTRAINED)
          }
        }
        screen2 {
          childImageSharp {
            gatsbyImageData(height: 500, layout: CONSTRAINED)
          }
        }
        url
      }
      html
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
              gatsbyImageData(height: 500, layout: CONSTRAINED)
            }
          }
          url
        }
      }
    }
    allCats: allMarkdownRemark(
      filter: {
        frontmatter: { url: { ne: "" } }
        fileAbsolutePath: { regex: "/content/category/" }
      }
    ) {
      nodes {
        frontmatter {
          title
          description
          h1
          image {
            childImageSharp {
              gatsbyImageData(height: 300, layout: CONSTRAINED)
            }
          }
          url
        }
      }
    }
  }
`;
