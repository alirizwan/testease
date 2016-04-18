"use strict";

var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var request = require("supertest-as-promised");
var Promise = require("bluebird");

chai.should();
chai.use(sinonChai);

var Tester = function(options){

    this.options = options;
    var _this;

    function post(options, data, config){

        var code = 201;
        var route = "/";

        if(config.code !== undefined) {
            code = config.code;
        }

        if(config.route !== undefined) {
            route = config.route;
        }

        var promises = [];

        data.forEach(function(test) {
            promises.push(
                it(options.description, function() {
                    return request(_this.options.app)
                        .post(route + (config.path || ""))
                        .send(test)
                        .expect(code)
                }));
        });

        return Promise.all(promises).then(function(results){
            var data = [];
            results.forEach(function(r){
                data.push((_this.options.responseNode && _this.options.responseNode !== "default" ? r.body[_this.options.responseNode] : r.body));
            });
            //return resolve(data);
        });
    }

    function get (options, data, config){
        var code = 200;
        var route = "/";

        if(config.code !== undefined) {
            code = config.code;
        }

        if(config.route !== undefined) {
            route = config.route;
        }

        var promises = [];

        data.forEach(function(test) {
            promises.push(
                it(options.description, function() {
                    return request(_this.options.app)
                        .get(route + (config.path || ""))
                        .expect(code)
                }));
        });

        return Promise.all(promises).then(function(results){
            var data = [];
            results.forEach(function(r){
                data.push((_this.options.responseNode && _this.options.responseNode !== "default" ? r.body[_this.options.responseNode] : r.body));
            });
        });
    }

    function delete (options, data, config){
        var code = 200;
        var route = "/";

        if(config.code !== undefined) {
            code = config.code;
        }

        if(config.route !== undefined) {
            route = config.route;
        }

        var promises = [];

        data.forEach(function(test) {
            promises.push(
                it(options.description, function() {
                    return request(_this.options.app)
                        .delete(route + (config.path || ""))
                        .expect(code)
                }));
        });

        return Promise.all(promises).then(function(results){
            var data = [];
            results.forEach(function(r){
                data.push((_this.options.responseNode && _this.options.responseNode !== "default" ? r.body[_this.options.responseNode] : r.body));
            });
        });
    }

    function put (options, data, config){
        var code = 200;
        var route = "/";

        if(config.code !== undefined) {
            code = config.code;
        }

        if(config.route !== undefined) {
            route = config.route;
        }

        var promises = [];

        data.forEach(function(test) {
            promises.push(
                it(options.description, function() {
                    return request(_this.options.app)
                        .put(route + (config.path || ""))
                        .send(test)
                        .expect(code)
                }));
        });

        return Promise.all(promises).then(function(results){
            var data = [];
            results.forEach(function(r){
                data.push((_this.options.responseNode && _this.options.responseNode !== "default" ? r.body[_this.options.responseNode] : r.body));
            });
        });
    }

    this.post = post;
    _this = this;

};

module.exports = Tester;
