export default class CubeLocation {
    constructor(totalItem, radius) {
        this._numberOfCube = totalItem;
        this._slice = (Math.PI * 2) / totalItem;
        this._angel = this._slice;
        this._locationPoints = [];
        this._radius = radius;

        return this._createLocationPoints();
    }

    _createLocationPoints() {
        for (let index = 0; index < this._numberOfCube; index++) {
            var z = Math.sin(this._angel) * this._radius;
            var x = Math.cos(this._angel) * this._radius;
            this._locationPoints.push({x: x, z: z, angel: this._angel});
            this._angel += this._slice;
        }
        return this._locationPoints;
    }
}
