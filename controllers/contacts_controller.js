'use strict';

let ContactsDB = require('../models/contacts_db');
let Joi = require('joi');
let IsEmpty = require('is-empty');
let ErrorUtil = require('../utils/error_util');

exports.addContact = async params => {
    if (!await _validateAddContactParams(params)) {
        throw ErrorUtil.createError(ErrorUtil.ErrorSet.REQUEST_PARAMETER_ERROR);
    }
    let data = await ContactsDB.addContact(params);
    data.contact_id = data._id;
    delete data._id;
    return {result: data};
};

async function _validateAddContactParams(params) {
    // TODO
    if (params.operation === 'post') {
        return true;
    } else {
        return false;
    }
}

exports.getContact = async params => {
    if (!await _validateGetContactParams(params)) {
        throw ErrorUtil.createError(ErrorUtil.ErrorSet.REQUEST_PARAMETER_ERROR);
    }
    let data = await ContactsDB.getContact(params);
    for (let contact of data) {
        contact.contact_id = contact._id;
        delete contact._id;
    }
    return {result: data};
};

async function _validateGetContactParams(params) {
    if (params.operation === 'get') {
        return true;
    } else {
        return false;
    }
}

exports.deleteContact = async params => {
    if (!await _validateDeleteContactParams(params)) {
        throw ErrorUtil.createError(ErrorUtil.ErrorSet.REQUEST_PARAMETER_ERROR);
    }
    let data = await ContactsDB.deleteContact(params);
    return {result: data};
};

async function _validateDeleteContactParams(params) {
    if (params.operation === 'delete') {
        return true;
    } else {
        return false;
    }
}

exports.updateContact = async params => {
    if (!await _validateUpdateContactParams(params)) {
        throw ErrorUtil.createError(ErrorUtil.ErrorSet.REQUEST_PARAMETER_ERROR);
    }
    let data = await ContactsDB.updateContact(params);
    return {result: data};
};

async function _validateUpdateContactParams(params) {
    if (params.operation === 'update') {
        return true;
    } else {
        return false;
    }
}