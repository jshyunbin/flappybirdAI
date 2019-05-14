function NeuralNet(g=new DNA()) {
    let self=this;
    let gene = g;


    self.chkMove = function(dist_from_pipe, height_from_pipe) {
        let input = math.matrix([dist_from_pipe, height_from_pipe]);
        math.squeeze(input);
        let hidden_node = math.multiply(input, gene.weight1);
        math.squeeze(hidden_node);
        let output = math.multiply(hidden_node, gene.weight2);
        math.squeeze(output);
        return output.subset(math.index(0)) > 0;
    };

    return self;
}