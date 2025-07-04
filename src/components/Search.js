import React, { useState, useEffect, useRef } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import * as styles from "../css/Search.module.css";
import SearchIcon from "../icons/Search.svg";
import { removeMarkdown } from "../utils/removeMarkdown";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(false);
  const inputRef = useRef(null);

  const { allMarkdownRemark } = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        nodes {
          frontmatter {
            title
            h1
            url
          }
          rawMarkdownBody
        }
      }
    }
  `);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchResults = allMarkdownRemark.nodes.filter(node => {
      const content =
        `${node.frontmatter.title} ${node.frontmatter.h1} ${node.rawMarkdownBody}`.toLowerCase();
      return content.includes(query.toLowerCase());
    });

    setResults(searchResults);
  }, [query, allMarkdownRemark.nodes]);

  if (isLoading) return <div>Loading search...</div>;

  return (
    <div
      className={`${styles.container} ${active ? styles.active : ""}`}
      onClick={() => {
        setActive(!active);
        setQuery("");
        inputRef.current?.focus();
      }}
    >
      <div className={styles.inputWrapper}>
        <SearchIcon className={styles.icon} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search..."
          className={styles.input}
          onClick={e => e.stopPropagation()}
        />
      </div>

      {query.length > 0 && (
        <div className={styles.resultsContainer}>
          {results.length > 0 ? (
            <ul className={styles.resultsList}>
              {results.map((result, index) => (
                <li key={index} className={styles.resultItem}>
                  <Link
                    to={`/${result.frontmatter.url}`}
                    className={styles.resultLink}
                    onClick={() => setQuery("")}
                  >
                    <h4 className={styles.resultTitle}>
                      {result.frontmatter.h1}
                    </h4>
                    <p className={styles.resultExcerpt}>
                      {removeMarkdown(result.rawMarkdownBody.substring(0, 100))}
                      ...
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.noResults}>
              {query.length < 2
                ? "Type at least 2 characters"
                : `No results found for "${query}"`}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
