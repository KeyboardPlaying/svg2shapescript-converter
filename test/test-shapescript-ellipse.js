let svg2ss = require('../src/js/conversion/generate-shapescript');
let assert = require('assert');
let fs = require('fs');
let xmldom = require('xmldom');

describe('Shapescript ellipse parser', function () {
    it('should generate a simple ellipse', function () {
        let parser = new xmldom.DOMParser();
        let svgText = fs.readFileSync(__dirname + '/test-shapescript-ellipse-h.svg', {encoding: 'utf-8'});
        let svgDocument = parser.parseFromString(svgText);
        let ss = svg2ss.generateShapeScript(svgDocument);
        console.log(ss);
        assert.equal(ss.match(/Ellipse\(/g).length, 1);
    });
});

