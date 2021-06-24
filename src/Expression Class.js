class Expression {
    constructor(numbers, operations) {
        this.numbers = numbers;
        this.operations = operations;
    }
    evaluate() {
        if (this.numbers.length == 1) return this.numbers[0];
        
        const operation = this.operations[0];
        const operationInputs = operation.indicies.map(value => this.numbers[value]);
        const operationOutput = operation.func(operationInputs);
        let placeHolderExpr = this;

        placeHolderExpr.operations.shift();
        placeHolderExpr.numbers.splice(operation.indicies[0], operation.numOfInputs, operationOutput);

        for (let i = 0; i < placeHolderExpr.operations.length; i++) {
            const operation2 = placeHolderExpr.operations[i];
            if (operation2.firstIndex > operation.firstIndex) {
                placeHolderExpr.operations[i].firstIndex -= operation.numOfInputs - 1;                
            }
        }

        return placeHolderExpr.evaluate();
    }
}

module.exports = Expression;