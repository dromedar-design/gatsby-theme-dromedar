import React from "react";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

export default ({ children, title, description, url, noTemplate, image }) => {
  const { site, home } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          author
          language
        }
      }
      home: prismicPage(uid: { eq: "home" }) {
        data {
          image {
            url
          }
        }
      }
    }
  `);

  const data =
    typeof site === "undefined"
      ? {
          title: "",
          description: "",
          author: "",
          language: ""
        }
      : site.siteMetadata;

  const metaDescription = description || data.description;
  const metaTitle = title
    ? noTemplate
      ? title
      : `${title} | ${data.title}`
    : data.title;

  return (
    <Helmet defer={false}>
      <html lang={data.language} />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
      />

      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />

      <meta property="og:locale" content={data.language} />
      <meta property="og:site_name" content={data.title} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image || home.data.image.url} />
      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={data.author} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />

      {children}
    </Helmet>
  );
};
