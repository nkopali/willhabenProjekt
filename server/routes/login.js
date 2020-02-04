const Router = require('express').Router;
const router = Router();
const bodyParser = require('body-parser');
const connection = require("../db").getDb();
const jwt = require('jsonwebtoken');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('/', (req, res) => {
  username = req.body.username;
  password = req.body.password;

  query = `SELECT *
         FROM users
         WHERE username = ?
         AND password = ?;`;

  connection.query(query, [username, password], (err, row) => {
    if (err) {
      res.sendStatus(500);
    } else if (row.length === 0) {
      res.status(400).json({message: "User oder Password falsch."})
    } else {
      let userdata = {
        id: row[0].userID,
        username: row[0].username,
      };

      jwt.sign(userdata, 'secretkey', (err, token) => {
        if (err) {
          res.sendStatus(500);
        } else {
          res.status(200).json(userdata.id);
          console.log(userdata.id);
        }
      });
    }
  });
});



module.exports = router;
