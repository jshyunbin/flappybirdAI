function Population() {
    let self = this;

    self.PLAYER_NUM = 30;
    self.generations = 1;
    self.population = [];
    for (let i = 0; i < self.PLAYER_NUM; i++) self.population.push(new Player('AI'));

    self.matingPool = [];

    let bestPlayerBrain = undefined;
    let bestPlayerfitness = undefined;

    self.selection = function() {
        while(self.matingPool.length !== 0)
            self.matingPool.pop();

        for (let i = 0; i < self.population.length; i++) {
            let fitness = (self.population[i].score * 10 - self.population[i].distFromPipe/100+ 1);
            fitness = math.pow(fitness, 2)/10;
            if (bestPlayerfitness === undefined) {
                bestPlayerfitness = fitness;
                bestPlayerBrain = self.population[i].nn;
            }
            else if (bestPlayerfitness < fitness) {
                bestPlayerfitness = fitness;
                bestPlayerBrain = self.population[i].nn;
            }
            let n = int(fitness);
            for (let j = 0; j < n; j++) {
                self.matingPool.push(self.population[i]);
            }
        }
        console.log(bestPlayerBrain);
        console.log(bestPlayerfitness);
        console.log(self.matingPool.length);
    };

    self.reproduction = function() {
        while(self.population.length !== 0)
            self.population.pop();

        self.population.push(new Player('AI', bestPlayerBrain.gene));
        for (let i = 0; i < self.PLAYER_NUM-1; i++) {
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