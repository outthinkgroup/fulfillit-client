module.exports = {
  siteMetadata: {
    title: `FulFillit`,
    description: `An Easy Way to Give Your Users a Thankyou`,
    author: `Josh Kennedy`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,

    `gatsby-plugin-stripe`,

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
    //`gatsby-plugin-offline`,
  ],
}
