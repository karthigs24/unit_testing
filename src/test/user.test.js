//During the test the env variable is set to test
// process.env.NODE_ENV = 'test';

const { describe, it, afterEach, before } = require('mocha');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

let user = require('../../lib/index');
const User = require('../../lib/schemas/UserSchema.js')


// describe('/POST user', () => {
//     it('should create an user', (done) => {
//         const User = {
//             username: "test1",
//             password: "test1"
//         }
//         chai.request(user).post('/api/v1/user').send(User).end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             res.body.should.have.property('data')
//                 .which.is.an('object')
//                 .and.has.property('username').equal("test1");
//             res.body.should.have.property('data')
//                 .which.is.an('object')
//                 .and.has.property('password').equal("test1");
//             done();
//         })
//     })
// })

// describe('/GET users', () => {
//     it('should return an user', (done) => {
//         chai.request(user).get('/api/v1/users').end((err, res) => {
//             // res.should.have.status(200);
//             // res.body.should.be.a('object');
//             // res.body.should.have.property('data').which.is.an('object').length.should.be.eql(2);
//             // res.body.which.is.an('object').length.should.be.eql(2);
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             res.body.length.should.be.eql(0);
//             done();
//         })
//     })
// })

describe('/GET user', () => {
    it('should return an user by username', (done) => {
        let user = new User({username:"testok",password:"okokok"});
        user.save((err,user)=>{
            chai.request(user).get('/api/v1/user/'+user.username).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data')
                .which.is.an('object')
                .and.has.property('username').equal("user.username");
                done();
            })
        })
       
    })
})

   