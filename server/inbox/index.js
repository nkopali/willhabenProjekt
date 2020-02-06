const Router = require('express').Router;
const {showMsgs, sendMsg, deleteMsg, getAllUsers} = require('./controller');
const router = Router();
const bodyParser = require('body-parser');
const checkAuth = require('../checkAuth');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.get('/all', checkAuth, getAllUsers);
router.get('/:id', checkAuth, showMsgs);
router.post('/',checkAuth,  sendMsg);
router.delete('/', checkAuth, deleteMsg);

module.exports = router;
