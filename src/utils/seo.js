import React from "react"
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby"
import { RichText } from 'prismic-reactjs'

export default ({
    children,
    title,
    description,
    titleTemplate = null,
}) => {
    const { site, prismic } = useStaticQuery(graphql`
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

    const home = {
        title: prismic && RichText.asText(prismic.page.title || []),
        desc: prismic && RichText.asText(prismic.page.description || []),
    }

    const metaDescription = description || home.desc

    return (
        <Helmet
            titleTemplate={titleTemplate || `%s | ${home.title}`}
            defaultTitle={`${home.title}`}
        >
            <html lang={site && site.siteMetadata.language} />
            {title && <title>{title}</title>}

            <meta name="description" content={metaDescription} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:creator" content={site && site.siteMetadata.author} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={metaDescription} />

            {children}
        </Helmet>
    )
}