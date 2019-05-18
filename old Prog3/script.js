var stren;
var season;
var matrix;
const client = io();
var tact = 0;


function setup() {
    frameRate(1);
    createCanvas(matrix[0].length * side, matrix.length * side);
}

function draw() {
    client.on('send matrix & season', function (sentmatrix, sentseason) {
        matrix = sentmatrix;
        season = sentseason;
    });
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

function mouseClicked() {
    var r1 = mouseX % side;
    var r2 = mouseY % side;
    var X = (mouseX - r1) / side;
    var Y = (mouseY - r2) / side;
    var killArr = getCell(X, Y, 1);
    for (var l in killArr) {
        matrix[killArr[l]] = 0;
        creatureArrs.forEach(function(arr){
            searchinarr(arr, killArr[l]);
        });
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