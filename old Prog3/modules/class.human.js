var randomgaylmard = Math.random();
var newX;
var newY;
const Base = require('./class.base');
module.exports =class Human extends Base {
    constructor(x, y, index) {
        super(x, y, index);
        this.tes = undefined;
    }
    seasonChange() {
        switch (season) {
            case 0:
                this.tes = 1;
                break;
            case 2:
                this.tes = 3;
                break;
            default:
                this.tes = 2;
                break;
        }
    }
    chooseCell(character, tes) {
        super.getNewCoordinates(tes);
        return super.chooseCell(character, tes);
    }
    move() {
        this.seasonChange();
        var gr = random(this.chooseCell(1, this.tes));
        var datark = random(this.chooseCell(0, this.tes));
        if (gr && gr[0] >= 0 && gr[1] >= 0) {
            matrix[gr[1]][gr[0]] = this.index;
            newX = gr[0];
            newY = gr[1];
            for (var i in grassArr) {
                if (newX === grassArr[i][0] && newY === grassArr[i][1]) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        } else if (datark && datark[0] >= 0 && datark[1] >= 0) {
            matrix[datark[1]][datark[0]] = this.index;
            newX = datark[0];
            newY = datark[1];
        } else {
            newY = this.y;
            newX = this.x;
        }
        matrix[this.y][this.x] = 0;

        this.y = newY;
        this.x = newX;
        this.mul();
    }
    mul() {
        var another = random(this.chooseCell(this.index, 1));
        if (another) {
            for (var q in this.directions) {
                if (this.directions[q][0] === another[0] && this.directions[q][1] === another[1]) {
                    this.directions.splice(q, 1);
                    break;
                }
            }
            var newHuman = random(this.directions);
            super.mul(humanArr, newHuman);
        }
    }
    eat() {
        var gayl = random(this.chooseCell(3, 1));
        if (randomgaylmard > 1 / 2 && gayl) {
            super.eat(gayl, wolfArr);
        }
    }
    die(){
        super.die(humanArr);
    }
    moveplace(ab){
        super.move(ab);
    }
}