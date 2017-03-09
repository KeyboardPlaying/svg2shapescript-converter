let svg2ss = require('../src/js/conversion/generate-shapescript');
let assert = require('assert');
let fs = require('fs');
let xmldom = require('xmldom');

describe('Shapescript square parser', function () {
    it('should generate a filled square', function () {
        let parser = new xmldom.DOMParser();
        let svgText = fs.readFileSync(__dirname + '/test-shapescript-square-filled.svg', {encoding: 'utf-8'});
        let svgDocument = parser.parseFromString(svgText);
        let ss = svg2ss.generateShapeScript(svgDocument);
        // console.log(ss);
        assert.equal(ss.match(/Rectangle\(0,0,100,100\)/g).length, 1);
    });

    it('should generate a hollow square', function () {
        let parser = new xmldom.DOMParser();
        let svgText = fs.readFileSync(__dirname + '/test-shapescript-square-hollow.svg', {encoding: 'utf-8'});
        let svgDocument = parser.parseFromString(svgText);
        let ss = svg2ss.generateShapeScript(svgDocument);
        // console.log(ss);
        assert.equal(ss.match(/Rectangle\(0,0,100,100\)/g).length, 1);
    });

    it('should generate a thick square', function () {
        let parser = new xmldom.DOMParser();
        let svgText = fs.readFileSync(__dirname + '/test-shapescript-square-thick.svg', {encoding: 'utf-8'});
        let svgDocument = parser.parseFromString(svgText);
        let ss = svg2ss.generateShapeScript(svgDocument);
        // console.log(ss);
        assert.equal(ss.match(/SetPenWidth\(2\)/g).length, 1); 
        assert.equal(ss.match(/Rectangle\(0,0,100,100\)/g).length, 1);
    });
});

