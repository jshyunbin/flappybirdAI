function Population() {
    let self = this;
    let PLAYER_NUM = 100;
    let generations = 1;

    self.population = [];
    for (let i = 0; i < PLAYER_NUM; i++) self.population.push(new Player('AI'));

    self.matingPool = [];

    self.selection = function() {
        for (let i = 0; i < self.population.length; i++) {
            let n = int(self.population[i].score);
            for (let j = 0; j < n; j++) {
                self.matingPool.push(self.population[i]);
            }
        }
    };

    self.reproduction = function() {
        self.population.clear();
        for (let i = 0; i < PLAYER_NUM; i++) {
            let a = int(math.random(self.matingPool.length));
            let b = int(math.random(self.matingPool.length));

            let parentA = self.matingPool[a];
            let parentB = self.matingPool[b];
            let child = parentA.crossover(parentB);
            child.mutate();
            self.population.push(new Player('AI', child));
        }
        generations++;
    };

    return self;
}