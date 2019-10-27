import React from "react"
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby"

export default ({
    children,
    title,
    description,
    titleTemplate = null,
    image
}) => {
    const { site } = useStaticQuery(graphql`
        {
            site {
                siteMetadata {
                    title
                    description
                    author
                    language
                }
            }
        }
    `)

    const metaDescription = description || (site && site.siteMetadata.description)

    return (
        <Helmet defer={false}
            titleTemplate={titleTemplate || `%s | ${site && site.siteMetadata.title}`}
            defaultTitle={`${site && site.siteMetadata.title}`}
        >
            <html lang={site && site.siteMetadata.language} />
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
            />

            <title>{title}</title>
            <meta name="description" content={metaDescription} />

            <meta property="og:locale" content={site && site.siteMetadata.language} />
            <meta property="og:site_name" content={site && site.siteMetadata.title} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={image} />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:creator" content={site && site.siteMetadata.author} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={metaDescription} />

            {children}
        </Helmet>
    )
}