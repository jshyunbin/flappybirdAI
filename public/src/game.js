function Game() {
    let self = this;
    let GROUND_Y = 450;
    let OPENING = 300;
    self.players = new Population();

    self.ground = createSprite(800/2, GROUND_Y+100); // image 800x200
    self.ground.setVelocity(0,0);
    self.ground.addImage(groundI);

    self.pipes = new Group();
    self.pipeHeight = [];
    self.gameOver = true;
    self.bestScore = 0;
    self.aliveBirds = 0;
    updateSprites(false);


    camera.position.y = height/2;

    self.run = function() {
        // TODO: find the dump memory source
        let bestPlayer_ind = 0, bestPlayer_dist = 0;
        if (!self.gameOver) {
            // creating pipes
            if (frameCount % 80 === 0) {
                let pipeH = math.random(50.0, 300.0);
                let pipe = createSprite(camera.position.x + width, GROUND_Y - pipeH / 2 + 100, 80, pipeH);
                pipe.addImage(pipeI);
                self.pipes.add(pipe);
                self.pipeHeight.push(GROUND_Y - pipeH / 2 + 100);

                // top pipe
                if (pipeH + OPENING/2  < GROUND_Y) {
                    pipeH = height - (height - GROUND_Y) - (pipeH + OPENING);
                    pipe = createSprite(camera.position.x + width, pipeH / 2 - 100, 80, pipeH);
                    pipe.mirrorY(-1);
                    pipe.addImage(pipeI);
                    self.pipes.add(pipe);
                    self.pipeHeight.push(pipeH+OPENING/2);
                }
                if (OPENING > 100) OPENING -= 5;
            } // creating pipes

            // removing pipes
            for (let i = 0; i < self.pipes.length; i++) {
                if (self.pipes[i].position.x < camera.position.x - width / 2) {
                    self.pipes[i].remove();
                    self.pipeHeight.splice(i, 1);
                }
            }

            // set player distance from pipes and height difference
            for (let j = 0; j < self.players.population.length; j++) {
                for (let i = self.pipes.length-1; i >= 0; i--) {
                    if (self.pipes[i].position.x - self.players.population[j].bird.position.x > 0) {
                        if (self.players.population[j].distFromPipe < self.pipes[i].position.x - self.players.population[j].bird.position.x)
                            self.players.population[j].score += 1;

                        if (bestPlayer_dist < self.players.population[j].bird.position.x) {
                            bestPlayer_dist = self.players.population[j].bird.position.x;
                            if (bestPlayer_dist > self.bestScore) self.bestScore = bestPlayer_dist;
                            bestPlayer_ind = j;
                        }
                        break;
                    }
                }
                if (self.pipes.length >= 1) {
                    self.players.population[j].distFromPipe = self.pipes[0].position.x - self.players.population[j].bird.position.x;
                    self.players.population[j].heightFromPipe = self.pipeHeight[0] - self.players.population[j].bird.position.y;
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
                self.players.population[i].distFromPipe = width*3/4;
                self.players.population[i].heightFromPipe = height/2;
            }
            while(self.pipeHeight.length !== 0) {
                self.pipeHeight.pop();
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
        //self.showDistFromPipe(bestPlayer_ind);
    };

    self.chkDead = function() {
        let chkAllDead = true;
        self.aliveBirds = 0;
        for (let i = 0; i < self.players.population.length; i++) {
            if (self.players.population[i].isDead === true) continue;
            if (self.players.population[i].bird.position.y + self.players.population[i].bird.height / 2 > GROUND_Y || self.players.population[i].bird.overlap(self.pipes)) {
                self.players.population[i].bird.velocity.y = 0;
                self.players.population[i].bird.velocity.x = 0;
                self.players.population[i].isDead = true;
            }
            else {
                self.aliveBirds++;
                chkAllDead = false;
            }
        }
        return chkAllDead;
    };

    self.newGame = function () {
        console.log("passed thorough new Game func");
        self.pipes.removeSprites();
        self.gameOver = false;
        updateSprites(true);
        for (let i = 0; i < self.players.population.length; i++) {
            self.players.population[i].nn.gene.clear();
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
        text("BEST SCORE: "+self.bestScore, camera.position.x-width/2 + 10, camera.position.y-width/2 - 30);
        text("SCORE: " +self.players.population[bestPlayer_ind].bird.position.x, camera.position.x-width/2 + 10, camera.position.y-width/2 - 10);
    };

    self.showGeneration = function() {
        text("Generations: " + self.players.generations, camera.position.x-width/2+10, camera.position.y-width/2+10);
        text("Total Birds: " + self.aliveBirds+"/"+self.players.population.length, camera.position.x-width/2+10, camera.position.y-width/2+30);
    };

    self.showDistFromPipe = function(bestPlayer_ind) {
        text("Distance from Pipe: " + self.players.population[bestPlayer_ind].distFromPipe, camera.position.x-width/2 + 10, camera.position.y-width/2 + 30);
        text("Height difference from Pipe: " + self.players.population[bestPlayer_ind].heightFromPipe, camera.position.x-width/2 + 10, camera.position.y-width/2 + 50);
    };



    return self;
}