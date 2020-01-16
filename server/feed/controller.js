const model = require('./model');
const jwt = require('jsonwebtoken');

//Sends all foreign events to the client
function showEventFeed(request, response) {
  model.getFeed(request.userId).then(
    events => {
      if(events.length < 1){
        response.status(200).json({message:"No events found"});
      }
      else{
        response.status(200).json(events);
      }
    },
    error => response.send(error),

  );
}
