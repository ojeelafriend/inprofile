const express = require('express');
const user = require('../components/users/network');
const package = require('../components/sendpackage/network');

const routes = (server) => {
	server.use('/user', user);
	server.use('/json', package);
};

module.exports = routes;
