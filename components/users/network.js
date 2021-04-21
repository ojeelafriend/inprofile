const express = require('express');
const router = express.Router();
const controller = require('./controller');
const talk = require('../../network/response');

router.post('/', (req, res) => {
	controller
		.register(req.body.user, req.body.password)
		.then((notice) => {
			talk.success(req, res, notice, 201);
		})
		.catch((e) => {
			talk.errors(req, res, 'Error ', 500, e);
		});
});

module.exports = router;
