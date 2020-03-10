'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index');
var should = chai.should();
const expect = chai.expect()

chai.use(chaiHttp);

describe('Authors', function() {
    it('should list all authors on /admin/author GET', function () {
        chai.request(app)
        .get('/admin/author')
        .end(function(err, res) {
            res.should.have.status(200);
        });
    });

    it('should add a single author on /admin/author POST', function () {
        chai.request(app)
        .post('/admin/author')
        .send({'name' : 'Jack Kerouac'})
        .end(function(err, res) {
            res.should.have.status(201)
            expect(res.body).to.have.property('name');
        })
    });
    it('should update a single author on /admin/author PUT');
    it('should delete a single author on /admin/author/<id> DELETE');
  });
