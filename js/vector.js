function Vector (x, y) {
	if (!(this instanceof Vector)) {
		return new Vector(x, y);
	}
    
	this.x = x || 0;
	this.y = y || 0;
};

Vector.prototype.magnitude = function () {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
};

Vector.prototype.equals = function (other) {
    return this.x === other.x && this.y === other.y;
};

Vector.prototype.add = function (vec) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
};

Vector.prototype.substract = function (vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
};

Vector.substract = function (v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
};

Vector.prototype.divide = function (vec) {
    this.x /= vec.x;
    this.y /= vec.y;
    return this;
};

Vector.prototype.divideScalar = function (scalar) {
    this.x /= scalar;
    this.y /= scalar;
    return this;
};

Vector.prototype.multiply = function (vec) {
    this.x *= vec.x;
    this.y *= vec.y;
    return this;
};

Vector.prototype.normalize = function () {
    var length = this.magnitude();

	if (length === 0) {
        this.x = 1;
		this.y = 0;
	} else {
		this.divide(Vector(length, length));
	}
	return this;
};

Vector.prototype.randomize = function (topLeft, bottomRight) {
	this.randomizeX(topLeft, bottomRight);
	this.randomizeY(topLeft, bottomRight);

	return this;
};

Vector.prototype.randomizeX = function (topLeft, bottomRight) {
	var min = Math.min(topLeft.x, bottomRight.x);
	var max = Math.max(topLeft.x, bottomRight.x);
	this.x = random(min, max);
	return this;
};

Vector.prototype.randomizeY = function (topLeft, bottomRight) {
	var min = Math.min(topLeft.y, bottomRight.y);
	var max = Math.max(topLeft.y, bottomRight.y);
	this.y = random(min, max);
	return this;
};

Vector.prototype.isZero = function() {
	return this.x === 0 && this.y === 0;
};

Vector.prototype.distance = function (vec) {
    var dx = this.x - vec.x,
        dy = this.y - vec.y;
    
    return Math.sqrt(dx * dx + dy * dy);
};

function random (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}