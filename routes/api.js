const jimp = require("jimp");

const express = require("express");
const router = express.Router();

const { getInstagramImageData } = require("../utils");

router.get("/pin-creator", async (req, res) => {
  const { id } = req.query;
  if (!id) {
    res.status(500).send({
      error: "id parameter is required!"
    });
  }

  getInstagramImageData(id)
    .then(async url => {
      const image = await jimp.read(url);
      const mask = await jimp.read("assets/red-dot-mask.png");
      const overlay = await jimp.read("assets/red-dot-shadow.png");
      await image
        .cover(200, 200)
        .crop(0, 0, 200, 200)
        .mask(mask)
        .blit(overlay, 0, 0)
        .getBase64(jimp.MIME_PNG, (err, src) => {
          const img = new Buffer.from(src.split(",")[1], "base64");
          res.writeHead(200, {
            "Content-Type": "image/png",
            "Content-Length": img.length
          });
          res.end(img);
        });
    })
    .catch(e => {
      res.status(500).send(e);
    });
});

module.exports = router;
