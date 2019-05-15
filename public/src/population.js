function Population() {
    let self = this;

    self.PLAYER_NUM = 30;
    self.generations = 1;
    self.population = [];
    for (let i = 0; i < self.PLAYER_NUM; i++) self.population.push(new Player('AI'));

    self.matingPool = [];

    self.selection = function() {
        // TODO: save top players for next generation
        while(self.matingPool.length !== 0)
            self.matingPool.pop();

        for (let i = 0; i < self.population.length; i++) {
            let fitness = (self.population[i].score * 3 - self.population[i].distFromPipe/100 + width/400+ 1);
            fitness = math.pow(fitness*10, 3);
            let n = int(fitness);
            for (let j = 0; j < n; j++) {
                self.matingPool.push(self.population[i]);
            }
        }

    };

    self.reproduction = function() {
        while(self.population.length !== 0)
            self.population.pop();


        for (let i = 0; i < self.PLAYER_NUM; i++) {
            let a = int(math.random(self.matingPool.length));
            let b = int(math.random(self.matingPool.length));

            let parentA = self.matingPool[a];
            let parentB = self.matingPool[b];
            let child = parentA.crossover(parentB);
            child.mutate();
            self.population.push(new Player('AI', child));
        }
        self.generations++;
    };

    return self;
}