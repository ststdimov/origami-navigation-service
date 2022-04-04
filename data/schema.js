'use strict';

// {
// 	'label': 'Example Menu',
// 	'items': [item]
// }
const menu = {
	$id: 'menu',
	required: ['label', 'items'],
	properties: {
		label: {
			type: 'string',
			nullable: true
		},
		items: {
			type: 'array',
			minItems: 1,
			uniqueItems: true,
			items: {
				$ref: 'item'
			},
			// additionalItems: false
		}
	},
	additionalProperties: false
};

// {
// 	'label': 'Example Item',
// 	'url': 'http://example.com/',
// 	'submenu': null || menu
// }

const item = {
	$id: 'item',
	type: 'object',
	required: ['label', 'url', 'submenu'],
	properties: {
		label: {
			type: 'string',
			nullable: true
		},
		url: {
			type: 'string',
			format: 'uri-template',
			nullable: true
		},
		submenu: {
			anyOf: [{
				type: 'null'
			}, {
				$ref: 'menu'
			}]
		},
		disableTracking: {
			type: 'boolean',
			nullable: true
		}
	},
	additionalProperties: false
};

// {
// 	nameOfMenuObject: menu,
// 	nameOfMenuObject: menu
// }
const root = {
	$id: 'root',
	type: 'object',
	minProperties: 1,
	required: ['account', 'drawer-uk', 'drawer-international', 'user', 'anon', 'footer', 'navbar-simple', 'navbar-right', 'navbar-right-anon', 'navbar-uk', 'navbar-international'],
	'patternProperties': {
		'^.*$': { $ref: 'menu' }
	},
	additionalProperties: false
};

const Ajv = require('ajv');
const addFormats = require('ajv-formats').default;
const ajv = new Ajv();
addFormats(ajv);
ajv.addSchema(menu, 'menu');
ajv.addSchema(item, 'item');
ajv.addSchema(root, 'root');

module.exports = ajv;
