class OperationArray {
    constructor() {
        this.addSub = [];
        this.multDiv = [];
        this.exponents = [];
        this.functions = [];
    }

    merge() {
        return this.functions.concat(this.exponents, this.multDiv, this.addSub);
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
}

module.exports = OperationArray;