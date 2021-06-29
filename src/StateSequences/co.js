const StateSequence = require('../Classes/StateSequenceClass');
const Operation = require('../Classes/OperationClass');

let onFunction = function() {
    const operatorSymbol = this.character;
    const operation = new Operation(operatorSymbol, this.numbersLen - 1, 2);

    if (operatorSymbol == '^') {
        this.exponents.unshift(operation);
    } else if (operatorSymbol == '*' || operatorSymbol == '/') {
        this.multDiv.push(operation);
    } else if (operatorSymbol == '+' || operatorSymbol == '-') {
        this.addSub.push(operation);
    }
};

module.exports = new StateSequence('c', 'o', onFunction);