function Population() {
    let self = this;

    self.PLAYER_NUM = 100;
    self.generations = 1;
    self.population = [];
    for (let i = 0; i < self.PLAYER_NUM; i++) self.population.push(new Player('AI'));

    self.matingPool = [];

    self.selection = function() {
        while(self.matingPool.length !== 0)
            self.matingPool.pop();

        for (let i = 0; i < self.population.length; i++) {
            let n = int(self.population[i].score + 10);
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