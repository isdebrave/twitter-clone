const express = require("express");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(express.static(path.join(process.cwd(), "/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/dist/index.html"));
});

app.listen(app.get("port"), () =>
  console.log(`✅ frontend: Listening on port ${app.get("port")}`)
);
