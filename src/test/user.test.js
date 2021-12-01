const { describe, it, afterEach, before } = require('mocha');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect();
var assert = require('chai').assert
chai.use(chaiHttp);

let user = require('../../lib/index');
let User = require('../../lib/schemas/UserSchema.js')

describe('/POST user', () => {
    it('it should create an user', (done) => {
        const User = {
            username: "test2",
            password: "test2"
        }
        chai.request(user).post('/api/v1/user').send(User).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data')
                .which.is.an('object')
                .and.has.property('username').equal("test2");
            res.body.should.have.property('data')
                .which.is.an('object')
                .and.has.property('password').equal("test2");
            done();
        })
    })
    it('it should not create a new user', (done) => {
        const User = {}
        chai.request(user)
            .post('/api/v1/user')
            .send(User)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('ERROR');
                done();
            })
    })
    it('it should require username to create user', (done) => {
        const User = {
            password: "test2"
        }
        chai.request(user)
            .post('/api/v1/user')
            .send(User)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('ERROR');
                res.body.should.have.property('data')
                    .which.is.an('object')
                    .and.has.property('message').equal("Users validation failed: username: Username must not be empty");
                done();
            })
    })
    it('it should require password to create user', (done) => {
        const User = {
            username: "test2"
        }
        chai.request(user)
            .post('/api/v1/user')
            .send(User)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('ERROR');
                res.body.should.have.property('data')
                    .which.is.an('object')
                    .and.has.property('message').equal("Users validation failed: password: Password must not be empty");
                done();
            })
    })
})

describe('', () => {
    it('it should require new username', (done) => {
        const User = {
            username: "test1",
            password: "test1"
        }
        chai.request(user)
            .post('/api/v1/user')
            .send(User)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('User already exist!');
                done();
            })
    })
})

describe('/GET users', () => {
    it('should return an user', (done) => {
        chai.request(user).get('/api/v1/users').end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('OK');
            res.body.should.have.property('data').which.is.an('array')
                .with.lengthOf(2);
            done();
        })
    })
})

describe('/GET user', () => {
    it('it should return an user by username', (done) => {
        let username = "test1";
        chai.request(user).get('/api/v1/user/' + username).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data')
                .which.is.an('object')
                .and.has.property('username').equal("test1");
            done();
        })
    })
    it('it should return error when no username is provided in params', (done) => {
        let username = "test5";
        chai.request(user).get('/api/v1/user/' + username).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('OK');
            res.body.should.have.property('data').equal(null);
            done();
        })
    })
})

describe('/PUT user', () => {
    it('it should update an user by username', (done) => {
        const user1 = {
            username: "test6",
            password: "test6"
        }
        let username = "test2";
        chai.request(user).put('/api/v1/user/' + username)
            .send(user1)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data')
                    .which.is.an('object')
                    .and.has.property('username').equal("test6");
                done();
            })
    })
    it('it should return error when no username is provided in params', (done) => {
        let username = "test5";
        chai.request(user).put('/api/v1/user/' + username).end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('ERROR');
            done();
        })
    })
})

describe('/DELETE user', () => {
    it('it should delete an user by username', (done) => {
        let username = "test6";
        chai.request(user).delete('/api/v1/user/' + username)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data')
                    .which.is.an('object')
                    .and.has.property('username').equal("test6");
                done();
            })
    })
    it('should return error when no username is provided in params', (done) => {
        let username = "test7";
        chai.request(user).delete('/api/v1/user/' + username)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('ERROR');
                done();
            })
    })
})