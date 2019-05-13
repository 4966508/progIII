var cq = 7;
var n = 5;
var m = 5;
var matrix = [];
for (var my = 0; my < n; my++) {
    matrix[my] = [];
    for (var mx = 0; mx < m; mx++) {
        var r = Math.random();
        for (var i = 0; i < cq; i++) {
            if (i / cq <= r && r < (i + 1) / cq) {
                matrix[my][mx] = i;
            }
        }
    }
}

var Grass = require('./modules/class.grass');
var GrassEater = require('./modules/class.grasseater');
var Wolf = require('./modules/class.wolf');
var Poisoner = require('./modules/class.poisoner');
var Human = require('./modules/class.human');
var Cat = require('./modules/class.cat');

var stren;

var side = 120;
var season = 0;

var arrs = {
    "Grass": grassArr,
    "GrassEater": grasseaterArr,
    "Wolf": wolfArr,
    "Poisoner": poisonerArr,
    "Human": humanArr,
    "Cat": catArr,

    rightarray(cln) {
        switch (cln) {
            case "Grass":
                return grassArr;
            case "GrassEater":
                return grasseaterArr;
            case "Wolf":
                return wolfArr;
            case "Poisoner":
                return poisonerArr;
            case "Human":
                return humanArr;
            case "Cat":
                return catArr;
        }
    }
};

var tact = 0;

var grassArr = [];
var grasseaterArr = [];
var wolfArr = [];
var poisonerArr = [];
var humanArr = [];
var catArr = [];

function gend() {
    var r = Math.random();
    if (r < 1 / 2) {
        return 0;
    } else return 1;
}

function mouseClicked() {
    var r1 = mouseX % side;
    var r2 = mouseY % side;
    var X = (mouseX - r1) / side;
    var Y = (mouseY - r2) / side;
    var killArr = getCell(X, Y, 1);
    for (var l in killArr) {
        matrix[killArr[l]] = 0;
        searchinarr(grassArr, killArr[l]);
        searchinarr(grasseaterArr, killArr[l]);
        searchinarr(wolfArr, killArr[l]);
        searchinarr(poisonerArr, killArr[l]);
        searchinarr(humanArr, killArr[l]);
        searchinarr(catArr, killArr[l]);
    }
}

function setup() {
    frameRate(1);
    createCanvas(matrix[0].length * side, matrix.length * side);

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y, 1));
            } else if (matrix[y][x] == 2) {
                grasseaterArr.push(new GrassEater(x, y, 2, gend()));
            } else if (matrix[y][x] == 3) {
                wolfArr.push(new Wolf(x, y, 3, gend()));
            } else if (matrix[y][x] == 4) {
                poisonerArr.push(new Poisoner(x, y, 4));
            } else if (matrix[y][x] == 5) {
                humanArr.push(new Human(x, y, 5));
            } else if (matrix[y][x] == 6) {
                catArr.push(new Cat(x, y, 6));
            }
        }
    }
}


function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[0].length; x++) {

            if (matrix[y][x] == 1) {
                if (season == 0) {
                    fill("white");
                } else if (season == 3) {
                    fill("#d3aa30");
                } else fill("green");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("black");
            } else if (matrix[y][x] == 4) {
                fill("red");
            } else if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 5) {
                fill("#ffc300");
            } else if (matrix[y][x] == 6) {
                fill("#847b60");
            }
            rect(x * side, y * side, side, side);
        }
    }
    for (var f in grassArr) {
        grassArr[f].mul();
    }
    for (var g in grasseaterArr) {
        grasseaterArr[g].eat();
    }
    for (var h in wolfArr) {
        wolfArr[h].eat();
    }
    for (var i in poisonerArr) {
        poisonerArr[i].mul();
    }
    for (var j in humanArr) {
        humanArr[j].move();
    }
    for (var k in catArr) {
        catArr[k].eat();
    }
    if (tact < 3) {
        tact++;
    } else {
        tact = 0;
        season++;
        season %= 4;
    }
    var seasonp = document.getElementById("seasontime");
    if (season == 0) {
        seasonp.innerText = "Winter";
    } else if (season == 1) {
        seasonp.innerText = "Spring";
    } else if (season == 2) {
        seasonp.innerText = "Summer";
    } else if (season == 3) {
        seasonp.innerText = "Autumn";
    }
}

function getCell(xx, yy, tes) {
    var found = [];
    for (var y = 0; y <= 2 * tes; y++) {
        for (var x = 0; x <= 2 * tes; x++) {
            if (xx - x + tes >= 0 && yy - y + tes >= 0 && xx - x + tes < matrix[0].length && yy - y + tes < matrix.length) {
                found.push([xx + tes - x, yy + tes - y]);
            }
        }
    }
    return found;
}

function searchinarr(arr, elem) {
    for (var sear = arr.length - 1; sear >= 0; sear--) {
        if (arr[sear] === elem) {
            arr.splice(sear, 1);
        }
    }
}

function wind1(arr, strength) {
    for (var iter in arr) {
        var stugum = arr[iter].x - strength;
        if (stugum < 0) {
            arr[iter].die();
        }
        arr[iter].moveplace([stugum, arr[iter].y]);
    }
}

function wind2(arr, strength) {
    for (var iter in arr) {
        var stugum = arr[iter].x + strength;
        if (stugum > matrix[0].length) {
            arr[iter].die();
        }
        arr[iter].moveplace([stugum, arr[iter].y]);
    }
}

function wind3(arr, strength) {
    for (var iter in arr) {
        var stugum = arr[iter].y - strength;
        if (stugum < 0) {
            arr[iter].die();
        }
        arr[iter].moveplace([arr[iter].x, stugum]);
    }
}

function wind4(arr, strength) {
    for (var iter in arr) {
        var stugum = arr[iter].y + strength;
        if (stugum > matrix.length) {
            arr[iter].die();
        }
        arr[iter].moveplace([arr[iter].x, stugum]);
    }
}

function wind() {
    var ra = Math.random();

    if (ra > 0 / 4 && ra < 1 / 4) {
        wind1(grassArr, stren);
        wind1(grasseaterArr, stren);
        wind1(wolfArr, stren);
        wind1(poisonerArr, stren);
        wind1(humanArr, stren);
        wind1(catArr, stren);
    }
    else if (ra > 1 / 4 && ra < 2 / 4) {
        wind2(grassArr, stren);
        wind2(grasseaterArr, stren);
        wind2(wolfArr, stren);
        wind2(poisonerArr, stren);
        wind2(humanArr, stren);
        wind2(catArr, stren);
    }
    else if (ra > 2 / 4 && ra < 3 / 4) {
        wind3(grassArr, stren);
        wind3(grasseaterArr, stren);
        wind3(wolfArr, stren);
        wind3(poisonerArr, stren);
        wind3(humanArr, stren);
        wind3(catArr, stren);
    }
    else{
        wind4(grassArr, stren);
        wind4(grasseaterArr, stren);
        wind4(wolfArr, stren);
        wind4(poisonerArr, stren);
        wind4(humanArr, stren);
        wind4(catArr, stren);
    }
}