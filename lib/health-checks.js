'use strict';

const requestPromise = require('./request-promise');
const pingInterval = 60 * 1000;

// Health checks
const healthChecks = module.exports = {

	// Service status store
	statuses: {},

	// Initialise the health-checks
	init(config) {

		// TODO remove this, just here to fix a lint error
		config;

		// Ping services that the service relies on
		function pingServices() {
			// TODO see Image Service for example of how to set these up
		}

		pingServices();
		setInterval(pingServices, pingInterval);
	},

	// Ping a service and record its status
	pingService(name, url) {
		if (!!process.env.TEST_HEALTHCHECK_FAILURE) {
			return healthChecks.statuses[name] = false;
		}
		return requestPromise({
			uri: url,
			method: 'HEAD'
		})
		.then(response => {
			if (response.statusCode >= 400) {
				healthChecks.statuses[name] = false;
			} else {
				healthChecks.statuses[name] = true;
			}
		})
		.catch(() => {
			healthChecks.statuses[name] = false;
		});
	}
};
