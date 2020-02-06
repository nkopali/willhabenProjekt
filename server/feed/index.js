const Router = require('express').Router;
const {showEventFeed, listOwnEvents, createEvent, updateEvent, deleteEvent,updateLikes} = require('./controller');
const router = Router();
const bodyParser = require('body-parser');
const checkAuth = require('../checkAuth');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.get('/', checkAuth, showEventFeed);
router.get('/ownEvents/:id', checkAuth, listOwnEvents);
router.post('/', checkAuth, createEvent);
router.post('/likes', checkAuth, updateLikes);
router.delete('/:id', checkAuth, deleteEvent);
router.put('/', checkAuth, updateEvent);



module.exports = router;
