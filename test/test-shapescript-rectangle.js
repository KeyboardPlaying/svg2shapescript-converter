let svg2ss = require('../src/js/conversion/generate-shapescript');
let assert = require('assert');
let fs = require('fs');
let xmldom = require('xmldom');

describe('Shapescript rectangle parser', function () {
    it('should generate a simple rectangle', function () {
        let parser = new xmldom.DOMParser();
        let svgText = fs.readFileSync(__dirname + '/test-shapescript-rectangle-v.svg', {encoding: 'utf-8'});
        let svgDocument = parser.parseFromString(svgText);
        let ss = svg2ss.generateShapeScript(svgDocument);
        // console.log(ss);
        assert.equal(ss.match(/Rectangle\(0\.29.*,0,0.70.*,1\)/g).length, 1);
    });

    it('should generate overlapping rectangles', function () {
        let parser = new xmldom.DOMParser();
        let svgText = fs.readFileSync(__dirname + '/test-shapescript-rectangle-over.svg', {encoding: 'utf-8'});
        let svgDocument = parser.parseFromString(svgText);
        let ss = svg2ss.generateShapeScript(svgDocument);
        // console.log(ss);
        assert.equal(ss.match(/Rectangle\(/g).length, 2);
    });
});

