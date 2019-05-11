class Base {
    constructor(x, y, index, gender) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.directions = [];
        this.gender = gender;
        this.tact = 0;
        this.energy = 8;
    }
    otherGender() {
        if (this.gender === 0) {
            return 1;
        } else return 0;
    }
    getNewCoordinates(tes) {
        for (var y = 0; y <= 2 * tes; y++) {
            for (var x = 0; x <= 2 * tes; x++) {
                if (this.x - x + tes >= 0 && this.y - y + tes >= 0 && this.x - x + tes < matrix[0].length && this.y - y + tes < matrix.length) {
                    this.directions.push([this.x + tes - x, this.y + tes - y]);
                }
            }
        }
        for (var i in this.directions) {
            if (this.directions[i][0] == this.x && this.directions[i][1] == this.y) {
                this.directions.splice(i, 1);
                break;
            }
        }
    }
    chooseCell(character, tes, gend) {
        this.getNewCoordinates(tes);
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (gend === undefined) {
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length && matrix[y][x] == character) {
                    found.push(this.directions[i]);
                } else {
                    var thisclassname = this.__proto__.constructor.name;
                    for (var j in arrs.rightarray(thisclassname)) {
                        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length && matrix[y][x] == character && arrs.rightarray(thisclassname)[j].gender == gend) {
                            found.push(this.directions[i]);
                        }
                    }
                }
            }
        }
        return found;
    }

    eat(khot, eatArr) {
        if (khot) {
            matrix[khot[1]][khot[0]] = this.index;
            matrix[this.y][this.x] = 0;
            for (var j in eatArr) {
                if (eatArr[j].x == khot[0] && eatArr[j].y == khot[1]) {
                    eatArr.splice(j, 1);
                    break;
                }
            }
            this.x = khot[0];
            this.y = khot[1];
        }
    }
    move(newCell) {
        if (newCell) {
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = this.index;
            this.x = newCell[0];
            this.y = newCell[1];
        }
    }
    mul(mulArr, newCre) {
        if (newCre) {
            matrix[newCre[1]][newCre[0]] = this.index;
            switch (mulArr) {
                case grassArr:
                    grassArr.push(new Grass(newCre[0], newCre[1], 1));
                    break;
                case grasseaterArr:
                    grasseaterArr.push(new GrassEater(newCre[0], newCre[1], 2));
                    break;
                case wolfArr:
                    wolfArr.push(new Wolf(newCre[0], newCre[1], 3));
                    break;
                case poisonerArr:
                    poisonerArr.push(new Poisoner(newCre[0], newCre[1], 4));
                    break;
                case humanArr:
                    humanArr.push(new Human(newCre[0], newCre[1], 5));
                    break;
                case catArr:
                    catArr.push(new Cat(newCre[0], newCre[1], 6));
            }
        }
        this.tact++;
        if(this.tact <= 10){
            this.tact++;
        }
        else {
            this.tact=-1;
            this.mul();
        }
    }
    die(dieArr) {
        matrix[this.y][this.x] = 0;
        for (var s in dieArr) {
            if (dieArr[s][0] == this.x && dieArr[s][1] == this.y) {
                dieArr.splice(s, 1);
                break;
            }
        }
    }
}