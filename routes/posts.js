var express = require("express");
var router = express.Router();

// import database
var connection = require("../library/database");
// index post
router.get("/", function (req, res, next) {
  connection.query(
    "SELECT * FROM posts ORDER BY id_post desc",
    function (err, rows) {
      if (err) {
        req.flash("error", err);
        res.render("posts", { data: "" });
      } else {
        //render ke view posts index
        res.render("posts/index", {
          data: rows,
        });
      }
    }
  );
});
module.exports = router;
