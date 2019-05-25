const random = require('./random');
var rand4;
const Base = require('./class.base');
module.exports = class Cat extends Base {
    constructor(x, y, index, gender) {
        super(x, y, index, gender);
        this.tes = undefined;
        this.kittens = 4;
    }
    otherGender() {
        return super.otherGender();
    }
    seasonChange() {
        switch (season) {
            case 0:
            case 3:
                this.tes = 1;
                break;
            case 1:
            case 2:
                this.tes = 2;
                break;
        }
    }
    chooseCell(character, tes, gend) {
        super.getNewCoordinates();
        return super.chooseCell(character, tes, gend);
    }
    move() {
        super.move(random(this.chooseCell(0, this.tes)));
        this.energy -= 1;
    }
    mul() {
        this.seasonChange();
        var hellokitty = this.chooseCell(0, 1, this.otherGender());
        if (hellokitty.length <= this.kittens) {
            for (var i in hellokitty) {
                super.mul(catArr, hellokitty[i]);
            }
        }
        else {
            for (var j = 0; j < this.kittens; j++) {
                rand4 += random(3);
                rand4 %= 8;
                super.mul(catArr, hellokitty[rand4]);
            }
        }
    }
    eat() {
        var poisoner = random(this.chooseCell(4, this.tes));
        var gre = random(this.chooseCell(2, this.tes));
        if (poisoner) {
            super.eat(poisoner, poisonerArr);
            this.energy += 5;
        }
        else if (gre) {
            super.eat(gre, grasseaterArr);
            this.energy += 2;
        }
        if (this.energy >= 10) {
            this.mul();
        }
        if (this.energy >= 1) {
            this.move();
        }
        if(this.energy == 0){
            this.die();
        }
    }
    die() {
        super.die(catArr);
    }
    moveplace(ab){
        super.move(ab);
    }
}