const express = require("express");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "super secret",
  })
);

app.get("/", (req, res) => {
  if (!req.session.views) {
    req.session.views = 0;
  }

  req.session.views++;

  return res.json({ count: req.session.views });
});

app.listen(3000);
