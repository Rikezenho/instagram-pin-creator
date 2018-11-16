const axios = require("axios");

const getInstagramImageData = id =>
  axios
    .get(`https://www.instagram.com/p/${id}/?__a=1`)
    .then(
      response => response.data.graphql.shortcode_media.display_resources[0].src
    )
    .catch(e => ({
      error: `Error fetching instagram data! Maybe it's because the image isn't public.`
    }));

module.exports = {
  getInstagramImageData
};
