module.exports = ({
  url,
  language = "en-us",
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
      "gatsby-plugin-sitemap",
      {
        resolve: "gatsby-plugin-react-svg",
        options: {
          rule: {
            include: /assets/
          }
        }
      },
      "gatsby-plugin-netlify"
    ]
  };
};
