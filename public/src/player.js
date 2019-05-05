function Player(type='') {
    let self = this;
    let FLAP = -7;
    let GRAVITY = 0.3;

    self.bird = createSprite(width/2, height/2, 40, 40);
    self.bird.rotateToDirection = true;
    self.bird.velocity.x = 0;
    self.bird.setCollider('circle', 0, 0, 20, 20);
    self.bird.addImage(playerI);
    self.score = self.bird.position.x-width/2;
    self.type = type;
    self.nn = undefined;
    self.isDead = false;

    if (self.type === 'AI')
        self.nn = new NeuralNet();

    self.run = function(dist, height) {
        //TODO: make dead players don't move!!!
        if (self.type === 'AI') {
            if (self.nn.chkMove(dist, height))
            self.bird.velocity.y = FLAP;
        }
        else if (keyWentDown(' '))
            self.bird.velocity.y = FLAP;

        self.bird.velocity.y += GRAVITY;

        if(self.bird.position.y<0)
            self.bird.position.y = 0;
    };

    self.setFlap = function() {
        self.bird.velocity.y = FLAP;
    };

    self.showScore = function() {
        self.score = self.bird.position.x-width/2;
        text("SCORE: "+self.score/100, camera.position.x-width/2 + 10, camera.position.y-width/2 - 30);
    };


    return self;
}