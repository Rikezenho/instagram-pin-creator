const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(500).send({
    error: `We don't have nothing in / path. Go to /api/pin-creator?id={{instagram_photo_id}}`
  });
});

module.exports = router;
