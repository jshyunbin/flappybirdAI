function DNA(weight1 = math.random([2, 5], -1, 1), weight2 = math.random([5, 1], -1, 1)) {
    let self = this;
    let MUTATION_RATE = 0.02;

    self.weight1 = weight1;
    self.weight2 = weight2;

    self.mutate = function() {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 5; j++) {
                if (random() < MUTATION_RATE) {
                    self.weight1[i][j] = math.random(-1, 1);
                    console.log('mutated');
                }
            }
        }
        for (let i = 0; i < 5; i++) {
            if (random() < MUTATION_RATE) {
                self.weight2[i][0] = math.random(-1, 1);
                console.log('mutated');
            }
        }
    };

    return self;
}