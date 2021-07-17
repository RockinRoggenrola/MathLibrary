const Expression = require('../Classes/ExpressionClass');

const compute = exprString => {
    const expression = Expression.parse(exprString);
    return Object.getPrototypeOf(expression).constructor === Expression ? expression.evaluate() : expression;
}

module.exports = compute;