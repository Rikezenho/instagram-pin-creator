const jimp = require("jimp");
const express = require("express");
const app = express();
const axios = require("axios");
const fs = require("fs");

const PORT = 8080;

const getBase64Image = url =>
  axios
    .get(url, {
      responseType: "arraybuffer"
    })
    .then(response => new Buffer.from(response.data).toString("base64"));

const getInstagramImageData = id =>
  axios
    .get(`https://www.instagram.com/p/${id}/?__a=1`)
    .then(
      response => response.data.graphql.shortcode_media.display_resources[0].src
    )
    .catch(e => console.log(e));

app.get("/", (req, res) => {
  res.status(200).send("<h1>It works!</h1>");
});

app.get("/api/pin-creator", async (req, res) => {
  const { id } = req.query;
  if (!id) {
    res.status(500).send({
      error: "id parameter required!"
    });
  }

  const filename = `pins/${id}.png`;
  const image = await jimp.read(await getInstagramImageData(id));
  const mask = await jimp.read("red-dot-mask.png");
  const overlay = await jimp.read("red-dot-shadow.png");
  await image
    .cover(200, 200)
    .crop(0, 0, 200, 200)
    .mask(mask)
    .blit(overlay, 0, 0)
    .write(filename);

  const imageLocal = fs.readFileSync(filename);

  res.contentType("image/jpeg");
  res.send(imageLocal);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
