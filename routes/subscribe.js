var express = require('express');
var router = express.Router();
var info = require('../utilities/info');

/* POST users listing. */
router.post('/', function(req, res, next) {

	var body = req.body;
	var db = req.db;
	
	if(body && body.phrases && body.session){
		session = body.session;
		phrases = body.phrases;
		
		info.getSessionExists(session, db, function(e, exists){
			if(exists){
				var parts = phrases.split(',');
				req.setSubscriptions(session, parts);
				res.state = 200;
				res.send({
					state: 'ok'
				})
				
				info.storeSubscriptions(db, session, parts);
				
			}else{
				res.send({
					err: "session does not exist"
				})
			}
		})
	}else{
		res.send({
			err: "did not specify"
		})
	}
	
});

module.exports = router;
