function Player(type='', gene=new DNA()) {
    let self = this;
    let FLAP = -7;
    let GRAVITY = 0.3;

    self.bird = createSprite(width/2, height/2, 40, 40);
    self.bird.rotateToDirection = true;
    self.bird.velocity.x = 0;
    self.bird.setCollider('circle', 0, 0, 20);
    self.bird.addImage(playerI);
    self.score = self.bird.position.x-width/2;
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

        self.score = self.bird.position.x-width/2;
    };

    self.setFlap = function() {
        self.bird.velocity.y = FLAP;
    };

    self.crossover = function(parentB) {
        let weight1 = math.zeros([2, 3]);
        let weight2 = math.zeros([3, 1]);
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 3; j++) {
                weight1[i][j] = random() > 0.5 ? parentB.nn.gene.weight1[i][j] : self.nn.gene.weight1[i][j];
            }
        }
        for (let i = 0; i < 3; i++) weight2[i][0] = random() > 0.5 ? parentB.nn.gene.weight2[i][0] : self.nn.gene.weight2[i][0];
        return new DNA(weight1, weight2);
    };

    return self;
}