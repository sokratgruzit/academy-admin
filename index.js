const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
process.env["NODE_CONFIG_DIR"] = __dirname + "/src/config";
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const auth = require("./src/routes/auth.routes");
const content = require("./src/routes/content.routes");
const upload = require("./src/routes/upload.routes");
const data = require("./src/routes/data.routes");
const { getImage } = require("./src/middlewares/upload.middleware");

require("dotenv").config();

//Academy server
app.use(express.json({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/api/content", content);
app.use("/api/upload", upload);
app.get("/api/images/:filename", getImage);
app.use("/api/auth", auth);
app.use("/api/data", data);

const root = require("path").join(__dirname, "admin", "build");
app.use(express.static(root));

app.get("*", function (req, res) {
  res.sendFile("index.html", { root });
});

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
  } catch (e) {
    console.log(`Server Error ${e.message}`);
    process.exit(1);
  }
}

start();
