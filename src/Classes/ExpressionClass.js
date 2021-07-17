const InvalidExpression = require("../Classes/InvalidExpressionClass");
const { CharacterTypes } = require("../CharacterTypes");
const UnsortedExpression = require("../Classes/UnsortedExpressionClass");
class Expression {
    constructor({ numbers, operations }) {
        this.numbers = numbers;
        this.operations = operations;
    }
    
    evaluate() {
        if (this.operations.length === 0) return this.numbers[0].fixPrecision();
        
        const operation = this.operations[0];
        const operationInputs = operation.indiciesArray.map(value => this.numbers[value]);
        const operationOutput = operation.func(operationInputs);
        let placeHolderExpr = this;

        placeHolderExpr.operations.shift();
        placeHolderExpr.numbers.splice(operation.indiciesArray[0], operation.numOfInputs, operationOutput);

        for (let i = 0; i < placeHolderExpr.operations.length; i++) {
            const operation2 = placeHolderExpr.operations[i];
            if (operation2.firstIndex > operation.firstIndex) {
                placeHolderExpr.operations[i].firstIndex -= operation.numOfInputs - 1;                
            }
        }

        return placeHolderExpr.evaluate();
    }

    static parse(exprString) {
        let currentState = 'beginning';
        let currentExpr = new UnsortedExpression(exprString);
        const { exprArray } = currentExpr; 
    
        while (currentExpr.strIndex < exprArray.length) {
    
            currentExpr.update();
            const { character, strIndex } = currentExpr;
            const nextState = CharacterTypes.get(character);
    
            if (!nextState) return new InvalidExpression(`Invalid character: ${character}.`, strIndex + 1);
            if (currentExpr.checkForInvalidCommas() && character === ',') return currentExpr.checkForInvalidCommas();
    
            const executionValue = currentExpr[currentState + nextState]();
            if (executionValue) return executionValue;
    
            if (currentExpr.isIndexAtEndOfExpr && nextState === 'number') currentExpr.makeLastNumComplex();
            currentState = nextState;
            currentExpr.strIndex += currentExpr.charLen;
            
        }
        
        if (currentExpr.totalNestingLvl !== 0) 
        return new InvalidExpression('Must have the same number of opening group smybols as closing group symbols in your expression.');
        return new Expression(currentExpr.completeParse());
    }
}

module.exports = Expression;