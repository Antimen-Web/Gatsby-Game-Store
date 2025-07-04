import * as React from "react";
import { graphql } from "gatsby";
import * as styles from "../css/page.module.css";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const Page = ({ data }) => {
  const { h1 } = data.markdownRemark.frontmatter;
  const { html } = data.markdownRemark;
  return (
    <Layout>
      <div className="single">
        <div className={styles.header}>
          <h1>{h1}</h1>
        </div>
        <div className="container">
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Layout>
  );
};

export const Head = ({ data }) => (
  <Seo title={data.markdownRemark.frontmatter.title} />
);

export default Page;

export const query = graphql`
  query PageQueryByUrl($url: String) {
    markdownRemark(frontmatter: { url: { eq: $url } }) {
      frontmatter {
        title
        h1
      }
      html
    }
  }
`;
