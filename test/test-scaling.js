let scaling = require('../src/js/conversion/scaling');
let assert = require('assert');

describe('Scaler', function () {
    it('should transform simple values', function () {
        let scaler = new scaling.Scaler();
        scaler.register(0, 0);
        scaler.register(2, 2);
        assert.equal(scaler.scale_x(1), 0.5);
        assert.equal(scaler.scale_y(1), 0.5);
        assert.equal(scaler.scale_w(1), 0.5);
        assert.equal(scaler.scale_h(1), 0.5);
    });

    it('should transform values higher than zero', function () {
        let scaler = new scaling.Scaler();
        scaler.register(1, 1);
        scaler.register(2, 2);
        assert.equal(scaler.scale_x(1.5), 0.5);
        assert.equal(scaler.scale_y(1.5), 0.5);
        assert.equal(scaler.scale_w(1), 1);
        assert.equal(scaler.scale_h(1), 1);
    });

    it('should support negative values', function () {
        let scaler = new scaling.Scaler();
        scaler.register(-1, -1);
        scaler.register(3, 3);
        assert.equal(scaler.scale_x(-2), -0.25);
        assert.equal(scaler.scale_y(-2), -0.25);
        assert.equal(scaler.scale_x(-1), 0);
        assert.equal(scaler.scale_y(-1), 0);
        assert.equal(scaler.scale_x(0), 0.25);
        assert.equal(scaler.scale_y(0), 0.25);
        assert.equal(scaler.scale_x(1), 0.5);
        assert.equal(scaler.scale_y(1), 0.5);
        assert.equal(scaler.scale_x(2), 0.75);
        assert.equal(scaler.scale_y(2), 0.75);
    });

    it('should preserve aspect ratio', function () {
        let scaler = new scaling.Scaler();
        scaler.register(0, 0);
        scaler.register(20, 10);
        assert.equal(scaler.scale_x(10), 0.5);
        // assert.equal(scaler.scale_y(10), 0.5);
    });
});
