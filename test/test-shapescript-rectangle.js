let svg2ss = require('../src/js/conversion/generate-shapescript');
let assert = require('assert');
let fs = require('fs');
let xmldom = require('xmldom');

let xml = require('../src/js/conversion/xml');
let sinon = require('sinon');

describe('Shapescript', function () {
    it('should generate a simple rectangle', function () {
        sinon.stub(xml, 'parser', function () {
            return new xmldom.DOMParser();
        });

        let svg = fs.readFileSync(__dirname + '/test-shapescript-rectangle.svg', {encoding: 'utf-8'});
        let ss = svg2ss.generateScript(svg);
        // console.log(ss);
        assert(ss.includes('Rectangle'));
    });
});

