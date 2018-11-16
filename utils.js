const axios = require("axios");

const getInstagramImageData = id =>
  axios
    .get(`https://www.instagram.com/p/${id}/?__a=1`)
    .then(response =>
      response.statusCode !== 404
        ? response.data.graphql.shortcode_media.display_resources[0].src
        : new Promise((resolve, reject) =>
            reject({
              error: `Error fetching instagram data! Maybe it's because the image isn't public.`
            })
          )
    )
    .catch(e => ({
      error: `Error fetching instagram.`;
    }));

module.exports = {
  getInstagramImageData
};
