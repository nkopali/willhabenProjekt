const Router = require('express').Router;
const {showEventFeed, listOwnEvents, createEvent, updateEvent, deleteEvent} = require('./controller');
const router = Router();
const bodyParser = require('body-parser');
const checkAuth = require('../checkAuth');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.get('/:id', checkAuth, showEventFeed);
router.get('/:id', checkAuth, listOwnEvents);
router.get('/:id', checkAuth, createEvent);
router.get('/:id',checkAuth, deleteEvent);




module.exports = router;
