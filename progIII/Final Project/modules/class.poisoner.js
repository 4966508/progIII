const Base = require('./class.base');
const random = require('./random');
module.exports =class Poisoner extends Base {
    constructor(x, y, index) {
        super(x, y, index);
    }
    chooseCell(character) {
        return super.chooseCell(character, 1);
    }
    mul() {
        this.tact++;
        var newCell = random(this.chooseCell(0));

        if (this.tact >= 100) {
            super.mul(poisonerArr, newCell);
            this.tact = 0;
        }
    }
    die(){
        super.die(poisonerArr);
    }
    moveplace(ab){
        super.move(ab);
    }
}