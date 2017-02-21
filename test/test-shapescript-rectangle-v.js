import svg2ss from '../src/js/conversion/generate-shapescript';
import assert from 'assert';
import fs from 'fs';
import xmldom from 'xmldom';

import xml from '../src/js/conversion/xml';
import sinon from 'sinon';

describe('Shapescript', function () {
    it('should generate a simple rectangle', function () {
        sinon.stub(xml, 'parser', function () {
            return new xmldom.DOMParser();
        });

        let svg = fs.readFileSync(__dirname + '/test-shapescript-rectangle-v.svg', {encoding: 'utf-8'});
        let ss = svg2ss.generateScript(svg);
        // console.log(ss);
        assert.equal(ss.match(/Rectangle/g).length, 1);
    });
});

