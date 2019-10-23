const path = require('path')

module.exports = ({
    url,
    language = 'en-us',
    prismic,
    pages = [],
    author,
    title,
    description = '',

    purgeCSS: {
        purgeOnly = [path.join(__dirname, 'src/css/tailwind.css')],
        content = [],
    } = {},
}) => {
    return {
        siteMetadata: {
            language,
            author,
            siteUrl: url,
            title,
            description,
        },
        plugins: [
            {
                resolve: 'gatsby-source-filesystem',
                options: {
                    name: 'pages',
                    path: `${__dirname}/src/pages/`,
                },
            },
            {
                resolve: `gatsby-plugin-postcss`,
                options: {
                    postCssPlugins: [
                        require('tailwindcss'),
                        require('postcss-nested'),
                        require('autoprefixer'),
                    ],
                },
            },
            {
                resolve: `gatsby-plugin-purgecss`,
                options: {
                    tailwind: true,
                    purgeOnly,
                    content: [
                        path.join(__dirname, 'src/**/!(*.d).{ts,js,jsx,tsx}'),
                        path.join(process.cwd(), 'src/**/!(*.d).{ts,js,jsx,tsx}'),
                        ...content,
                    ],
                },
            },
            'gatsby-plugin-react-helmet',
            'gatsby-plugin-sharp',
            'gatsby-transformer-sharp',
            {
                resolve: 'gatsby-plugin-sitemap',
                options: {
                    exclude: [
                        '/preview',
                        '/product',
                    ]
                }
            },
            {
                resolve: 'gatsby-source-prismic-graphql',
                options: {
                    repositoryName: prismic,
                    defaultLang: language,
                    previews: true,
                    pages: pages,
                    sharpKeys: [
                        /image|photo|picture/,
                    ],
                }
            }
        ]
    }
}
