'use strict';

const navigationService = require('../..');
const supertest = require('supertest');

const noop = () => {};
const mockLog = {
	info: noop,
	error: noop,
	warn: noop
};

before(function() {
	return navigationService({
		environment: 'test',
		log: mockLog,
		logLevel: process.env.LOG_LEVEL || 'trace',
		port: process.env.PORT || null,
		suppressLogs: true
	})
	.then(service => {
		this.agent = supertest.agent(service);
		this.service = service;
	});
});

after(function() {
	this.service.server.close();
});
