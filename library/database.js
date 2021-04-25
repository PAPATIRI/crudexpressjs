// import library
let mysql = require("mysql");
// membuat setup database dalam variable
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_express_mysql",
});
// cek jika koneksi berhasil
connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Koneksi berhasil");
  }
});

module.exports = connection;
