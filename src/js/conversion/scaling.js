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

    get width() {
        return this._max_x - this._min_x;
    }

    get height() {
        return this._max_y - this._min_y;
    }

    get ratio() {
        return this.width / this.height;
    }

    get ratio_x() {
        return (this.width < this.height) ? this.ratio : 1.0;
    }

    get ratio_y() {
        return (this.width > this.height) ? 1.0 / this.ratio : 1.0;
    }

    get offset_x() {
        return 100 * (1 - this.ratio_x) / 2;
    }

    get offset_y() {
        return 100 * (1 - this.ratio_y) / 2;
    }

    scale_x(x) {
        return 100 * Scaler.scale(this._min_x, x, this._max_x) * this.ratio_x + this.offset_x;
    }

    scale_y(y) {
        return 100 * Scaler.scale(this._min_y, y, this._max_y) * this.ratio_y + this.offset_y;
    }

    scale_w(w) {
        return 100 * Scaler.scale(0, w, this._max_x - this._min_x) * this.ratio_x + this.offset_x;
    }

    scale_h(h) {
        return 100 * Scaler.scale(0, h, this._max_y - this._min_y) * this.ratio_y + this.offset_y;
    }

    static scale(min, value, max) {
        return (value - min) / (max - min);
    }
}

module.exports = {Scaler};
