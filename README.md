# Instagram Pin Creator

A simple GET API to return a Google Maps Marker image, applying mask over instagram images.

# How to use\*

Get the Instagram photo ID (example: in https://www.instagram.com/p/BqNeeORH0Ky/, the id is BqNeeORH0Ky) and call our API url: https://instagram-pin-creator.herokuapp.com/api/pin-creator?id=BqNeeORH0Ky.

Simple as that!

_\* works only with public images_

---

Deployed in Heroku: https://instagram-pin-creator.herokuapp.com/api/pin-creator?id={{instagram_photo_id}}

Based on Node.JS, using [Jimp](https://github.com/oliver-moran/jimp) and [Express](https://github.com/expressjs/express).
