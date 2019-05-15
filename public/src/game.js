function Game() {
    let self = this;
    let GROUND_Y = 450;
    let OPENING = 300;
    self.players = new Population();

    self.ground = createSprite(800/2, GROUND_Y+100); // image 800x200
    self.ground.setVelocity(0,0);
    self.ground.addImage(groundI);

    self.pipes = new Group();
    self.gameOver = true;
    updateSprites(false);


    camera.position.y = height/2;

    self.run = function() {
        let bestPlayer_ind = 0, bestPlayer_dist = 0;
        if (!self.gameOver) {
            // creating pipes
            if (frameCount % 60 === 0) {
                let pipeH = random(50, 300);
                let pipe = createSprite(camera.position.x + width, GROUND_Y - pipeH / 2 + 100, 80, pipeH);
                pipe.addImage(pipeI);
                self.pipes.add(pipe);


                // top pipe
                if (pipeH + OPENING/2  < GROUND_Y) {
                    pipeH = height - (height - GROUND_Y) - (pipeH + OPENING);
                    pipe = createSprite(camera.position.x + width, pipeH / 2 - 100, 80, pipeH);
                    pipe.mirrorY(-1);
                    pipe.addImage(pipeI);
                    self.pipes.add(pipe);
                }
                if (OPENING > 100) OPENING -= 5;
            } // creating pipes

            // removing pipes
            for (let i = 0; i < self.pipes.length; i++) {
                if (self.pipes[i].position.x < camera.position.x - width / 2)
                    self.pipes[i].remove();
            }

            // set player distance from pipes and height difference
            for (let j = 0; j < self.players.population.length; j++) {
                for (let i = 0; i < self.pipes.length; i++) {
                    if (self.pipes[i].position.x - self.players.population[j].bird.position.x > 0) {
                        if (self.players.population[j].distFromPipe < self.pipes[i].position.x - self.players.population[j].bird.position.x)
                            self.players.population[j].score += 1;
                        self.players.population[j].distFromPipe = self.pipes[i].position.x - self.players.population[j].bird.position.x;
                        self.players.population[j].heightFromPipe = self.pipes[i].position.y - self.players.population[j].bird.position.y;
                        if (bestPlayer_dist < self.players.population[j].bird.position.x) {
                            bestPlayer_dist = self.players.population[j].bird.position.x;
                            bestPlayer_ind = j;
                        }
                        break;
                    }
                }
            }

            // running players
            for (let i = 0; i < self.players.population.length; i++) {
                self.players.population[i].run();
            }

            if(self.chkDead()) {
                updateSprites(false);
                self.gameOver = true;
            }
        }
        else {
            if (!gameStarted) return;
            self.players.selection();
            self.players.reproduction();
            self.pipes.removeSprites();
            for (let i = 0; i < self.players.population.length; i++) {
                self.players.population[i].bird.position.x = width/2;
                self.players.population[i].bird.position.y = height/2;
                self.players.population[i].bird.velocity.y = 0;
                self.players.population[i].bird.velocity.x = 4;
                self.players.population[i].isDead = false;
            }
            self.ground.position.x = 800/2;
            self.ground.position.y = GROUND_Y+100;
            self.score = 0;
            OPENING = 300;
            self.gameOver = false;
            updateSprites(true);
        }
        camera.position.x = self.players.population[bestPlayer_ind].bird.position.x + width/4;

        // wrap ground
        if (camera.position.x > self.ground.position.x + 800/2 - width / 2)
            self.ground.position.x += 800 - width;


        background('rgb(116,155,255)');
        camera.off();
        image(bgI, 0, GROUND_Y-190);
        camera.on();

        drawSprites(self.pipes);
        drawSprite(self.ground);
        for (let i = 0; i < self.players.population.length; i++)
            drawSprite(self.players.population[i].bird);

        // show scoreboards and current generation
        self.showScore(bestPlayer_ind);
        self.showGeneration();
    };

    self.chkDead = function() {
        let chkAllDead = true;
        for (let i = 0; i < self.players.population.length; i++) {
            if (self.players.population[i].isDead === true) continue;
            if (self.players.population[i].bird.position.y + self.players.population[i].bird.height / 2 > GROUND_Y || self.players.population[i].bird.overlap(self.pipes)) {
                self.players.population[i].bird.velocity.y = 0;
                self.players.population[i].bird.velocity.x = 0;
                self.players.population[i].isDead = true;
            }
            else chkAllDead = false;
        }
        return chkAllDead;
    };

    self.newGame = function () {
        self.pipes.removeSprites();
        self.gameOver = false;
        updateSprites(true);
        for (let i = 0; i < self.players.population.length; i++) {
            self.players.population[i].bird.position.x = width/2;
            self.players.population[i].bird.position.y = height/2;
            self.players.population[i].bird.velocity.y = 0;
            self.players.population[i].bird.velocity.x = 4;
            self.players.population[i].isDead = false;
        }
        self.players.generations = 1;
        self.ground.position.x = 800/2;
        self.ground.position.y = GROUND_Y+100;
        self.score = 0;
        OPENING = 300;
    };

    self.showScore = function(bestPlayer_ind) {
        text("BEST PLAYER'S SCORE: "+self.players.population[bestPlayer_ind].score, camera.position.x-width/2 + 10, camera.position.y-width/2 - 30);
    };

    self.showGeneration = function() {
        text("Generations: " + self.players.generations, camera.position.x-width/2+10, camera.position.y-width/2-10);
        text("Total Birds: " + self.players.population.length, camera.position.x-width/2+10, camera.position.y-width/2+10);
    };


    return self;
}