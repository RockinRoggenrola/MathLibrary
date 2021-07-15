class OperationArray {
    constructor() {
        this.addSub = [];
        this.multDiv = [];
        this.exponents = [];
        this.functions = [];
        this.unaryOperations = [];
    }

    merge() {
        return this.functions.concat(this.unaryOperations, this.exponents, this.multDiv, this.addSub);
    }

    insertIntoAddSub(operation) {
       this.addSub.push(operation);
    }

    insertIntoMultDiv(operation) {
        this.multDiv.push(operation);
    }

    insertIntoExponents(operation) {
        this.exponents.unshift(operation);
    }

    insertIntoFunctions(operation) {
        this.functions.push(operation);
    }

    insertIntoUnary(operation) {
        this.unaryOperations.push(operation);
    }
}

module.exports = OperationArray;