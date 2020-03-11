"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const should = chai.should();
const expect = chai.expect();
const Branch = require("../models/Branch");

chai.use(chaiHttp);

describe("Branch tests", function() {
  it("should list all branches on admin/branches GET", function() {
    chai
      .request(app)
      .get("admin/branches")
      .end(function(err, res) {
        res.should.have.status(200);
      });
  });
});
