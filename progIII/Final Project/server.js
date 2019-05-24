const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(2000);

const fs = require('fs');

var tactSeason = 0;
var tactData = 0;

const cq = 7;
const n = 20;
const m = 20;
matrix = [];
var creatureArrs = [];
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

Grass = require('./modules/class.grass');
GrassEater = require('./modules/class.grasseater');
Wolf = require('./modules/class.wolf');
Poisoner = require('./modules/class.poisoner');
Human = require('./modules/class.human');
Cat = require('./modules/class.cat');

season = 0;

grassArr = [];
grasseaterArr = [];
wolfArr = [];
poisonerArr = [];
humanArr = [];
catArr = [];

dataArr = {
    bornGrass: 0,
    bornGrassEater: 0,
    WolfCount: wolfArr.length,
    HumanCount: humanArr.length
};

arrs = {
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

function gend() {
    var r = Math.random();
    if (r < 1 / 2) {
        return 0;
    } else return 1;
}


io.on('connection', function (socket) {
    socket.emit('send matrix size', [m, n]);
    io.on('wind', function (strength) {
        wind(strength);
    });
    setInterval(function () {
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
                    catArr.push(new Cat(x, y, 6, gend()));
                }
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
        creatureArrs = [grassArr, grasseaterArr, wolfArr, poisonerArr, humanArr, catArr];
        tactSeason++;
        if (tactSeason % 4 == 0) {
            season++;
            if (season % 4 == 0) {
                season = 0;
            }
            tactSeason = 0;
        }
        tactData++;
        if(tactData % 3 == 0){
            tactData = 0;
            fs.writeFileSync('stats.json', JSON.stringify(dataArr));
            socket.emit('display data', dataArr);
        }

        socket.emit('send matrix and season', [matrix, season, creatureArrs]);
    }, 300);
});

function wind1(arr, strength) {
    for (var iter in arr) {
        var stugum = arr[iter].x - strength;
        if (stugum < 0) {
            arr[iter].die();
        }
        else { arr[iter].moveplace([stugum, arr[iter].y]); }
    }
}

function wind2(arr, strength) {
    for (var iter in arr) {
        var stugum = arr[iter].x + strength;
        if (stugum > matrix[0].length) {
            arr[iter].die();
        }
        else { arr[iter].moveplace([stugum, arr[iter].y]); }
    }
}

function wind3(arr, strength) {
    for (var iter in arr) {
        var stugum = arr[iter].y - strength;
        if (stugum < 0) {
            arr[iter].die();
        }
        else { arr[iter].moveplace([arr[iter].x, stugum]); }
    }
}

function wind4(arr, strength) {
    for (var iter in arr) {
        var stugum = arr[iter].y + strength;
        if (stugum > matrix.length) {
            arr[iter].die();
        } else { arr[iter].moveplace([arr[iter].x, stugum]); }
    }
}

function wind(stren) {
    var ra = Math.random();
    creatureArrs.forEach(function (arr) {
        if (ra > 0 / 4 && ra < 1 / 4) {
            wind1(arr, stren);
        } else if (ra > 1 / 4 && ra < 2 / 4) {
            wind2(arr, stren);
        } else if (ra > 2 / 4 && ra < 3 / 4) {
            wind3(arr, stren);
        } else {
            wind4(arr, stren);
        }
    });
}