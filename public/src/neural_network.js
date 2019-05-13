function NeuralNet() {
    let self=this;
    let weight1, weight2;

    weight1 = math.matrix([[random(-1, 1), random(-1, 1), random(-1, 1)], [random(-1, 1), random(-1, 1), random(-1, 1)]]);
    weight2 = math.matrix([[random(-1, 1)], [random(-1, 1)], [random(-1, 1)]]);

    self.chkMove = function(dist_from_pipe, height_from_pipe) {
        let input = math.matrix([dist_from_pipe, height_from_pipe]);
        math.squeeze(input);
        let hidden_node = math.multiply(input, weight1);
        math.squeeze(hidden_node);
        let output = math.multiply(hidden_node, weight2);
        math.squeeze(output);
        return output.subset(math.index(0)) > 0;
    };

    return self;
}