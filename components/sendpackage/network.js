const express = require('express');
const router = express.Router();
const controller = require('../sendpackage/controller');
const talk = require('../../network/response');

router.get('/', (req, res) => {
	controller
		.getPackage('200') //change look it
		.then((notice) => {
			console.log('json-data send');
			talk.success(req, res, notice, 202);
		})
		.catch((e) => {
			talk.errors(req, res, 'Invalid request', 406, e);
		});
});

module.exports = router;
