function Game() {
    let self = this;
    let GROUND_Y = 450;
    let OPENING = 300;
    self.player = new Player();
    // self.players = [];
    // self.players.add(new Player());
    // self.players.add(new Player('AI'));

    self.ground = createSprite(800/2, GROUND_Y+100); // image 800x200
    self.ground.setVelocity(0,0);
    self.ground.addImage(groundI);

    self.pipes = new Group();
    self.gameOver = true;
    updateSprites(false);


    camera.position.y = height/2;

    self.run = function() {
        if (!self.gameOver) {
            let dist_from_pipe = width*3/4, height_from_pipe = height/2;

            if (frameCount % 60 === 0) {
                let pipeH = random(50, 300);
                let pipe = createSprite(camera.position.x + width, GROUND_Y - pipeH / 2 + 100, 80, pipeH);
                pipe.addImage(pipeI);
                self.pipes.add(pipe);


                // top pipe
                if (pipeH + OPENING/2 + 50 < GROUND_Y) {
                    pipeH = height - (height - GROUND_Y) - (pipeH + OPENING);
                    pipe = createSprite(camera.position.x + width, pipeH / 2 - 100, 80, pipeH);
                    pipe.mirrorY(-1);
                    pipe.addImage(pipeI);
                    self.pipes.add(pipe);
                }
                if (OPENING > 100) OPENING -= 5;
            }
            for (let i = 0; i < self.pipes.length; i++)
                if (self.pipes[i].position.x < self.player.bird.position.x - width / 2)
                    self.pipes[i].remove();
            self.player.run(dist_from_pipe, height_from_pipe);
            // for (let player in players) {
            //     player.run(dist_from_pipe, height_from_pipe);
            // }

            if(self.chkDead()) {
                self.player.bird.velocity.y = 0;
                self.player.bird.velocity.x = 0;
                updateSprites(false);
                self.gameOver = true;
            }
        }
        else {
            if (keyWentDown(' ')) {
                self.newGame();
                self.player.setFlap();
            }
        }
        camera.position.x = self.player.bird.position.x + width/4;

        // wrap ground
        if (camera.position.x > self.ground.position.x + 800/2 - width / 2)
            self.ground.position.x += 800 - width;


        background('rgb(116,155,255)');
        camera.off();
        image(bgI, 0, GROUND_Y-190);
        image(bgI, 400, GROUND_Y-205);
        image(bgI, )
        camera.on();

        drawSprites(self.pipes);
        drawSprite(self.ground);
        drawSprite(self.player.bird);

        self.player.showScore();
    };

    self.chkDead = function() {
        if((self.player.bird.position.y + self.player.bird.height / 2 > GROUND_Y) || (self.player.bird.overlap(self.pipes))) return true;
        else return false;
    };

    self.newGame = function () {
        self.pipes.removeSprites();
        self.gameOver = false;
        updateSprites(true);
        self.player.bird.position.x = width/2;
        self.player.bird.position.y = height/2;
        self.player.bird.velocity.y = 0;
        self.player.bird.velocity.x = 4;
        self.ground.position.x = 800/2;
        self.ground.position.y = GROUND_Y+100;
        self.score = 0;
        OPENING = 300;
    };


    return self;
}