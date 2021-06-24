class Operation {
    constructor(func, firstIndex, numOfInputs) {
        this.func = func;
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

const OperationFunctionMap = new Map();

OperationFunctionMap.set('+', array => array.reduce((total, value) => total + value));
OperationFunctionMap.set('-', array => array.reduce((total, value) => total - value));
OperationFunctionMap.set('*', array => array.reduce((total, value) => total * value));
OperationFunctionMap.set('/', array => array.reduce((total, value) => total / value));

OperationFunctionMap.set('^', array => array.reduceRight((total, value) => value ** total));

module.exports = { Operation, OperationFunctionMap };