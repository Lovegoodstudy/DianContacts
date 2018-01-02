'use strict';

let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});
let ContactsLogger = require('../logger').ContactsLogger;
let ContactsController = require('../controllers/contacts_controller');

router.post('/', urlencodedParser, async (req, res, next) => {
    let params = {
        // TODO
        data: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        },
        operation: 'post'
    };
    try {
        let result = await ContactsController.addContact(params);
        ContactsLogger.info(`add contact result => ${JSON.stringify(result, null, 2)}`);
        res.json(result);
    } catch(err) {
        ContactsLogger.error(`add contact error => ${err.stack}`);
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    let params = {
        operation: 'get'
    };
    try {
        let result = await ContactsController.getContact(params);
        ContactsLogger.info(`get contact result => ${JSON.stringify(result, null, 2)}`);
        res.json(result);
    } catch(err) {
        ContactsLogger.error(`get contact error => ${err.stack}`);
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    let params = {
        data:{
            _id : req.params.id
        },
        operation: 'delete'
    };
    try {
        let result = await ContactsController.deleteContact(params);
        ContactsLogger.info(`delete contact result => ${JSON.stringify(result, null, 2)}`);
        res.json(result);
    } catch(err) {
        ContactsLogger.error(`delete contact error => ${err.stack}`);
        next(err);
    }
});

router.put('/:id', urlencodedParser, async (req, res, next) => {
    let params = {
        data:{
            _id : req.params.id,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        },
        operation: 'update'
    };
    try {
        let result = await ContactsController.updateContact(params);
        ContactsLogger.info(`update contact result => ${JSON.stringify(result, null, 2)}`);
        res.json(result);
    } catch(err) {
        ContactsLogger.error(`update contact error => ${err.stack}`);
        next(err);
    }
});

module.exports = router;