class Scaler {

    constructor() {
        this._min_x = Number.MAX_VALUE;
        this._max_x = Number.MIN_VALUE;
        this._min_y = Number.MAX_VALUE;
        this._max_y = Number.MIN_VALUE;
    }

    register(x, y) {
        this._min_x = Math.min(x, this._min_x);
        this._max_x = Math.max(x, this._max_x);
        this._min_y = Math.min(y, this._min_y);
        this._max_y = Math.max(y, this._max_y);
    }

    scale_x(x) {
        return Scaler.scale(this._min_x, x, this._max_x);
    }

    scale_y(y) {
        return Scaler.scale(this._min_y, y, this._max_y);
    }

    scale_w(w) {
        return Scaler.scale(0, w, this._max_x - this._min_x);
    }

    scale_h(h) {
        return Scaler.scale(0, h, this._max_y - this._min_y);
    }

    static scale(min, value, max) {
        return (value - min) / (max - min);
    }
}

module.exports = {Scaler};
