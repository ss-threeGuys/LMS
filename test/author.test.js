'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const should = chai.should();
const expect = chai.expect();
const Author = require('../models/Author');


chai.use(chaiHttp);

describe('Authors tests', function () {
    
    before( () => {
        return Author.deleteMany();
    })
    
    it('should list all authors on /admin/author GET', function () {
        chai.request(app)
            .get('/admin/author')
            .end(function (err, res) {
                res.should.have.status(200);
            });
    });

    it('should add a single author on /admin/author POST', function () {
        chai.request(app)
            .post('/admin/author')
            .send({ 'name': 'Jack Kerouac' })
            .end(function (err, res) {
                res.should.have.status(201)
                res.body.should.have.property('name');
                res.body.should.have.property('_id');
            })
    });
    it('should return 400 if no id on /admin/author PUT', function () {
        chai.request(app)
            .put('/admin/author')
            .send({ 'name': 'Jim Jones' })
            .end(function (err, res) {
                res.should.have.status(400);
            });
    });
    it('should delete a single author on /admin/author/<id> DELETE', function () {
        chai.request(app)
        .post("/admin/author")
        .send({'name' : 'John Milton'})
        .then(res => {
            chai.request(app)
            .delete('/admin/author/' + res.body._id)
            .end(function (err, res) {
                res.should.have.status(204);      
            })
        })
        
    });
});
