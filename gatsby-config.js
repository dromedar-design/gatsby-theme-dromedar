module.exports = ({
  url,
  language = "en-us",
  prismic,
  pages = [],
  author,
  title,
  description = ""
}) => {
  return {
    siteMetadata: {
      language,
      author,
      siteUrl: url,
      title,
      description
    },
    plugins: [
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "pages",
          path: `${__dirname}/src/pages/`
        }
      },
      {
        resolve: `gatsby-plugin-postcss`,
        options: {
          postCssPlugins: [
            require("tailwindcss"),
            require("postcss-nested"),
            require("autoprefixer")
          ]
        }
      },
      {
        resolve: `gatsby-plugin-purgecss`,
        options: {
          tailwind: true,
          purgeOnly: ["src/css/tailwind.css"]
        }
      },
      "gatsby-plugin-react-helmet",
      {
        resolve: `gatsby-plugin-sharp`,
        options: {
          pngCompressionSpeed: 10
        }
      },
      "gatsby-transformer-sharp",
      {
        resolve: "gatsby-plugin-sitemap",
        options: {
          exclude: ["/preview", ...pages.map(p => p.path)]
        }
      },
      {
        resolve: "gatsby-plugin-react-svg",
        options: {
          rule: {
            include: /assets/
          }
        }
      },
      "gatsby-plugin-netlify",
      "gatsby-plugin-offline"
    ]
  };
};
