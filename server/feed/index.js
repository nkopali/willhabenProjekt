const Router = require('express').Router;
const {showEventFeed, listOwnEvents, createEvent, updateEvent, deleteEvent,updateLikes} = require('./controller');
const router = Router();
const bodyParser = require('body-parser');
const checkAuth = require('../checkAuth');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.get('/', showEventFeed);
router.get('/ownEvents/:id', listOwnEvents);
router.post('/', createEvent);
router.post('/likes', updateLikes);
router.delete('/:id', deleteEvent);
router.put('/', updateEvent);



module.exports = router;
