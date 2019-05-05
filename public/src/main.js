let game;
let playerI, bgI, pipeI, groundI;

function preload() {
    playerI = loadImage("../assets/flappy_bird.png");
    bgI = loadImage("../assets/flappy_bg.png");
    pipeI = loadImage("../assets/flappy_pipe.png");
    groundI = loadImage("../assets/flappy_ground.png");
}

function setup() {
    let canvas = createCanvas(500, 600);
    canvas.parent('sketch-holder');
    game = new Game()
}

function draw() {
    game.run();
}

function keyPressed() {
    if (key === 'p') noLoop();
    else if (key === 'r') loop();
}