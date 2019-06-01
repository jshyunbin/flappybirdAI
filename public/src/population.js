function Population() {
    let self = this;

    self.PLAYER_NUM = 20;
    self.generations = 1;
    self.population = [];
    // self.population.push(new Player());
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
            self.population[i].score = n;
            let j = 0;
            for (j = 0; j < self.matingPool.length; j++) {
                if (self.matingPool[j].score < n) break;
            }
            self.matingPool.splice(j, 0, self.population[i]);
            // for (let j = 0; j < n; j++) {
            //     self.matingPool.push(self.population[i]);
            // }
        }
    };

    self.reproduction = function() {
        while(self.population.length !== 0)
            self.population.pop();

        for (let i = 0; i < 5; i++) {
            for (let j = 5-i; j>0; j--) {
                let temp = self.matingPool[i];
                let tempweight1 = JSON.parse(JSON.stringify(temp.nn.gene.weight1));
                let tempweight2 = JSON.parse(JSON.stringify(temp.nn.gene.weight2));
                for (let j = 0; j < 2; j++) {
                    for (let k = 0; k < 5; k++) {
                        tempweight1[j][k] +=randomGaussian(0, 0.2);
                    }
                }
                for (let j = 0; j < 5; j++) {
                    tempweight2[j][0] += randomGaussian(0, 0.2);
                }

                let tempgene = new Player(type = 'AI', new DNA(tempweight1, tempweight2));
                tempgene.nn.gene.mutate();
                self.population.push(tempgene);
            }
        }

        for (let i = 0; i < 5; i++) {
            self.population.push(new Player(type='AI'));
        }

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
    };


    return self;
}