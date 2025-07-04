import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import GameList from "../components/GameList";
import GameFilters from "../components/GameFilters";
import { SORT_OPTIONS } from "../utils/constants";
import { filterGames, sortGames } from "../utils/gameFilters";

const Category = ({ data }) => {
  const { h1 } = data.markdownRemark.frontmatter;
  const allGames = data.postsInCategory.nodes;
  const [filterOnSale, setFilterOnSale] = React.useState(false);
  const [sortBy, setSortBy] = React.useState(SORT_OPTIONS.DEFAULT);

  const filteredGames = React.useMemo(
    () => filterGames(allGames, filterOnSale),
    [allGames, filterOnSale]
  );

  const sortedGames = React.useMemo(
    () => sortGames(filteredGames, sortBy),
    [filteredGames, sortBy]
  );

  const gameUrls = React.useMemo(
    () => sortedGames.map(game => game.frontmatter),
    [sortedGames]
  );

  return (
    <Layout>
      <div className="category">
        <h1>{h1}</h1>

        <GameFilters
          filterOnSale={filterOnSale}
          setFilterOnSale={setFilterOnSale}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <GameList cat={true} allGames={sortedGames} games={gameUrls} />
      </div>
    </Layout>
  );
};

export const Head = ({ data }) => (
  <Seo title={data.markdownRemark.frontmatter.title} />
);

export default Category;

export const query = graphql`
  query CategoryQuery($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
        h1
        image {
          childImageSharp {
            gatsbyImageData(height: 424, layout: CONSTRAINED)
          }
        }
        slug
        url
      }
    }

    postsInCategory: allMarkdownRemark(
      filter: {
        frontmatter: { categories: { in: [$slug] } }
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
  }
`;
