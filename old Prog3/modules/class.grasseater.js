const Base = require('./class.base');
const random = require('./random');
module.exports =class GrassEater extends Base {
    constructor(x, y, index, gender) {
        super(x, y, index, gender);
        this.energyderivative = undefined;
    }
    seasonchange() {
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
        var khot = random(this.chooseCell(0, 1));
        super.eat(khot, grassArr);
        this.energy++;
        if (this.energy >= 12) {
            this.mul();
        } else {
            this.move();
        }

    }
    move() {
        this.seasonchange();
        var newCell = random(this.chooseCell(0, 1));
        var poison = random(this.chooseCell(4, 1));
        var khot = random(this.chooseCell(1, 2));
        if (khot) {
            matrix[Math.ceil((khot[1] + this.y) / 2)][Math.ceil((khot[0] + this.x) / 2)] = this.index;
            matrix[this.y][this.x] = 0;
            this.x = Math.ceil((khot[0] + this.x) / 2);
            this.y = Math.ceil((khot[1] + this.y) / 2);
        } else if (newCell) {
            matrix[newCell[1]][newCell[0]] = this.index;
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
        } else if (poison) {
            this.die();
        }
        this.energy -= this.energyderivative;
        if (this.energy <= 0) {
            this.die();
        }
    }
    mul() {
        var newge = random(this.chooseCell(0, 1, this.otherGender()));
        super.mul(grasseaterArr, newge);
    }
    die() {
        super.die(grasseaterArr);
    }
    moveplace(b){
        super.move(b);
    }
}