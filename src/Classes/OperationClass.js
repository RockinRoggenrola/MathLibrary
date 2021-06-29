const OperatorFunctionMap = require('../OperatorFunctionMap');

class Operation {
    constructor(operatorSymbol, firstIndex, numOfInputs) {
        this.func = OperatorFunctionMap.get(operatorSymbol);
        this.firstIndex = firstIndex;
        this.numOfInputs = numOfInputs
    }
    get indicies() {
        let indicies = [];

        for (let i = 0; i < this.numOfInputs; i++) {
            indicies[i] = this.firstIndex + i;
        }
        
        return indicies;
    }
}

module.exports = Operation;