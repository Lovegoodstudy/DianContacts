'use strict';

let ConfigSet = require('../configs/config_set.json');
let ErrorSet = require('../utils/error_util');
let Joi = require('joi');
let ContactsLogger = require('../logger').ContactsLogger;
let MongoDB = require('mongodb');
let MongoClient = MongoDB.MongoClient;
let ObjectID = require('mongodb').ObjectID;
let IsEmpty = require('is-empty');

let db;
MongoClient.connect(ConfigSet.DATABASE_URL, (err, client) => {
    if (err) {
        ContactsLogger.error(`database error => ${err.stack}`);
        throw err;
    } else {
        db = client.db(ConfigSet.DATABASE_NAME);
    }
});

exports.addContact = async function(params) {
    // TODO
    let collection = db.collection(ConfigSet.COLLECTION_NAME);
    let result = await collection.insertOne({
        name: params.data.name,
        email: params.data.email,
        phone: params.data.phone
    });
    return result.ops[0];
};

exports.getContact = async function(params) {
    let collection = db.collection(ConfigSet.COLLECTION_NAME);
    let result = await collection.find().toArray();
    return result;
};

exports.deleteContact = async function(params) {
    let collection = db.collection(ConfigSet.COLLECTION_NAME);
    let result = await collection.removeOne({
        _id: ObjectID(params.data._id)
    });
    return result;
};

exports.updateContact = async function(params) {
    let collection = db.collection(ConfigSet.COLLECTION_NAME);
    let result = await collection.updateOne({
        _id: ObjectID(params.data._id)
    },{
        _id: ObjectID(params.data._id),
        name: params.data.name,
        email: params.data.email,
        phone: params.data.phone
    });
    return result;
};