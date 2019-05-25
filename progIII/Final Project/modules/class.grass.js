var newgr;
const random = require('./random');
const Base = require('./class.base');
module.exports = class Grass extends Base {
    constructor(x, y, index) {
        super(x, y, index);
        this.tactderivative = undefined;
    }
    seasonChange() {
        switch (season) {
            case 0:
                this.tactderivative = 1;
                break;
            case 3:
                this.tactderivative = 2;
                break;
            default:
                this.tactderivative = 3;
                break;
        }
    }
    chooseCell(character) {
        return super.chooseCell(character, 1);
    }
    mul() {
        newgr = random(this.chooseCell(0));
        if (this.tact >= 1) {
            super.mul(grassArr, newgr);
            dataArr.bornGrass++;
        }
        this.tact+=this.tactderivative;
        if (this.tact == 10) {
            this.tact = 0;
            this.mul();
        }
    }
    die(){
        super.die(grassArr);
    }
    moveplace(a){
        super.move(a);
    }
}