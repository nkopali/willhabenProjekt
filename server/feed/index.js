const Router = require('express').Router;
const {showEventFeed, listOwnEvents, createEvent, updateEvent, deleteEvent} = require('./controller');
const router = Router();
const bodyParser = require('body-parser');
const checkAuth = require('../checkAuth');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.get('/', showEventFeed);
router.get('/ownEvents/:id', listOwnEvents);
router.post('/', createEvent);
router.delete('/', deleteEvent);
router.put('/', updateEvent);



module.exports = router;
