"use strict";

var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var path = require("path");
var Tester = require("./tester");

var Testtease = function(config) {

    this.options = {};

    if(typeof config === "string") {
        this.config = require(config);
    }else if (typeof config === "object") {
        this.config = config;
    }else {
        throw new Error("configurations are expected to be a string path to a json file or an object.");
    }

    if(this.config.app && typeof this.config.app === "string") {
        this.options.app = require(this.config.app)
    }else {
        throw new Error("app path is expected to be a string.");
    }

    if(!this.config.tests || typeof this.config.tests === "array") {
        throw new Error("tests are expected to be an array of objects.");
    }

    if(this.config.autoUpdateData === undefined) {
        this.options.autoUpdateData = true;
    }else{
        this.options.autoUpdateData = this.config.autoUpdateData;
    }

    if(this.config.responseNode !== undefined) {
        this.options.responseNode = "default";
    }else if (typeof this.config.responseNode != "string") {
        throw new Error("responseNode is expected to be a String.");
    }else{
        this.options.responseNode = this.config.responseNode;
    }

    var _this = this;

    var tester = new Tester(_this.options);

    this.config.tests.forEach(function(test) {

        if(typeof test !== "object") {
            throw new Error("each test is expected to be an object.");
        }

        var testConfig = {
            name: test.name,
            route: test.path,
        };

        _.merge(testConfig, _this.options);

        describe(test.name, function() {
            tester.post(test.test.post, require(test.data), testConfig);
        });

    });

};

module.exports = function(config) {
    return new Testtease(config);
}
