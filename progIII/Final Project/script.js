stren = 0;
var season;
var drawmatrix;
const side = 50;
var creatureArrs = [];


function setup() {
    client = io();
    var size1,size2;
    client.on('send matrix size', function(size){
        size1 = size[0];
        size2 = size[1];
        createCanvas(size1 * side, size2 * side);
        background('acacac');
    });
    
    client.on('send matrix and season', function (sent) {
        drawmatrix = sent[0];
        season = sent[1];
        creatureArrs = sent[2];

        for (var y = 0; y < drawmatrix.length; y++) {
            for (var x = 0; x < drawmatrix[0].length; x++) {
                if (drawmatrix[y][x] == 1) {
                    if (season == 0) {
                        fill("white");
                    } else if (season == 3) {
                    } else fill("green");
                } else if (drawmatrix[y][x] == 2) {
                    fill("yellow");
                } else if (drawmatrix[y][x] == 3) {
                    fill("black");
                } else if (drawmatrix[y][x] == 4) {
                    fill("red");
                } else if (drawmatrix[y][x] == 0) {
                    fill("#acacac");
                } else if (drawmatrix[y][x] == 5) {
                    fill("#ffc300");
                } else if (drawmatrix[y][x] == 6) {
                    fill("#847b60");
                }
                rect(x * side, y * side, side, side);
            }
        }
        seasonWrite();
        client.on('display data', (dataobj)=>{
            var statp = document.getElementById('jsondata');
            statp.innerHTML = JSON.stringify(dataobj);
        });
    });
    var windReqButton = document.getElementById('wind');
    windReqButton.addEventListener('click', (evt)=>{
        client.emit('wind', stren);
    });
}
function seasonWrite() {
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

function windStrengthWrite() {
    var windstrength = document.getElementById("windstr");
    windstrength.innerText = stren;
}