const StateSequence = require('../State Sequence Class');

let onFunction = function(currentExpression) {
    const { Operation, OperationFunctionMap } = require('../Operation Class');
    const operatorSymbol = currentExpression.character;
    const numbersLen = currentExpression.numbers.length;

    const operation = new Operation(
        OperationFunctionMap.get(operatorSymbol),
        numbersLen - 1, 2
    );

    if (operatorSymbol == '^') {
        currentExpression.exponents.unshift(operation);
    } else if (operatorSymbol == '*' || operatorSymbol == '/') {
        currentExpression.multDiv.push(operation);
    } else if (operatorSymbol == '+' || operatorSymbol == '-') {
        currentExpression.addSub.push(operation);
    }

    return currentExpression;
}

module.exports = new StateSequence('c', 'o', onFunction);