const StateSequence = require('../State Sequence Class');
const { Operation, OperationFunctionMap } = require('../Operation Class');
const InvalidExpression = require('../Invalid Expression Class');

let onFunction = function(currentExpression) {
    const operatorSymbol = currentExpression.character;

    if (operatorSymbol == '^') return new InvalidExpression('Can\'t have "^" at the beginning of an expression.', 1);
    else if (operatorSymbol == '*') return new InvalidExpression('Can\'t have "*" at the beginning of an expression.', 1);
    else if (operatorSymbol == '/') return new InvalidExpression('Can\'t have "/" at the beginning of an expression.', 1);
    else if (operatorSymbol == '+') return currentExpression;
    
    currentExpression.numbers.push(-1);
    const operation = new Operation(
        OperationFunctionMap.get('*'), 0, 2
    );
    currentExpression.multDiv.push(operation);

    return currentExpression;
};

module.exports = new StateSequence('b', 'o', onFunction);