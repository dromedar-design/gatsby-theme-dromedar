import React from "react";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

export default ({
  children,
  title,
  description,
  titleTemplate = null,
  image
}) => {
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

  return (
    <Helmet
      defer={false}
      titleTemplate={titleTemplate || `%s | ${data.title}`}
      defaultTitle={`${data.title}`}
    >
      <html lang={data.language} />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
      />

      <title>{title}</title>
      <meta name="description" content={metaDescription} />

      <meta property="og:locale" content={data.language} />
      <meta property="og:site_name" content={data.title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image || home.data.image.url} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={data.author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />

      {children}
    </Helmet>
  );
};
