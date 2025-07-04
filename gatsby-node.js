const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          frontmatter {
            url
            slug
          }
        }
      }
    }
  `);

  data.allMarkdownRemark.nodes.forEach(node => {
    const { url, slug } = node.frontmatter;

    // Определяем шаблон для страницы
    let template;
    if (url === "") {
      template = path.resolve("./src/templates/index.js");
    } else if (url.startsWith("games/")) {
      template = path.resolve("./src/templates/game.js");
    } else if (url === "cart") {
      template = path.resolve("./src/templates/cart.js");
    } else if (url.startsWith("category/")) {
      template = path.resolve("./src/templates/category.js");
    } else {
      template = path.resolve("./src/templates/page.js");
    }

    actions.createPage({
      path: `/${url}`,
      component: template,
      context: { url, slug },
    });
  });
};
