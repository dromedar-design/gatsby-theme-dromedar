import React from "react";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

import Schema from "./schema";

export default ({ children, title, description, url, noTemplate, image }) => {
  const { site, home } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          author
          language
          siteUrl
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
          language: "",
          siteUrl: ""
        }
      : site.siteMetadata;

  const metaDescription = description || data.description;
  const metaTitle = title
    ? noTemplate
      ? title
      : `${title} | ${data.title}`
    : data.title;

  return (
    <>
      <Helmet defer={false}>
        <html lang={data.language} />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
        />

        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="image" content={image || home.data.image.url} />
        <link href={url || data.siteUrl} rel="canonical" />
        <link href={data.siteUrl} rel="home" />

        <meta property="og:locale" content={data.language} />
        <meta property="og:site_name" content={data.title} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={image || home.data.image.url} />
        <meta property="og:url" content={url || data.siteUrl} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content={data.author} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />

        {children}
      </Helmet>

      <SchemaOrg
        url={url || data.siteUrl}
        title={metaTitle}
        image={image}
        description={metaDescription}
        canonicalUrl={url}
        organization={{
          url: data.siteUrl,
          name: data.author,
          logo: "https://api.klingenland.at/img/klingenland.png"
        }}
        defaultTitle={data.title}
      />
    </>
  );
};
