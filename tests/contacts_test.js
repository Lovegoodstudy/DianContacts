'use strict';

let chai = require('chai');
let expect = require('chai').expect;
const debug = require('debug')('TEST');

chai.use(require('chai-http'));
chai.use(require('chai-json-schema'));

let baseUrl = (process.env.NODE_ENV === 'production') ? 'http://13.230.86.164:20170' : 'http://localhost:20170';
let addContactsJsonSchema = {
    title: 'Add Contacts Response JSON Schema',
    type: 'object',
    required: ['result'],
    properties: {
        result: {
            type: 'object',
            required: ['contact_id', 'name', 'email', 'phone'],
            properties: {
                contact_id: {type: 'string'},
                name: {type: 'string'},
                email: {type: 'string'},
                phone: {type: 'string'}
            }
        }
    }
};
let getContactsJsonSchema = {
    title: 'Add Contacts Response JSON Schema',
    type: 'object',
    required: ['result'],
    properties: {
        result: {
            type: 'array',
            items: {
                type: 'object',
                required: ['contact_id', 'name', 'email', 'phone'],
                properties: {
                    contact_id: {type: 'string'},
                    name: {type: 'string'},
                    email: {type: 'string'},
                    phone: {type: 'string'}
                }
            }
        }
    }
};
let deleteContactsSuccessJson = {
    "result": {
        "n": 1,
        "ok": 1
    }
};
let updateContactsSuccessJson = {
    "result": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
};


describe('Contacts API', () => {
    it('Add Contact', done => {
        let testBody = {
            phone: '18827054817',
            name: 'dian',
            email: 'email@email.com'
        };
        chai.request(baseUrl)
            .post('/contacts')
            .send(testBody)
            .end((err, res) => {
                if (err) {
                    debug(`error => ${err.stack}`);
                    done(err);
                } else {
                    expect(res.body).to.be.jsonSchema(addContactsJsonSchema);
                    debug(`response => ${JSON.stringify(res.body, null, 2)}`);
                    done();
                }
            });
    });
    it('Get Contact', done => {
        chai.request(baseUrl)
            .get('/contacts')
            .send()
            .end((err, res) => {
                if (err) {
                    debug(`error => ${err.stack}`);
                    done(err);
                } else {
                    expect(res.body).to.be.jsonSchema(getContactsJsonSchema);
                    debug(`response => ${JSON.stringify(res.body, null, 2)}`);
                    done();
                }
            });
    });
    it('Delete Contact', done => {
        let testBody = {
            phone: '18827054817',
            name: 'dian',
            email: 'email@email.com'
        };
        chai.request(baseUrl)
            .post('/contacts')
            .send(testBody)
            .end((err, res) => {
                if (err) {
                    debug(`error => ${err.stack}`);
                    done(err);
                } else {
                    chai.request(baseUrl)
                        .delete(`/contacts/${res.body.result.contact_id}`)
                        .send()
                        .end((err, res) => {
                            if (err) {
                                debug(`error => ${err.stack}`);
                                done(err);
                            } else {
                                expect(res.body).to.eql(deleteContactsSuccessJson);
                                debug(`response => ${JSON.stringify(res.body, null, 2)}`);
                                done();
                            }
                        })
                }
            });
    });
    it('Update Contact', done => {
        let testBody = {
            phone: '18827054817',
            name: 'dian',
            email: 'email@email.com'
        };
        chai.request(baseUrl)
            .post('/contacts')
            .send(testBody)
            .end((err, res) => {
                if (err) {
                    debug(`error => ${err.stack}`);
                    done(err);
                } else {
                    let updateBody = {
                        phone: '18827054817',
                        name: 'dian',
                        email: 'email@qq.com'
                    };
                    chai.request(baseUrl)
                        .put(`/contacts/${res.body.result.contact_id}`)
                        .send(updateBody)
                        .end((err, res) => {
                            if (err) {
                                debug(`error => ${err.stack}`);
                                done(err);
                            } else {
                                expect(res.body).to.eql(updateContactsSuccessJson);
                                debug(`response => ${JSON.stringify(res.body, null, 2)}`);
                                done();
                            }
                        })
                }
            });
    });
});
