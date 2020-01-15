const Router = require('express').Router;
const router = Router();
const bodyParser = require('body-parser')
const connection = require("../db").getDb();
const jwt = require('jsonwebtoken');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('/', (req, res) => {
  user = req.body.user;
  pwd = req.body.pwd;

  query = `SELECT *
         FROM users
         WHERE username = ?
         AND password = ?;`;

  connection.query(query, [user, pwd], (err, row) => {
    if (err) {
      res.sendStatus(500);
    } else if (row.length === 0) {
      res.status(400).json({message: "User oder Password falsch."})
    } else {
      let userdata = {
        id: row[0].Id,
        username: row[0].username,
      };

      jwt.sign(userdata, 'secretkey', (err, token) => {
        if (err) {
          res.sendStatus(500);
        } else {
          res.status(200).json({token});
        }
      });
    }
  });
});

module.exports = router;
