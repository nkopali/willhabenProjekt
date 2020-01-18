const Router = require('express').Router;
const {showEventFeed, listOwnEvents, createEvent, updateEvent, deleteEvent} = require('./controller');
const router = Router();
const bodyParser = require('body-parser');
const checkAuth = require('../checkAuth');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.get('/:id', showEventFeed);
router.get('/ownEvents/:id', checkAuth, listOwnEvents);
router.post('/:id', checkAuth, createEvent);
router.delete('/:id',checkAuth, deleteEvent);
router.put('/:id',checkAuth, updateEvent);





module.exports = router;
