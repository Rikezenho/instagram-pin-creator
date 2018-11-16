const express = require("express");

const app = express();
const PORT = 8080;

const mainRoutes = require("./routes");
const apiRoutes = require("./routes/api");

app.use("/", mainRoutes);
app.use("/api", apiRoutes);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${process.env.PORT || PORT}`);
});
