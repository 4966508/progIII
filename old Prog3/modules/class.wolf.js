var randomgaylmard = Math.random();
const Base = require('./class.base');
module.exports = class Wolf extends Base {
    constructor(x, y, index, gender) {
        super(x, y, index, gender);
        this.energyderivative = undefined;
    }
    seasonChange() {
        switch (season) {
            case 0:
                this.energyderivative = 1;
                break;
            case 3:
                this.energyderivative = 2;
                break;
            default:
                this.energyderivative = 3;
                break;
        }
    }
    otherGender() {
        return super.otherGender();
    }
    chooseCell(character, tes, gender) {
        super.getNewCoordinates(tes);
        return super.chooseCell(character, tes, gender);
    }
    eat() {
        var ge = random(this.chooseCell(2, 2));
        var mard = random(this.chooseCell(5, 2));
        var katu = random(this.chooseCell(6, 2));
        if (ge) {
            super.eat(ge, grasseaterArr);
        } else if (katu) {
            super.eat(katu, catArr);
        }
        this.energy++;
        if (this.energy >= 12) {
            this.mul();
        }
        if (mard && randomgaylmard <= 1 / 2) {
            super.eat(mard, humanArr);
            this.energy += 2;
            if (this.energy >= 12) {
                this.mul();
            }
        } else {
            this.move();
        }

    }
    move() {
        this.seasonChange();
        var newCell = random(this.chooseCell(0, 2));
        var khotaker = random(this.chooseCell(2, 2));
        if (khotaker) {
            matrix[Math.ceil((khotaker[1] + this.y) / 2)][Math.ceil((khotaker[0] + this.x) / 2)] = this.index;
            matrix[this.y][this.x] = 0;
            this.x = Math.ceil((khotaker[0] + this.x) / 2);
            this.y = Math.ceil((khotaker[1] + this.y) / 2);
        }

        if (newCell) {
            super.move(newCell);
        }
        this.energy -= this.energyderivative;
        if (this.energy <= 0) {
            this.die();
        }
    }
    mul() {
        var newGE = random(this.chooseCell(0, 1, this.otherGender()));
        super.mul(wolfArr, newGE);
    }
    die() {
        super.die(wolfArr);
    }
    moveplace(ab){
        super.move(ab);
    }
}