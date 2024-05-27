let canvas;
let context;
let fpsInterval = 1000 / 30; //the dominator is frames-per-seconds
let now;
let then = Date.now();
let request_id;

// Whether the function was called
let used = false;

// Name for Intervals
let t;
let o;
let n1;
let n2;

let win;
let score;
let pixel = 16;
let xhttp;

let spike_sound;

// Establish the objects
let player = {
    x : pixel*25,
    y : pixel*2,
    sizeX : pixel,
    sizeY : pixel,
    frameX : 0,
    frameY : 0,
    xChange : 2,
    yChange : 2,
    in_water : false,
    oxygen : 100,
    health : 3,
    invulnerable : false
}
let oxygen_bar = {
    x : 0,
    y : 0,
    sizeX : pixel*3,
    sizeY : pixel/2
}
let exit = {
    x : pixel * 37,
    y : 0,
    sizeX : pixel * 2,
    sizeY : pixel * 2,
    open : false
}
// let health_bar = {
//     x : 0,
//     y : 0,
//     sizeX : pixel,
//     sizeY : pixel,
//     frameX : 0,
//     frameY : 0
// }

// let doors = [{x : pixel * 1,y : pixel * 15,sizeX :pixel,sizeY : pixel,number : 1,open : false},{x : pixel * 5,y : pixel * 24,sizeX :pixel,sizeY : pixel,number : 2,open : false}]
// let levers = [{x : pixel * 2,y : pixel * 26,sizeX : pixel,sizeY : pixel,frameX : 0,number : 1,open : false},{x : pixel * 2,y : pixel * 24,sizeX : pixel,sizeY : pixel,frameX : 0,number : 2,open : false}]
let doors = [];
let levers = [];
let obstacles = [];
let water = [];
let walls = [];
let fires = [];
let stones = [];
let saws = [];
let spinners = [];
let spikes = [];
let traps = [];
let health_points = [];
let coin;
// let fires = [{x : pixel*8, y : pixel*8, sizeX : pixel*3, sizeY : pixel, frameX : 0, frameY : 0, action : false, player_near : false}];
// let stones = [{x : pixel*6, y : pixel*5, init_x : pixel*6, init_y : pixel*5, sizeX : pixel, sizeY : pixel, frameX : 0, frameY : 0, xChange : -4, yChange : 0, action : true, player_near : false},
//               {x : pixel*8, y : pixel*10, init_x : pixel*8, init_y : pixel*10, sizeX : pixel, sizeY : pixel, frameX : 0, frameY : 0, xChange : -4, yChange : 0, action : true, player_near : false},
//               {x : pixel*10, y : pixel*12, init_x : pixel*10, init_y : pixel*12, sizeX : pixel, sizeY : pixel, frameX : 0, frameY : 0, xChange : 4, yChange : 0, action : true, player_near : false},
//               {x : pixel, y : pixel, init_x : pixel, init_y : pixel, sizeX : pixel, sizeY : pixel, frameX : 0, frameY : 0, xChange : 0, yChange : 4, action : true, player_near : false}];
// let saws = [{x : pixel*18, y : pixel*18, sizeX : pixel*2, sizeY : pixel*2, frameX : 0, frameY : 0, action : true, player_near : false}]

// let spinners = [{x : pixel*36, y : pixel*28, sizeX : pixel, sizeY : pixel, frameX : 0, frameY : 0, xChange : 4, yChange : 4,
                //  moveLeft : false, moveRight :false, moveDown : false, moveUp : true, action : true, player_near : false}]



// let spikes = [{x : pixel * 10, y : pixel * 10, sizeX : pixel, sizeY:pixel, frameX : 0, frameY : 0, action : true, player_near : false}]

// let enemy = {
//     x : 0,
//     y : 0,
//     sizeX : pixel,
//     sizeY : pixel*30,
//     xChange : pixel,
//     yChange : 0,
//     action : false
// };

// let on_the_right = false;
// let on_the_left = false;
// let on_the_top = false;
// let on_the_bottom = false;

// let enemies = []
// enemies.push(enemy)

// draw_enemy(enemy);

// Establishing timer
let time_seconds = 0;
let time_minutes = 0;
let timer_element = document.querySelector("#timer");
timer_element.innerHTML = time_minutes + ":" + time_seconds;
score = timer_count_up(time_minutes, time_seconds);

// traps.push(enemies);

// Movement of the player
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

// Setting up all audio/images
let PlayerImageR = new Image();
let PlayerImageL = new Image();
let BackgroundImage = new Image();
let SawImage = new Image();
let FireImage = new Image();
let FireRImage = new Image();
let StoneImage = new Image();
let BackgroundAudio = new Audio();
BackgroundAudio.volume = 0.05;
let FireAudio = new Audio();
let StepAudio = new Audio();
StepAudio.volume = 0.2;
let SwimAudio = new Audio();
SwimAudio.volume = 0.4;
let WaterAudio = new Audio();
WaterAudio.volume = 0.5;
let LeverAudio = new Audio();
LeverAudio.volume = 0.1;
let SawAudio = new Audio();
LeverAudio.volume = 0.1;
let SpikeAudio = new Audio();
SpikeAudio.volume = 0.03;
let SpinnerAudio = new Audio();
SpinnerAudio.volume = 0.1;
let PlayerHeatAudio = new Audio();
PlayerHeatAudio.volume = 0.3;
let StoneAudio = new Audio();
StoneAudio.volume = 0.2;

let tilesPerRow = 32;
let tileSize = 16;  

// number of image on the background
let background = [
["*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ,"*" ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,129 ,"*" ],
["*" ,129 ,129 ,129 ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ,"*" ]
]

// Creating specific object at specific place
let map =[
[1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,1 ],
[1 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,1 ],
[1 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,1 ],
[1 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,1 ],
[1 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,1 ],
[1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0 ,1 ,0 ,0 ,1 ,1, 0 ,0 ,1 ,0 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,1 ],
[1 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,0 ,0 ,4 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,1 ],
[1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,1 ],
[1 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,1 ],
[1 ,0 ,1 ,1 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,1 ],
[1 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,0 ,1 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,0 ,0 ,1 ],
[1 ,1 ,0 ,1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,1 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,0 ,0 ,1 ],
[1 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,0 ,1 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,1 ,0 ,0 ,1 ],
[1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,0 ,2 ,2 ,2 ,2 ,1 ,0 ,0 ,1 ],
[1 ,0 ,0 ,1 ,1 ,0 ,0 ,1 ,0 ,1 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,0 ,0 ,1 ],
[1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,0 ,0 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,0 ,0 ,1 ],
[1 ,1 ,1 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,2 ,1 ,0 ,0 ,1 ],
[1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,1 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,0 ,1 ,2 ,2 ,1 ,0 ,0 ,1 ],
[1 ,0 ,1 ,1 ,1 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,2 ,2 ,2 ,0 ,1 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,0 ,0 ,1 ],
[1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,2 ,2 ,2 ,0 ,1 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,0 ,0 ,1 ],
[1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,1 ,1 ,1 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,0 ,0 ,1 ],
[1 ,0 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,1 ,2 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,1 ],
[1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,2 ,2 ,1 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,2 ,2 ,1 ,2 ,2 ,2 ,2 ,2 ,0 ,1 ,0 ,0 ,1 ],
[1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,2 ,2 ,1 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,2 ,2 ,1 ,1 ,2 ,2 ,1 ,1 ,1 ,1 ,0 ,0 ,1 ],
[1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,2 ,2 ,1 ,2 ,2 ,1 ,2 ,2 ,2 ,1 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,2 ,2 ,1 ,0 ,0 ,1 ],
[1 ,0 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,1 ,2 ,2 ,1 ,2 ,2 ,1 ,2 ,2 ,2 ,1 ,2 ,2 ,2 ,2 ,1 ,2 ,1 ,2 ,2 ,1 ,0 ,0 ,1 ],
[1 ,0 ,1 ,1 ,1 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,2 ,2 ,1 ,2 ,2 ,1 ,2 ,1 ,1 ,1 ,2 ,2 ,1 ,2 ,1 ,1 ,1 ,2 ,2 ,1 ,0 ,0 ,1 ],
[1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,2 ,2 ,1 ,2 ,2 ,1 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,0 ,0 ,1 ],
[1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,2 ,2 ,2 ,2 ,2 ,1 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,2 ,2 ,2 ,2 ,2 ,2 ,0 ,0 ,0 ,1 ],
[1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ]
]
// codes
// 0 - nothing
// 1 - obstacle
// 2 - water

let objects = [
['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 88, 88, ''],
['', 88, 88, '', 88, 88, 88, 88, 88, 88, 88, '', 88, 11, 88, 11, 88, 12, 88, 11, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, '', 88, 88, ''],
['', 88, 88, '', 88, 88, 88, '', '', '', 88, '', 14, 11, 88, 11, 88, 12, 88, 11, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, '', 88, 88, ''],
['', 88, 88, '', 88, 88, 88, '', 88, 88, 88, '', 88, 11, 88, 11, 88, 12, 88, 11, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, '', 88, 88, ''],
['', 88, 88, 88, 88, 88, 88, '', 88, '', '', '', '', '', '', '', '', '', '', '', '', '', '', 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, '', 88, 88, ''],
['', 88, '', '', 88, 88, 88, '', 88, '', 88, 88, '', '', 88, 88, '', 88, '', 88, 88, 88, '', '', 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, '', 88, 88, ''],
['', 88, 88, '', '', '', '', '', 88, '', 88, 88, 88, 88, 88, 88, '', '', 88, 88, 88,  4, 88, 11, 88, 11, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, '', 88, 88, ''],
['', '', 88, '', 88, 88, 88, 88, 88, '', 10, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 11, 88, 11, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, '', 88, 88, ''],
['', 88, 88, '', 88, 88, 88, 88, '', '', 88, 88, 88, '', 88, 88, 88, 88, 88, 88, 88, 88, '', '', '', '', 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, '', 88, 88, ''],
['', 88, '', '', 11, 11, 11, 11, '', 88, 88, 88, 88, '', 88, 88, '', 88, '', '', '', '', '', 13, 88, '', '', '', '', '', '', '', '', '', '', '', '', 88, 88, ''],
['', 88, 88, '', 88, 88, 88, 88, '', 88, 88, '', '', '', '', '', '', 88, '', 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, '', 88, 88, ''],
['', '', 88, '', 10, 88, 88, '', 88, 88, 88, 88, '', 88, 88, 88, '', '', 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, '', 88, 88, ''],
['', 88, 88, '', 88, 31, 88, '', 88, '', 88, 88, '', 88, 88, 88, 88, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 88, '', 88, 88, ''],
['', 88, '', '', 10, 88, 88, '', 88, '', '', 88, '', 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 11, 88, 88, 88, 88, '', 88, 88, ''],
['', 88, 88, '', '', 88, 88, '', 88, '', 88, 88, '', 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, '', 88, 88, ''],
['', 88, 88, 88, '', 88, 88, 21, 88, '', 88, '', '', 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, '', 88, 88, ''],
['', '', '', 88, '', '', '', '', '', '', 88, 88, '', 88, 88, 88, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 88, 88, '', 88, 88, ''],
['', 30, '', 88, 20, 88, 88, 88, 88, '', '', 88, '',  3, 88, 88, '', 10, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, '', 88, 88, '', 88, 88, ''],
['', 11, '', '', '', 88, 88, 88, 88, '', 88, 88, '', 88, 88, 88, '', 88, 88, 88, 88, '', 88, 88, 88, 88, 88, 88, 88, '', 88, 88, 88, 88, 88, 88, '', 88, 88, ''],
['', 88, 88, 88, '', 88, 88, 88,  5, '', 88, '', '', 88, 88, 88, '', 88, 88, 88, 88, '', 88, 88, 88, 88, 88, 88, 88, '', 88, 88, 88, 88, 88, 88, '', 88, 88, ''],
['', 88, 88, 88, '',  6, 88, 88, 88, '', 88, 88, '', 88,  3, 88, '', 88, 88, 88, 88, 88, 88, 88, 88, 88, '', '', '', '', 88, 88, 88, 88, 88, 88, '', 88, 88, ''],
['', 88, '', 88, '', 88, 88, 88,  5, '', '', 88, '', 88, 88, 88, '', 88, 88, '', '', '', '', '', '', '', '',  7, 88, '', '', '', '', '', '', '', '', 88, 88, ''],
['', '', '', 88, '',  6, 88, 88, 88, '', 88, 88, '', 88, 88, 88, '', 88, 88, '', 88, 88, 88, 88, 88, 88, '', 88, 88, '', 88, 88, 88, 88, 88, 32, '', 88, 88, ''],
['', 88, 88, 88, '', 88, 88, 88,  5, '', 88, '', '',  3, 88, 88, '', 88, 88, '', 88,  4, 88,  3, 88, 88, '', 88, 88, '', '', 88, 88, '', '', '', '', 88, 88, ''],
['', 88, 88, 88, '',  6, 88, 88, 88, '', 88, 88, '', 88, 88, 88, '', 88, 88, '', 88, 88, '', 88, 88, 88, '', 88, 88, 88, 88, 88, 88, '', 88, 88, '', 88, 88, ''],
['', 88, '', 88, '', 88, 88, 88,  5, '', '', 88, '', 88, 88, 88, '', 88, 88, '', 88, 88, '', 88, 88,  5, '', 88, 88, 88, 88, '', 88, '', 88, 88, '', 88, 88, ''],
['', 88, '', '', '',  6, 88, 88, 88, '', 88, 88, '', 88,  3, 88, '', 88, 88, '', 88, 88, '', 88, '', '', '', 88, 88, '', 88, '', '', '', 88, 88, '', 88, 88, ''],
['', 88, 88, 88, 88, 88, 88, 88, 88, '', 88, '', '', 88, 88, 88, '', 88, 88, '', 88, 88, '', 88, 88, 88, 88, 88, 88, '', 88, 88, 88, 88, 88, 88, '', 88, 88, ''],
['', 88, 88, 88, 88, 88, 88, 88, 88, '', 88, 88, 88, 88, 88, 88, '', 88, 88, 88, 88, 88, '', 88, 88, 88, 88, 88, 88, '', 88, 88, 88, 88, 88, 88, 22, 88, 88, ''],
['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
]
// codes:
// 88 - nothing/water
// '' - obstacle
// 3 - saw
// 4 - spinner
// 5 - fire_left
// 6 - fire_right
// 7 - stone_bot
// 8 - stone_top
// 9 - stone_left
// 10 - stone_right
// 11 - spike_slow
// 12 - spike_fast
// 13 - health_point
// 14 - coin
// 20-29 - doors
// 30-39 - levers



document.addEventListener("DOMContentLoaded", init, false);

function init(){
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);
    

    draw();

    load_assets([
        {"var" : SawImage, "url" : "static/Suriken.png"},
        {"var" : FireImage, "url" : "static/Fire.png"},
        {"var" : FireRImage, "url" : "static/FireR.png"},
        {"var" : BackgroundImage, "url" : "static/Background.png"},
        {"var" : StoneImage, "url" : "static/Stone.png"},
        {"var" : PlayerImageR, "url" : "static/Heroes_right.png"},
        {"var" : PlayerImageL, "url" : "static/Heroes_left.png"},
        {"var" : BackgroundAudio, "url" : "static/background.mp3"},
        {"var" : StepAudio, "url" : "static/step.wav"},
        {"var" : WaterAudio, "url" : "static/under_water.mp3"},
        {"var" : FireAudio, "url" : "static/fire.mp3"},
        {"var" : LeverAudio, "url" : "static/lever.mp3"},
        {"var" : SawAudio, "url" : "static/saw.mp3"},
        {"var" : SwimAudio, "url" : "static/swim.mp3"},
        {"var" : SpikeAudio, "url" : "static/spike.mp3"},
        {"var" : SpinnerAudio, "url" : "static/spinner.mp3"},
        {"var" : PlayerHeatAudio, "url" : "static/player_heat.mp3"},
        {"var" : StoneAudio, "url" : "static/stone.mp3"}

    ],draw);



}

// Creating map
let r = 0
let c = 0
for (let row of map){
    c = 0
    for (let col of row) {
        if (col === 1){
            let obstacle = {x : c * pixel,y : r * pixel,sizeX : pixel,sizeY : pixel}
            obstacles.push(obstacle);
            walls.push(obstacle);
        }
        else if (col === 2){
            let water_block = {x : c * pixel,y : r * pixel,sizeX : pixel,sizeY : pixel}
            water.push(water_block);
        }
        c = c + 1;
    }
    r = r + 1;
}

// Creating objects in relation to their place in the map
r = 0;
for (let row of objects){
    c = 0
    for (let col of row) {
        if (col === 3){
            let saw = {x : c * pixel,y : r * pixel,sizeX : pixel*2,sizeY : pixel*2, frameX : 0, frameY : 0, action : true, player_near : false}
            saws.push(saw)
        }
        else if (col === 4){
            let spinner = {x : c * pixel,y : r * pixel,sizeX : pixel,sizeY : pixel, frameX : 0, frameY : 0, xChange : 2, yChange : 2,
                moveLeft : false, moveRight :false, moveDown : false, moveUp : true, action : true, player_near : false}
            spinners.push(spinner)
        }
        else if (col === 5){
            let fire = {x : (c-2) * pixel,y : r * pixel,sizeX : pixel*3, sizeY : pixel, frameX : 0, frameY : 0, action : false, player_near : false, reversed : false, delay : 3000}
            fires.push(fire)
        }
        else if (col === 6){
            let fire = {x : c * pixel,y : r * pixel,sizeX : pixel*3, sizeY : pixel, frameX : 0, frameY : 0, action : false, player_near : false, reversed : true, delay : 1500}
            fires.push(fire)
        }
        else if (col === 7){
            let stone = {x : c * pixel,y : r * pixel,init_x : c * pixel, init_y : r * pixel, sizeX : pixel, sizeY : pixel, frameX : 0, frameY : 0, xChange : 0, yChange : 4, action : true, player_near : false}
            stones.push(stone)
        }
        else if (col === 8){
            let stone = {x : c * pixel,y : r * pixel,init_x : c * pixel, init_y : r * pixel, sizeX : pixel, sizeY : pixel, frameX : 0, frameY : 0, xChange : 0, yChange : -4, action : true, player_near : false}
            stones.push(stone)
        }
        else if (col === 9){
            let stone = {x : c * pixel,y : r * pixel,init_x : c * pixel, init_y : r * pixel, sizeX : pixel, sizeY : pixel, frameX : 0, frameY : 0, xChange : -4, yChange : 0, action : true, player_near : false}
            stones.push(stone)
        }
        else if (col === 10){
            let stone = {x : c * pixel,y : r * pixel,init_x : c * pixel, init_y : r * pixel, sizeX : pixel, sizeY : pixel, frameX : 0, frameY : 0, xChange : 4, yChange : 0, action : true, player_near : false}
            stones.push(stone)
        }
        else if (col === 11){
            let spike = {x : c * pixel,y : r * pixel,sizeX : pixel, sizeY:pixel, frameX : 0, frameY : 0, action : true, player_near : false, slow : true}
            spikes.push(spike)
        }
        else if (col === 12){
            let spike = {x : c * pixel,y : r * pixel,sizeX : pixel, sizeY:pixel, frameX : 0, frameY : 0, action : true, player_near : false, fast : true}
            spikes.push(spike)
        }
        else if (col === 13){
            let health_point = {x : c * pixel,y : r * pixel,sizeX : pixel, sizeY:pixel, picked : false}
            health_points.push(health_point)
        }         
        else if (col === 14){
            coin = {x : c * pixel + pixel/4,y : r * pixel,sizeX : pixel/2, sizeY:pixel/2, frameX : 0, picked : false}
        }         
        else if (col >= 20 && col <= 29){
            let door = {x : c * pixel,y : r * pixel, sizeX :pixel, sizeY : pixel, number : col%20 ,open : false}
            doors.push(door)
        }
        else if (col >= 30 && col <= 39){
            let lever = {x : c * pixel,y : r * pixel, sizeX :pixel, sizeY : pixel,frameX : 0, number : col%30 ,open : false}
            levers.push(lever)
        }
        c = c + 1;
    }
    r = r + 1;
}

// Attribute obstacle feature to the door
for (let door of doors){
    obstacles.push(door);
}

// Change image of spinner when it changes direction
for (let spinner of spinners){
    change_image_spinner(spinner);
}
// Change the image of coin
coin_change_image(coin);

traps.push(fires);
traps.push(stones);
traps.push(saws);
traps.push(spinners);
traps.push(spikes);



function draw(){
    request_id = window.requestAnimationFrame(draw);
    let now = Date.now();
    
    let elapsed = now - then;
    if (elapsed <= fpsInterval){
        return;
    }
    then = now - (elapsed % fpsInterval);

    context.clearRect(0, 0, canvas.width, canvas.height);

    
    
    
    // Draw background
    for (let r = 0; r < 30; r += 1){
        for (let c = 0; c < 40; c += 1) {
            let tile = background[r][c];
            if (tile >= 0) {
                let tileRow = Math.floor(tile / tilesPerRow);
                let tileCol = Math.floor(tile % tilesPerRow);
                context.drawImage(PlayerImageR, 
                    tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
                    c * tileSize, r * tileSize, tileSize, tileSize)
            }
        }
    }

    // Draw exit
    if (exit.open){
        context.drawImage(PlayerImageR,
            pixel*5, pixel*14, pixel*2, pixel*2, exit.x, exit.y, exit.sizeX, exit.sizeY);
    }
    else {context.drawImage(PlayerImageR,
        pixel*2, pixel*14, pixel*2, pixel*2, exit.x, exit.y, exit.sizeX, exit.sizeY );
    }

    // Draw coin
    if (! coin.picked){
        context.drawImage(PlayerImageR,
            pixel*(17 + coin.frameX), pixel*17, pixel/2, pixel/2, coin.x, coin.y, coin.sizeX, coin.sizeY);
        
    }
    
    // Draw levers
    for (let lever of levers){
        context.drawImage(PlayerImageR,
            pixel* (5 + lever.frameX), pixel*12, pixel, pixel, lever.x, lever.y, lever.sizeX, lever.sizeY);
    }
    
    // Draw doors
    for (let door of doors){
        if (! door.open){
            context.drawImage(PlayerImageR,
                pixel*18, pixel*19, pixel, pixel, door.x, door.y, door.sizeX, door.sizeY);
        }
    }
    
    // Draw health_points
    for (let health_point of health_points){
        if (!health_point.picked){
            context.drawImage(PlayerImageR,
                18*pixel, 16*pixel, pixel, pixel, health_point.x, health_point.y, health_point.sizeX, health_point.sizeY);
        }
    }

    // Draw player 
    // context.drawImage(PlayerImageR,
    //     (23 + player.frameX) * pixel, pixel * 5, 16, 16,
    //     player.x, player.y, 16, 16); 
    //     player.frameX = (player.frameX + 1) % 3;

    // Draw obstacles
    for (let wall of walls){
        context.drawImage(BackgroundImage,
            pixel*28, pixel*3, pixel, pixel, wall.x, wall.y, wall.sizeX, wall.sizeY);
    }

    // Draw water
    for (let water_block of water){
        context.drawImage(BackgroundImage,
            pixel*28, pixel*18, pixel, pixel, water_block.x, water_block.y, water_block.sizeX, water_block.sizeY);
    }

    // Draw spikes
    for (let spike of spikes){
        if (spike.action){
            context.drawImage(PlayerImageR,
                pixel*4, pixel*11, pixel, pixel, spike.x, spike.y, spike.sizeX, spike.sizeY);
        }
        else{
            context.drawImage(PlayerImageR,
                pixel*(spike.frameX + 1), pixel*11, pixel, pixel, spike.x, spike.y, spike.sizeX, spike.sizeY);
        }
        
    }

    // Draw stones
    for (let stone of stones){
        if (stone.action){
            context.drawImage(StoneImage,
                stone.frameX * 21, stone.frameY *2, 21, 21, stone.x, stone.y, stone.sizeX, stone.sizeY);
                stone.frameX = (stone.frameX + 1) % 2;
            // context.fillStyle = "magenta";
            // context.fillRect(stone.x, stone.y, stone.sizeX, stone.sizeY);

        }
        
    }

    // draw fires
    for (let fire of fires){
        if (fire.action){
            if (! fire.reversed){
                context.drawImage(FireImage,
                    fire.frameX * pixel*2, fire.frameY * pixel, pixel, pixel, fire.x, fire.y, fire.sizeX, fire.sizeY);
            }
            else if (fire.reversed){
                context.drawImage(FireRImage,
                    fire.frameX * pixel*2, fire.frameY * pixel, pixel, pixel, fire.x, fire.y, fire.sizeX, fire.sizeY);
            }
            fire.frameY = (fire.frameY + 1) % 4;
            
            // context.fillStyle = "yellow";
            // context.fillRect(fire.x, fire.y, fire.sizeX, fire.sizeY);
        }
    }

    // draw saws
    for (let saw of saws){
        // if (saw.action){
            // context.fillStyle = "blue"; 
            // context.fillRect(saw.x, saw.y, saw.sizeX, saw.sizeY);
        context.drawImage(SawImage,
            saw.frameX * pixel*2, saw.frameY * pixel, pixel*2, pixel*2, saw.x, saw.y, saw.sizeX, saw.sizeY);
        saw.frameX = (saw.frameX + 1) % 8;
 
        
        // }
        // draw_saw(saw);
    }

    // draw enemy
    // if (enemy.action){
    //     context.fillStyle = "orange"; 
    //     context.fillRect(enemy.x, enemy.y, enemy.sizeX, enemy.sizeY);
    // }

    // draw spinners
    for (let spinner of spinners){
        if (spinner.moveLeft) {
            context.drawImage(PlayerImageL,
                (spinner.frameX+0.6)*pixel, (spinner.frameY+21)*pixel, pixel, pixel, spinner.x, spinner.y, spinner.sizeX , spinner.sizeY);
            spinner.x = spinner.x - spinner.xChange;
        }
        else if (spinner.moveRight) {
            context.drawImage(PlayerImageR,
                (spinner.frameX+23)*pixel, (spinner.frameY+21)*pixel, pixel, pixel, spinner.x, spinner.y, spinner.sizeX , spinner.sizeY);
            spinner.x = spinner.x + spinner.xChange;
        }
        else if (spinner.moveUp) {
            context.drawImage(PlayerImageL,
                (spinner.frameX+0.6)*pixel, (spinner.frameY+21)*pixel, pixel, pixel, spinner.x, spinner.y, spinner.sizeX , spinner.sizeY);
            spinner.y = spinner.y - spinner.yChange;
        }
        else if (spinner.moveDown) {
            context.drawImage(PlayerImageR,
                (spinner.frameX+23)*pixel, (spinner.frameY+21)*pixel, pixel, pixel, spinner.x, spinner.y, spinner.sizeX , spinner.sizeY);
            spinner.y = spinner.y + spinner.yChange;
        }
    }

    // Draw oxygen bar
    oxygen_bar.x = player.x - pixel;
    oxygen_bar.y = player.y - pixel*2;
    oxygen_bar.sizeX = 0.48 * player.oxygen;
    if (player.oxygen < 100){
        context.fillStyle = "white"; 
        context.fillRect(oxygen_bar.x, oxygen_bar.y, oxygen_bar.sizeX, oxygen_bar.sizeY);
    }

    // Draw health bar
    // health_bar.x = player.x;
    // health_bar.y = player.y - pixel;
    // context.drawImage(PlayerImageR,
    // (health_bar.frameX+18)*pixel, (health_bar.frameY+16)*pixel, pixel, pixel, health_bar.x, health_bar.y, health_bar.sizeX , health_bar.sizeY);

    if (player.health === 3){
        context.drawImage(PlayerImageR,
            (18)*pixel, (16)*pixel, pixel, pixel, player.x + pixel, player.y - pixel, pixel, pixel);
    }
    else{
        context.drawImage(PlayerImageR,
            (20)*pixel, (16)*pixel, pixel, pixel, player.x + pixel, player.y - pixel, pixel, pixel);
    }
    if (player.health >= 2){
        context.drawImage(PlayerImageR,
            (18)*pixel, (16)*pixel, pixel, pixel, player.x, player.y - pixel, pixel, pixel);
    }
    else{
        context.drawImage(PlayerImageR,
            (20)*pixel, (16)*pixel, pixel, pixel, player.x, player.y - pixel, pixel, pixel);
    }
    if (player.health >= 1){
        context.drawImage(PlayerImageR,
            (18)*pixel, (16)*pixel, pixel, pixel, player.x - pixel, player.y - pixel, pixel, pixel);
    }
    else{
        context.drawImage(PlayerImageR,
            (20)*pixel, (16)*pixel, pixel, pixel, player.x - pixel, player.y - pixel, pixel, pixel);
    }
    
    
    
    // Draw other objects

    // Win
    if (!(player.x + player.sizeX <= exit.x ||
        exit.x + exit.sizeX <= player.x ||
        player.y >= exit.y + exit.sizeY ||
        exit.y >= player.y + player.sizeY)){
            win = true;
            stop(win,score);
        }

    // Lose
    if (player.health === 0){
        win = false;
        stop(win, score);
    }

    // Collisions

    // player touches the lever
    for (let lever of levers){
        if (!(player.x + player.sizeX <= lever.x ||
            lever.x + lever.sizeX <= player.x ||
            player.y >= lever.y + lever.sizeY ||
            lever.y >= player.y + player.sizeY) & ! lever.open){
                lever.open = true;
                lever.frameX = lever.frameX + 1;
                LeverAudio.play();
                for (let door of doors){
                    if (door.number === lever.number){
                        door.open = true;
                    }
                }
            }
    }
    
    // traps collide with player
    for (let trap of traps){
        for (let kind_of_trap of trap){
            if (((player.x + player.sizeX > kind_of_trap.x + pixel/4 ) && (player.x < kind_of_trap.x + kind_of_trap.sizeX - pixel/4 ) && 
                 (player.y + player.sizeY > kind_of_trap.y + pixel/4 ) && (player.y < kind_of_trap.y + kind_of_trap.sizeY - pixel/4 ) && (kind_of_trap.action) && (! player.invulnerable))){
                // win = false;
                player.health -= 1;
                player.invulnerable = true;
                PlayerHeatAudio.play();
                invulnerable(player);
                // health_bar.frameX += 1;
                // stop(win,score);
                
            } 
        }
    }

    // collision of enemy with player
    // if (player.x < enemy.sizeX){
    //     win = false
    //     stop(win,score);
    // }

    //  obstacles collide with player
    for (let obstacle of obstacles){
        
        // collides on the right
        if ((player.x + player.sizeX === obstacle.x ) && (obstacle.y < player.y + player.sizeY) && (player.y < obstacle.y + obstacle.sizeY) && (moveRight)){
            // player.xChange = player.xChange * -1;
            if (! obstacle.open){
                moveRight = false;
            }
        }

        // collides on the left
        else if ((player.x === obstacle.x + obstacle.sizeX ) && (obstacle.y < player.y + player.sizeY) && (player.y < obstacle.y + obstacle.sizeY) && (moveLeft)){
            // player.xChange = player.xChange * -1;
            if (! obstacle.open){
                moveLeft = false;
            }
        }

        // collides on the bottom
        else if ((player.y + player.sizeY === obstacle.y ) && (obstacle.x < player.x + player.sizeX) && (player.x < obstacle.x + obstacle.sizeX) && (moveDown)){
            // player.yChange = player.yChange * -1;
            if (! obstacle.open){
                moveDown = false;
            }
        }

        // collides on the top
        else if ((player.y  === obstacle.y + obstacle.sizeY ) && (obstacle.x < player.x + player.sizeX) && (player.x < obstacle.x + obstacle.sizeX) && (moveUp)){
            // player.yChange = player.yChange * -1;
            if (! obstacle.open){
                moveUp = false;
            }
        }
    }

    // collisions with stones
    for (let obstacle of obstacles){
        for (let stone of stones){
            // if ((stone.x + stone.sizeX === obstacle.x ) && (obstacle.y < stone.y + stone.sizeY) && (stone.y < obstacle.y + obstacle.sizeY)
            // || (stone.x === obstacle.x + obstacle.sizeX ) && (obstacle.y < stone.y + stone.sizeY) && (stone.y < obstacle.y + obstacle.sizeY)
            // || (stone.y + stone.sizeY === obstacle.y ) && (obstacle.x < stone.x + stone.sizeX) && (stone.x < obstacle.x + obstacle.sizeX)
            // || (stone.y  === obstacle.y + obstacle.sizeY ) && (obstacle.x < stone.x + stone.sizeX) && (stone.x < obstacle.x + obstacle.sizeX)){
            //     stone.action = false;
            //     stone_rolls(stone);
            // }  
            if (!(stone.x + stone.sizeX <= obstacle.x ||
                obstacle.x + obstacle.sizeX <= stone.x ||
                stone.y >= obstacle.y + obstacle.sizeY ||
                obstacle.y >= stone.y + stone.sizeY)){
                    stone.action = false;
                    stone_rolls(stone);
                }      
        }
    }

    // spinner collides with obstacles
    for (let spinner of spinners){
        // obstacles_near_spinner(obstacles, spinner)
        // console.log(on_the_right)
        // if (on_the_bottom && on_the_left){
        //     spinner.moveRight = true;
        // }
        // else if (on_the_right && on_the_top){
        //     spinner.moveLeft = true;
        // }
        // else if (on_the_left && on_the_top){
        //     spinner.moveDown = true;
        // }
        // else if (on_the_bottom && on_the_right){
        //     spinner.moveUp = true;
        // }

        // else if (on_the_bottom){
        //     spinner.moveRight = true;
        // }
        // else if (on_the_right){
        //     spinner.moveUp = true;
        // }
        // else if (on_the_left){
        //     spinner.moveDown = true;
        // }
        // else if (on_the_top){
        //     spinner.moveLeft = true;
        // }
        for (let obstacle of obstacles){

            if ((spinner.x + spinner.sizeX === obstacle.x ) && (obstacle.y < spinner.y + spinner.sizeY) && (spinner.y < obstacle.y + obstacle.sizeY) && (spinner.moveRight)){
                spinner.moveDown = false;
                spinner.moveUp = true;
                spinner.moveRight = false;
                spinner.moveLeft = false;
            }
            else if((spinner.x === obstacle.x + obstacle.sizeX ) && (obstacle.y < spinner.y + spinner.sizeY) && (spinner.y < obstacle.y + obstacle.sizeY) && (spinner.moveLeft)){
                spinner.moveDown = true;
                spinner.moveUp = false;
                spinner.moveRight = false;
                spinner.moveLeft = false;
            }
            else if ((spinner.y + spinner.sizeY === obstacle.y ) && (obstacle.x < spinner.x + spinner.sizeX) && (spinner.x < obstacle.x + obstacle.sizeX) && (spinner.moveDown)){
                spinner.moveDown = false;
                spinner.moveUp = false;
                spinner.moveRight = true;
                spinner.moveLeft = false;
            }
            
            else if ((spinner.y  === obstacle.y + obstacle.sizeY ) && (obstacle.x < spinner.x + spinner.sizeX) && (spinner.x < obstacle.x + obstacle.sizeX) && (spinner.moveUp)){
                spinner.moveDown = false;
                spinner.moveUp = false;
                spinner.moveRight = false;
                spinner.moveLeft = true;
            }

            // if (spinner.moveDown){
            //     if ((spinner.x === obstacle.x + obstacle.sizeX ) && (obstacle.y < spinner.y + spinner.sizeY) && (spinner.y < obstacle.y + obstacle.sizeY)){
            //         spinner.moveDown = true;
            //         spinner.moveUp = false;
            //         spinner.moveRight = false;
            //         spinner.moveLeft = false;
            //     }
            //     else if (spinner.x === obstacle.x + obstacle.sizeX && spinner.y - spinner.sizeY >= obstacle.y){
            //         spinner.moveDown = false;
            //         spinner.moveUp = false;
            //         spinner.moveRight = false;
            //         spinner.moveLeft = true;
            //     }
            // }
            // else if (spinner.moveLeft){
            //     if ((spinner.y  === obstacle.y + obstacle.sizeY ) && (obstacle.x < spinner.x + spinner.sizeX) && (spinner.x < obstacle.x + obstacle.sizeX)){
            //         spinner.moveDown = false;
            //         spinner.moveUp = false;
            //         spinner.moveRight = false;
            //         spinner.moveLeft = true;
            //     }
            //     else if (spinner.y  === obstacle.y + obstacle.sizeY && spinner.x + spinner.sizeX <= obstacle.x ){
            //         spinner.moveDown = false;
            //         spinner.moveUp = true;
            //         spinner.moveRight = false;
            //         spinner.moveLeft = false;
            //     }
            // }

            // else if (spinner.moveUp){
            //     if ((spinner.x + spinner.sizeX === obstacle.x ) && (obstacle.y < spinner.y + spinner.sizeY) && (spinner.y < obstacle.y + obstacle.sizeY)){
            //         spinner.moveDown = false;
            //         spinner.moveUp = true;
            //         spinner.moveRight = false;
            //         spinner.moveLeft = false;
            //     }
            //     else if (spinner.x + spinner.sizeX === obstacle.x && spinner.y < obstacle.y + obstacle.sizeY){
            //         spinner.moveDown = false;
            //         spinner.moveUp = false;
            //         spinner.moveRight = true;  
            //         spinner.moveLeft = false;
            //     }
            // }

            // else if (spinner.moveRight){
            //     if ((spinner.y + spinner.sizeY === obstacle.y ) && (obstacle.x < spinner.x + spinner.sizeX) && (spinner.x < obstacle.x + obstacle.sizeX)){
            //         spinner.moveDown = false;
            //         spinner.moveUp = false;
            //         spinner.moveRight = true;
            //         spinner.moveLeft = false;
            //     }   
            //     else if (spinner.y + spinner.sizeY === obstacle.y && spinner.x >= obstacle.x + obstacle.sizeX){
            //         spinner.moveDown = true;
            //         spinner.moveUp = false;
            //         spinner.moveRight = false;
            //         spinner.moveLeft = false;
            //     }
            // }

            }
        // }
        // for (let obstacle of obstacles){
        //     if (spinner.moveLeft){
        //         console.log("FF")
        //         if ((spinner.y  === obstacle.y + obstacle.sizeY ) && (obstacle.x < spinner.x + spinner.sizeX) && (spinner.x < obstacle.x + obstacle.sizeX)){
        //             spinner.moveDown = false;
        //             spinner.moveUp = false;
        //             spinner.moveRight = false;
        //             spinner.moveLeft = true;
        //         }   
        //         else if (spinner.x + spinner.sizeX < obstacle.x && spinner.y === obstacle.y){
        //             spinner.moveDown = false;
        //             spinner.moveUp = true;
        //             spinner.moveRight = false;
        //             spinner.moveLeft = false;
        //         }
        //     }
        // }
    }

    // Handle key presses
    if (! (moveLeft || moveRight) || (moveLeft && moveRight) || (moveRight)){
        context.drawImage(PlayerImageR,
            (23 + player.frameX) * pixel, pixel * (5 - player.frameY), 16, 16,
            player.x, player.y - (player.frameY * pixel), 16, 16); 
            player.frameX = (player.frameX + 1) % 8;
    }

    else {
        context.drawImage(PlayerImageL,
            (0.8 + player.frameX) * pixel, pixel * (5 - player.frameY), 16, 16,
            player.x, player.y - (player.frameY * pixel), 16, 16); 
            player.frameX = (player.frameX + 1) % 8;
    }
    if (moveLeft) {
        player.x = player.x - player.xChange;
        if (! player.in_water){
            StepAudio.play();
        }
        else {
            SwimAudio.play();
        }
        // player.xChange = player.xChange + 1;
        // player.frameY = 1;
    }

    if (moveRight) {
        BackgroundAudio.play();
        if (BackgroundAudio.currentTime > 242){
            BackgroundAudio.currentTime = 0;
        }
        player.x = player.x + player.xChange;
        if (! player.in_water){
            StepAudio.play();
        }
        else {
            SwimAudio.play();
        }
        
        // context.drawImage(PlayerImageR,
        //     (23 + player.frameX) * pixel, pixel * 5, 16, 16,
        //     player.x, player.y, 16, 16); 
        //     player.frameX = (player.frameX + 1) % 8;
        // player.xChange = player.xChange - 0.5;
        // player.frameY = 2;
    }

    if (moveUp) {
        player.y = player.y - player.yChange;
        if (! player.in_water){
            StepAudio.play();
        }
        else {
            SwimAudio.play();
        }
        // player.xChange = player.xChange + 1;
        // player.frameY = 1;
    }

    if (moveDown) {
        if (! player.in_water){
            StepAudio.play();
        }
        else {
            SwimAudio.play();
        }
        player.y = player.y + player.yChange;
        // player.xChange = player.xChange - 0.5;
        // player.frameY = 2;
    }
    

    // Update the player
    player_in_water(player, water);
    if (!player.in_water){
        WaterAudio.pause();
        if (player.oxygen < 100){
            player.oxygen += 2;
        }
        // player.oxygen = 100;
        clearInterval(o);
        used = false;
    }
    else if (player.in_water){
        WaterAudio.play();
        oxygen(player, used);
        used = true;
    }
    if(player.oxygen <= 0 && ! player.invulnerable){
        // win = false;
        // stop(win, score);
        player.health -= 1;
        PlayerHeatAudio.play();
        player.invulnerable = true;
        invulnerable(player);
    }
    for (let health_point of health_points){
        if ((player.x + player.sizeX > health_point.x + pixel/4 ) && (player.x < health_point.x + health_point.sizeX - pixel/4 ) && 
            (player.y + player.sizeY > health_point.y + pixel/4 ) && (player.y < health_point.y + health_point.sizeY - pixel/4 ) && player.health != 3){
                health_point.picked = true;
                player.health += 1;
            }
    }
    // console.log(used);
    // console.log(player.oxygen);

    // console.log(player.in_water)
    // player.x = player.x + player.xChange;
    // player.y = player.y + player.yChange;

    // Update other objects

    // Check whether player is near the trap
    for (let trap of traps){
        for (let kind_of_trap of trap){
            if (!(player.x + player.sizeX <= kind_of_trap.x + kind_of_trap.sizeX/2 - pixel*4||
                kind_of_trap.x + kind_of_trap.sizeX/2 + pixel*4 <= player.x ||
                player.y >= kind_of_trap.y + kind_of_trap.sizeY/2 + pixel*4 ||
                kind_of_trap.y + kind_of_trap.sizeY/2 - pixel*4 >= player.y + player.sizeY)){
                    kind_of_trap.player_near = true;
                }
            else{
                kind_of_trap.player_near = false;
            }
        }
    }
    // Update coin
    if ((player.x + player.sizeX > coin.x + pixel/4 ) && (player.x < coin.x + coin.sizeX - pixel/4 ) && 
    (player.y + player.sizeY > coin.y + pixel/4 ) && (player.y < coin.y + coin.sizeY - pixel/4 ) && (! coin.picked)){
        coin.picked = true;
        LeverAudio.play();
    }
    // Update exit
    if (coin.picked){
        exit.open = true;
    }

    // Update saw
    for (let saw of saws){
        if (saw.player_near){
            SawAudio.play();
        }
    }

    // Update spinners
    for (let spinner of spinners){
        if (spinner.player_near){
            SpinnerAudio.play();
        }
    }

    // Update stones
    for (let stone of stones){
        stone.x  = stone.x + stone.xChange;
        stone.y = stone.y + stone.yChange;
        if (stone.player_near){
            StoneAudio.play();
        }
    }

    // Update fire
    for (let fire of fires){
        let called = false
        if (fire.action && ! called){
            called = true
            fire_not_blows(fire);
        }
        else{
            fire_blows(fire);
        }
    }

    // Update spikes
    spike_sound = false;
    for (let spike of spikes){
        // let called = false
        if (spike.action){
            // called = true;
            spike_not_up(spike);
        }
        else{
            spike_up(spike);
        }
        if (spike.player_near && spike.action){
            spike_sound = true;
        }
    if (spike_sound){
        SpikeAudio.play();
    }
    // else if (spike.near){
    //     SpikeAudio.pause();
    //     SpikeAudio.currentTime = 0;
    // }
    }

    // Physics
}

function activate(event){
    let key = event.key;
    if (key === "ArrowLeft"){
        moveLeft = true;
        // moveUp = false;
        // moveDown = false;
        // moveRight = false;
    } else if(key === "ArrowRight"){
        moveRight = true;
        // moveUp = false;
        // moveDown = false;
        // moveLeft = false;
    } else if(key === "ArrowUp"){
        moveUp = true;
        // moveDown = false;
        // moveLeft = false;
        // moveRight = false;
    }else if (key === "ArrowDown"){
        moveDown = true;
        // moveLeft = false;
        // moveRight = false;
        // moveUp = false;
    }
}

function deactivate(event){
    let key = event.key;
    if (key === "ArrowLeft"){
        moveLeft = false;
    } else if(key === "ArrowRight"){
        moveRight = false;
    } else if(key === "ArrowUp"){
        moveUp = false;
    }else if (key === "ArrowDown"){
        moveDown = false;   
    }
}

function player_in_water(player, water){
    player.in_water = false;
    player.frameY = 0;
    for (let water_block of water){
        if ((player.x + player.sizeX > water_block.x + pixel/4 ) && (player.x < water_block.x + water_block.sizeX - pixel/4 ) && 
            (player.y + player.sizeY > water_block.y + pixel/4 ) && (player.y < water_block.y + water_block.sizeY - pixel/4 )){
                player.in_water = true;
                player.frameY = 0.5;
            }
    }
}

function oxygen(player, used){
    if (!used){
        o = setInterval(() => {
            if (player.oxygen != 0){
                player.oxygen = player.oxygen - 2;
            }
        }, 100);
    }
}

function stone_rolls(stone){
    setTimeout(() => {
        stone.action = true
        stone.x = stone.init_x;
        stone.y = stone.init_y;
    }, 500);
}

function fire_blows(fire){
    setTimeout(() => {
        fire.action = true;
        if (fire.player_near){
            FireAudio.play();
        }
    }, fire.delay);
}

function fire_not_blows(fire){
    setTimeout(() => {
        fire.action = false;
        FireAudio.pause();
        FireAudio.currentTime = 0;
    }, fire.delay);
}

function spike_not_up(spike){
    
    if (spike.slow){
        clearTimeout(n1)
        setTimeout(() => {
            spike.action = false;
            // SpikeAudio.pause();
            spike.frameX = 0
        }, 3000);
    }
    else if (spike.fast){
        clearTimeout(n2)
        setTimeout(() => {
            spike.action = false;
            // SpikeAudio.pause();
            spike.frameX = 0
        }, 2000);
    }
    
}

function spike_up(spike){
    if (spike.slow){
        n1 = setTimeout(() => {
            spike.frameX = spike.frameX + 1
        }, 1500);
        setTimeout(() => {
            spike.action = true;
            // if (spike.player_near){
            //     SpikeAudio.play();
            // }
        }, 3000);
    }
    else if (spike.fast){
        n2 = setTimeout(() => {
            spike.frameX = spike.frameX + 1
        }, 1000);
        setTimeout(() => {
            spike.action = true;
            // if (spike.player_near){
            //     SpikeAudio.play();
            // }
        }, 2000);
    }
    

    // setTimeout(() => {
    //     spike.frameX = spike.frameX + 1
    // }, 2000);

    
}

// function draw_enemy(enemy){
//     setTimeout(() => {
//         enemy.action = true;
//         enemy_grows(enemy);
//     }, 10000);
// };

// function enemy_grows(enemy){
//     setInterval(() => {
//         enemy.sizeX = enemy.sizeX + enemy.xChange;
//         enemy.sizeY = enemy.sizeY + enemy.yChange;
//     }, 3000);
// }

function timer_count_up(time_minutes, time_seconds, win){
    t = setInterval(() => {
        
        if ((win != true) || (win != false)){
            time_seconds = time_seconds + 1;
        }
        if (time_seconds > 59){
            time_seconds = 0;
            time_minutes = time_minutes + 1;
        }
        if (time_seconds < 10){
            score = String(time_minutes) + ":" + "0" + String(time_seconds);
        }
        else{
            score = String(time_minutes) + ":" + String(time_seconds);
        }
        timer_element.innerHTML = score;
        return score;
        // console.log(time_minutes + ":" + time_seconds);
    }, 1000);
};

// function obstacles_near_spinner(obstacles, spinner){
//     on_the_right = false;
//     on_the_left = false;
//     on_the_top = false;
//     on_the_bottom = false;
//     for (let obstacle of obstacles){
//         // if ((spinner.x + spinner.sizeX === obstacle.x ) && (obstacle.y <= spinner.y + spinner.sizeY) && (spinner.y <= obstacle.y + obstacle.sizeY)){
//         //     on_the_right = true;
//         //     console.log("right")
//         // }
//         // if ((spinner.x === obstacle.x + obstacle.sizeX ) && (obstacle.y < spinner.y + spinner.sizeY) && (spinner.y < obstacle.y + obstacle.sizeY)){
//         //     on_the_left = true;
//         // }
//         // if ((spinner.y + spinner.sizeY === obstacle.y ) && (obstacle.x < spinner.x + spinner.sizeX) && (spinner.x < obstacle.x + obstacle.sizeX) && (moveDown)){
//         //     on_the_bottom = true;
//         // }
//         // if ((spinner.y  === obstacle.y + obstacle.sizeY ) && (obstacle.x <= spinner.x + spinner.sizeX) && (spinner.x <= obstacle.x + obstacle.sizeX) && (moveUp)){
//         //     on_the_top = true;
//         //     console.log("top")
//         // }
//         if (spinner.x === obstacle.x + obstacle.sizeX && spinner.y + spinner.sizeY === obstacle.y)
//     }
// }

function load_assets(assets, callback){
    let num_assets = assets.length;
    let loaded = function(){
        // console.log("loaded");
        num_assets = num_assets - 1;
        if (num_assets === 0){
            callback();
        }
    }
    for (let asset of assets) {
        let element = asset.var;
        if (element instanceof HTMLImageElement) {
            // console.log("img");
            element.addEventListener("load", loaded, false);
        }
        else if (element instanceof HTMLAudioElement){
            // console.log("audio");
            element.addEventListener("canplaythrough", loaded, false)
        }
        element.src = asset.url;
    }
}

function change_image_spinner(spinner){
    setInterval(() => {
        spinner.frameX = (spinner.frameX + 1) % 8;
    }, 150);
}

function coin_change_image(coin){
    setInterval(() => {
        coin.frameX = (coin.frameX + 1)%4;
    }, 150);
}


function invulnerable(player){
    setTimeout(() => {
        player.invulnerable = false;
    }, 3000);
}

function stop(outcome, score){
    window.removeEventListener("keydown",activate,false);
    window.removeEventListener("keydown",deactivate,false);
    window.cancelAnimationFrame(request_id);
    BackgroundAudio.pause();
    clearInterval(t);

    // let endOfGame_element = document.querySelector("#end");
    // let playAgain_element = document.createElement("p");
    // let playAgainLink_element = document.createElement("a");
    // playAgainLink_element.href = "{{" + "url_for('static',filename='labyrinth.html')" + "}}";
    // playAgainLink_element.innerHTML = "Play again";
    // endOfGame_element.appendChild(playAgain_element);
    // playAgain_element.appendChild(playAgainLink_element);

    if (outcome){
        console.log(outcome)
        console.log(score)
        let data = new FormData();
        data.append("score", score);
        xhttp = new XMLHttpRequest();
        xhttp.addEventListener("readystatechange", handle_response, false);
        xhttp.open("POST", "/store_score", true);
        xhttp.send(data);
    }
    timer_element.innerHTML = "0:00";
}

function handle_response(){
    if (xhttp.readyState === 4 ) {
        if (xhttp.status === 200 ){
            if (xhttp.responseText === "success") {
                console.log("yes")
            }
            else{
                console.log("no")
            }
        }
    }
}



