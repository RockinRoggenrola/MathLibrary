const StateSequence = require('../Classes/StateSequenceClass');
const Operation = require('../Classes/OperationClass');
const InvalidExpression = require('../Classes/InvalidExpressionClass');

let onFunction = function() {
    if (this.character == '*' && 
    this.lastCharacter ==  '*' &&
    this.exprArray[this.strIndex - 2] == '*') {
        return new InvalidExpression('Can\'t have 3 successive asterisks.', this.strIndex - 1);
    }

    if (this.character == '*' && 
    this.lastCharacter ==  '*') {
        this.multDiv.pop();
        const operation = new Operation('^', this.numbersLen - 1, 2);

        this.exponents.unshift(operation);
        return;
    }

    return new InvalidExpression('Can\'t have 2 successive operators.', this.strIndex);
};

module.exports = new StateSequence('o', 'o', onFunction);