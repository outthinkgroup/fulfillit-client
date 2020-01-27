require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
console.log(`${process.env.WP_URL}`)
module.exports = {
  siteMetadata: {
    title: `FulFillit`,
    description: `An Easy Way to Give Your Users a Thankyou`,
    author: `Josh Kennedy`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Source+Sans+Pro:300,400,400i,600,700`],
        display: `swap`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Fulfillit By Outthink`,
        short_name: `Fulfillit`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        //icon: `src/images/.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
