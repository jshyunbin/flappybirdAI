function NeuralNet() {
    let self=this;
    let weight1, weight2;

    weight1 = math.matrix([[random(-1, 1), random(-1, 1), random(-1, 1)], [random(-1, 1), random(-1, 1), random(-1, 1)]]);
    weight2 = math.matrix([[random(-1, 1)], [random(-1, 1)], [random(-1, 1)]]);

    self.chkMove = function(dist_from_pipe, height_from_pipe) {
        // TODO: match the dimensions
        let input = math.matrix([dist_from_pipe, height_from_pipe]);
        let hidden_node = math.multiply(input, weight1);
        let output = math.multiply(hidden_node, weight2);
        return output.subset(math.index(0, 0)) > 0;
    };

    return self;
}