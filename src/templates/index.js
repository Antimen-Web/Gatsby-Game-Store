import * as React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import GameList from "../components/GameList";
import Offer from "../components/Offer";
import CategoryList from "../components/CategoryList";
import InfoList from "../components/InfoList";

const IndexPage = ({ data }) => {
  const { h1, games, info } = data.markdownRemark.frontmatter;
  const allGames = data.allGames.nodes; // Все игры с заголовками
  const allCats = data.allCats.nodes.map(cat => cat.frontmatter);
  return (
    <Layout>
      <h1>{h1}</h1>
      <Offer />
      {games.map((category, index) => (
        <GameList
          allGames={allGames}
          title={category.title}
          url={category.url}
          games={category.items}
          index={index}
          key={index}
        />
      ))}
      <CategoryList categories={allCats} />
      <InfoList info_list={info} />
    </Layout>
  );
};

export const Head = ({ data }) => (
  <Seo title={data.markdownRemark.frontmatter.title} />
);

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    markdownRemark(frontmatter: { url: { eq: "" } }) {
      frontmatter {
        title
        h1
        games {
          title
          url
          items
        }
        info {
          title
          icon
          text {
            p
          }
        }
      }
    }
    allGames: allMarkdownRemark(
      filter: {
        frontmatter: { url: { ne: "" } }
        fileAbsolutePath: { regex: "/content/games/" }
      }
    ) {
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
    allCats: allMarkdownRemark(
      filter: {
        frontmatter: { url: { ne: "", nin: ["category/featured"] } }
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
              gatsbyImageData(width: 365, height: 365, layout: CONSTRAINED)
            }
          }
          url
        }
      }
    }
  }
`;
