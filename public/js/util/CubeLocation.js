export default class CubeLocation {
    constructor(totalItem, radius) {
        this._numberOfCube = totalItem;
        this._slice = (Math.PI * 2) / totalItem;
        this._angel = this._slice;
        this._locationPoints = [];
        this._radius = radius;

    }

    createLocationPoints() {
        for (let index = 0; index < this._numberOfCube; index++) {
            let z = Math.sin(this._angel) * this._radius;
            let x = Math.cos(this._angel) * this._radius;
            this._locationPoints.push({x: x, z: z, angel: this._angel});
            this._angel += this._slice;
        }
        return this._locationPoints;
    }

    createSimpleLocationPoints() {
        let spaceBetween = 200;
        for (let index = 0; index < this._numberOfCube; index++) {
            let z = 0;
            let x = spaceBetween*index - window.innerWidth;
            this._locationPoints.push({x: x, z: z, angel: this._angel});
            this._angel += this._slice;
        }
        return this._locationPoints;
    }

    // create stack 3 by 3 cube
    createSimpleStackPoints() {
        let yPoint = 0;
        let zPoint = 0;
        let spaceBetween = 200;
        console.log('this._cubeLocation: 3' , this._numberOfCube);
        for(let index = 0; index < this._numberOfCube; index++) {

            let x = index%3;
            let z = index%9;
            if(index !== 0 && x === 0) {
                yPoint++;
            }
            if(index!= 0 &&  z === 0 ) {
                zPoint++;
                yPoint = 0;
            }
            this._locationPoints.push({
                x: x*spaceBetween,
                y: yPoint*spaceBetween ,
                z:zPoint*spaceBetween,
                angel:this._angel});

            this._angel +=this._slice;
        }

        return this._locationPoints;

    }
}
