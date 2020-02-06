const Router = require('express').Router;
const {showMsgs, sendMsg, deleteMsg, getAllUsers} = require('./controller');
const router = Router();
const bodyParser = require('body-parser');
const checkAuth = require('../checkAuth');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.get('/all', getAllUsers);
router.get('/:id', showMsgs);
router.post('/', sendMsg);
router.delete('/', deleteMsg);

module.exports = router;
