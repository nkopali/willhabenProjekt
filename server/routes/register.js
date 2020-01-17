const Router = require('express').Router;
const router = Router();
const bodyParser = require('body-parser');
const connection = require("../db").getDb();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));


router.post('/', (req, res) => {
  user = req.body.username;
  pass = req.body.password;
  lastname = req.body.lastname;
  firstname = req.body.firstname;
  email = req.body.email;

  query = `SELECT username
         FROM users
         WHERE username = ?`;

  connection.query(query, [user], (err, row) => {
    if (err) {
      res.sendStatus(500);
    } else if (row.length > 0) {
      res.json({message: 'User already exists!'})
    } else {
      insertquery = `INSERT INTO users (username, password, lastname, firstname,email)
      VALUES (?, ?, ?, ?, ?);`;
      connection.query(insertquery, [user, pass, lastname, firstname,email], (err) => {
        if (err) {
          res.sendStatus(500);
        } else {
          res.status(200).json({message: "Success"});
        }
      });
    }
  });
});

module.exports = router;
