function NeuralNet(g=new DNA()) {
    let self=this;
    self.gene = g;


    self.chkMove = function(dist_from_pipe, height_from_pipe) {
        let input = math.matrix([dist_from_pipe/1000, height_from_pipe/1000]);
        math.squeeze(input);
        let hidden_node = math.multiply(input, self.gene.weight1);
        math.squeeze(hidden_node);
        let output = math.multiply(hidden_node, self.gene.weight2);
        math.squeeze(output);
        return math.abs(output._data[0]) < 0.3;
    };

    return self;
}