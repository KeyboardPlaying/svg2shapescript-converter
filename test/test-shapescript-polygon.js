let svg2ss = require('../src/js/conversion/generate-shapescript');
let assert = require('assert');
let fs = require('fs');
let xmldom = require('xmldom');

describe('Shapescript polygon parser', function () {
    it('should generate a simple polygon path', function () {
        let parser = new xmldom.DOMParser();
        let svgText = fs.readFileSync(__dirname + '/test-shapescript-polygon.svg', {encoding: 'utf-8'});
        let svgDocument = parser.parseFromString(svgText);
        let ss = svg2ss.generateShapeScript(svgDocument);
        // console.log(ss);
        assert.equal(ss.match(/Rectangle\(/g), null);
        assert.equal(ss.match(/StartPath\(/g).length, 2);
        assert.equal(ss.match(/EndPath\(/g).length, 2);
        assert.equal(ss.match(/MoveTo\(/g).length, 2);
        assert.equal(ss.match(/LineTo\(/g).length, 10);
        assert.equal(ss.match(/FillPath\(/g).length, 1);
        assert.equal(ss.match(/StrokePath\(/g).length, 1);
    });
});

