let scaling = require('../src/js/conversion/scaling');
let assert = require('assert');

describe('Scaler', function () {
    it('should transform simple values', function () {
        let scaler = new scaling.Scaler();
        scaler.register(0, 0);
        scaler.register(2, 2);
        assert.equal(scaler.scale_x(1), 50);
        assert.equal(scaler.scale_y(1), 50);
        assert.equal(scaler.scale_w(1), 50);
        assert.equal(scaler.scale_h(1), 50);
    });

    it('should transform values higher than zero', function () {
        let scaler = new scaling.Scaler();
        scaler.register(1, 1);
        scaler.register(2, 2);
        assert.equal(scaler.scale_x(1.5), 50);
        assert.equal(scaler.scale_y(1.5), 50);
        assert.equal(scaler.scale_w(1), 100);
        assert.equal(scaler.scale_h(1), 100);
    });

    it('should support negative values', function () {
        let scaler = new scaling.Scaler();
        scaler.register(-1, -1);
        scaler.register(3, 3);
        assert.equal(scaler.scale_x(-2), -25);
        assert.equal(scaler.scale_y(-2), -25);
        assert.equal(scaler.scale_x(-1), 0);
        assert.equal(scaler.scale_y(-1), 0);
        assert.equal(scaler.scale_x(0), 25);
        assert.equal(scaler.scale_y(0), 25);
        assert.equal(scaler.scale_x(1), 50);
        assert.equal(scaler.scale_y(1), 50);
        assert.equal(scaler.scale_x(2), 75);
        assert.equal(scaler.scale_y(2), 75);
    });

    it('should preserve aspect ratio horizontally', function () {
        let scaler = new scaling.Scaler();
        scaler.register(0, 0);
        scaler.register(20, 10);
        assert.equal(scaler.scale_x(10), 50);
        assert.equal(scaler.scale_y(10), 75);

        assert.equal(scaler.scale_x(0), 0);
        assert.equal(scaler.scale_y(0), 25);
    });

    it('should preserve aspect ratio vertically', function () {
        let scaler = new scaling.Scaler();
        scaler.register(0, 0);
        scaler.register(10, 20);
        assert.equal(scaler.scale_x(10), 75);
        assert.equal(scaler.scale_y(10), 50);

        assert.equal(scaler.scale_x(0), 25);
        assert.equal(scaler.scale_y(0), 0);
    });
});
