function DNA(weight1 = math.random([2, 5], -1.0, 1.0), weight2 = math.random([5, 1], -1.0, 1.0)) {
    let self = this;
    let MUTATION_RATE = 0.05;

    self.weight1 = weight1;
    self.weight2 = weight2;

    self.mutate = function() {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 5; j++) {
                if (random() < MUTATION_RATE) {
                    self.weight1[i][j] += math.random(-1, 1);
                }
            }
        }
        for (let i = 0; i < 5; i++) {
            if (random() < MUTATION_RATE) {
                self.weight2[i][0] += math.random(-1, 1);
            }
        }
    };

    self.clear = function() {
        self.weight1 = math.random([2, 5], -1, 1);
        self.weight2 = math.random([5, 1], -1, 1);
    };

    self.copy = function() {
        return new DNA(self.weight1.valueOf(), self.weight2.valueOf());
    };

    return self;
}