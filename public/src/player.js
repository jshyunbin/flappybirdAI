function Player(type='', gene=new DNA()) {
    let self = this;
    let FLAP = -7;
    let GRAVITY = 0.3;

    self.bird = createSprite(width/2, height/2, 40, 40);
    self.bird.rotateToDirection = true;
    self.bird.velocity.x = 0;
    self.bird.setCollider('circle', 0, 0, 20);
    self.bird.addImage(playerI);
    self.type = type;
    self.nn = new NeuralNet(gene);
    self.isDead = false;
    self.distFromPipe = width*3/4;
    self.heightFromPipe = height/2;


    self.run = function() {
        if (self.isDead) return;
        if (self.type === 'AI') {
            if (self.nn.chkMove(self.distFromPipe, self.heightFromPipe))
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

    return self;
}