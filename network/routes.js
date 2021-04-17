const express = require('express');
const user = require('../components/users/network');

const routes = (server) => {
	server.use('/user', user);
};

module.exports = routes;
