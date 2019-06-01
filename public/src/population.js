function Population() {
    let self = this;

    self.PLAYER_NUM = 10;
    self.generations = 1;
    self.population = [];
    for (let i = 0; i < self.PLAYER_NUM; i++) self.population.push(new Player('AI'));

    self.matingPool = [];

    self.selection = function() {
        while(self.matingPool.length !== 0)
            self.matingPool.pop();

        for (let i = 0; i < self.PLAYER_NUM; i++) {
            let fitness = (self.population[i].bird.position.x/100 - self.population[i].distFromPipe/100+ 1);
            // let fitness = self.population[i].bird.position.x/100;
            // if (self.population[i].heightFromPipe > 0) fitness -= 2;
            fitness = math.pow(fitness, 2);
            let n = int(fitness);
            if (n === 0) n = 1;
            for (let j = 0; j < n; j++) {
                self.matingPool.push(self.population[i].nn.gene.copy());
            }
            console.log(n);
        }
        return this;
    };

    self.reproduction = function() {
        while(self.population.length !== 0)
            self.population.pop();

        for (let i = 0; i < self.PLAYER_NUM; i++) {
            let temp = int(math.random(0, self.matingPool.length));
            let tempgene = self.matingPool[temp];
            for (let j = 0; j < 2; j++) {
                for (let k = 0; k < 5; k++) {
                    tempgene.weight1[j][k] += randomGaussian(0, 1);
                }
            }
            for (let j = 0; j < 5; j++) {
                tempgene.weight2[j][0] += randomGaussian(0, 1);
            }
            self.population.push(new Player('AI', self.matingPool[temp]));
        }
        console.log(self.matingPool);
        console.log(self.matingPool.length);
        /*
        for (let i = 0; i < self.PLAYER_NUM; i++) {
            let a = int(math.random(0, self.matingPool.length));
            let b = int(math.random(0, self.matingPool.length));

            let parentA = self.matingPool[a];
            let parentB = self.matingPool[b];
            let child = parentA.crossover(parentB);
            child.mutate();
            self.population.push(new Player('AI', child));
        }
         */

        self.generations++;
        return this;
    };


    return self;
}