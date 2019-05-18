var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
   res.redirect('index.html');
});
server.listen(2000);

var cq = 7;
var n = 5;
var m = 5;
var matrix = [];
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

const Grass = require('./modules/class.grass');
const GrassEater = require('./modules/class.grasseater');
const Wolf = require('./modules/class.wolf');
const Poisoner = require('./modules/class.poisoner');
const Human = require('./modules/class.human');
const Cat = require('./modules/class.cat');
const side = 120;
var season = 0;

const arrs = {
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
    creatureArrs = [grassArr,grasseaterArr,wolfArr,poisonerArr,humanArr,catArr];

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
    
        creatureArrs.forEach(function(arr){
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

io.on('connection', function(client){
    client.emit('send matrix & season', matrix, season);
})