var express = require("express");
const { route } = require(".");
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
// CREATE POSTS
router.get("/create", function (req, res, next) {
  res.render("posts/create", {
    title: "",
    content: "",
  });
});
//STORE/SIMPAN POSTS
router.post("/store", function (req, res, next) {
  let title = req.body.title;
  let content = req.body.content;
  let errors = false;

  if (title.length === 0) {
    errors = true;
    // set flash message
    req.flash("error", "Silahkan Masukkan Title");
    // render to add.ejs with flash message
    res.render("posts/create", {
      title: title,
      content: content,
    });
  }

  if (content.length === 0) {
    errors = true;
    // set flash message
    req.flash("error", "Silahkan Masukkan konten");
    // render to add.ejs with flash message
    res.render("posts/create", {
      title: title,
      content: content,
    });
  }

  if (!errors) {
    let formData = {
      title: title,
      content: content,
    };
    //insert query
    connection.query(
      "INSERT INTO posts SET ?",
      formData,
      function (err, result) {
        if (err) {
          req.flash("error", err);
          //render to add.ejs
          res.render("posts/create", {
            title: formData.title,
            content: formData.content,
          });
        } else {
          req.flash("success", "Data Berhasil Disimpan");
          res.redirect("/posts");
        }
      }
    );
  }
});
//! EDIT POST
router.get("/edit/(:id_post)", function (req, res, next) {
  let id = req.params.id_post;
  connection.query(
    "SELECT * FROM posts WHERE id_post=" + id,
    function (err, rows, fields) {
      if (err) throw err;
      //if user not found
      if (rows.length <= 0) {
        req.flash("error", "Data Post Dengan ID" + id + "Tidak ditemukan");
        res.redirect("/posts");
      } else {
        res.render("posts/edit", {
          id: rows[0].id_post,
          title: rows[0].title,
          content: rows[0].content,
        });
      }
    }
  );
});
// ! UPDATE POST
router.post("/update/:id_post", function (req, res, next) {
  let id = req.params.id_post;
  let title = req.body.title;
  let content = req.body.content;
  let errors = false;

  if (title.length === 0) {
    errors = true;
    //set flash message
    req.flash("error", "silahkan masukkan judul");
    //render ke edit.ejs dengan pesan flash
    res.render("posts/edit", {
      id: req.params.id_post,
      title: title,
      content: content,
    });
  }

  if (content.length === 0) {
    errors = true;
    //set flash message
    req.flash("error", "silahkan masukkan judul");
    //render ke edit.ejs dengan pesan flash
    res.render("posts/edit", {
      id: req.params.id_post,
      title: title,
      content: content,
    });
  }

  if (!errors) {
    let formData = {
      title: title,
      content: content,
    };
    //update query
    connection.query(
      "UPDATE posts SET ? WHERE id_post = " + id,
      formData,
      function (err, result) {
        if (err) {
          //set flash message
          req.flash("error", err);
          //render to edit.ejs
          res.render("posts/edit", {
            id: req.params.id_post,
            title: formData.title,
            content: formData.content,
          });
        } else {
          req.flash("success", "Data Berhasil Diupdate");
          res.redirect("/posts");
        }
      }
    );
  }
});
module.exports = router;
