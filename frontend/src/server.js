const dotenv = require("dotenv");
const express = require("express");
const path = require("path");

const app = express();

dotenv.config();

app.use("/", express.static(path.join(process.cwd(), "/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/dist/index.html"));
});

app.listen(80, () => console.log("✅ frontend: Listening on port 80"));
