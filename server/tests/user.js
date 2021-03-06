/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';
import signInData from '../testData/users';

chai.use(chaiHttp);
chai.should();

const testUserId = 1;
const noId = 1033;

const { admin } = signInData;

let adminToken;


describe('Users Endpoints', () => {
  before('Get request tokens', async () => {
    try {
      const res = await chai.request(app).post('/api/v1/auth/signin').send(admin);
      adminToken = res.body.data[0].token;
    } catch (error) {
      console.log(error);
    }
  });
  describe('GET /users/:userId', () => {
    it('should get a single user with the specified id', (done) => {
      chai.request(app).get(`/api/v1/users/${testUserId}`)
        .set('x-auth-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data');
          res.body.data.should.be.an('array');
          res.body.data[0].should.have.property('firstname');
          res.body.data[0].firstname.should.be.a('string');
          res.body.data[0].should.have.property('lastname');
          res.body.data[0].lastname.should.be.a('string');
          res.body.data[0].should.have.property('email');
          res.body.data[0].email.should.be.a('string');
          res.body.data[0].should.have.property('password');
          res.body.data[0].password.should.be.a('string');
          res.body.data[0].should.have.property('isadmin');
          res.body.data[0].isadmin.should.be.a('boolean');
          res.body.data[0].should.have.property('type');
          res.body.data[0].type.should.be.a('string');
          res.body.data[0].should.have.property('id');
          res.body.data[0].id.should.be.an('number');
          done();
        });
    });
    it('should return a 404 error if id is not found', (done) => {
      chai.request(app).get(`/api/v1/users/${noId}`)
        .set('x-auth-token', adminToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('error').eql('User with specified id not found!');
          done();
        });
    });
  });
  describe('GET /users', () => {
    it('should get all users', (done) => {
      chai.request(app).get('/api/v1/users')
        .set('x-auth-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data');
          res.body.data.should.be.an('array');
          res.body.data[0].should.have.property('firstname');
          res.body.data[0].firstname.should.be.a('string');
          res.body.data[0].should.have.property('lastname');
          res.body.data[0].lastname.should.be.a('string');
          res.body.data[0].should.have.property('email');
          res.body.data[0].email.should.be.a('string');
          res.body.data[0].should.have.property('password');
          res.body.data[0].password.should.be.a('string');
          res.body.data[0].should.have.property('isadmin');
          res.body.data[0].isadmin.should.be.a('boolean');
          res.body.data[0].should.have.property('type');
          res.body.data[0].type.should.be.a('string');
          res.body.data[0].should.have.property('id');
          res.body.data[0].id.should.be.an('number');
          done();
        });
    });
  });
});
