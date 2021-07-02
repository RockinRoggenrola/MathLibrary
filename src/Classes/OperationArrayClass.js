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
}

module.exports = OperationArray;