const InvalidExpression = require('./Classes/InvalidExpressionClass');
const { CharacterTypes } = require('./CharacterTypes');
const UnsortedExpression = require('./Classes/UnsortedExpressionClass');

const parse = exprString => {
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
    
    if (currentExpr.nestingLvl !== 0) 
    return new InvalidExpression('Must have the same number of opening parentheses as closing parentheses in your expression.');
    return currentExpr.completeParse();
}


const compute = exprString => {
    const expression = parse(exprString);
    if (Object.getPrototypeOf(expression).constructor === InvalidExpression) return expression.fullMessage;
    return `${exprString.trim().split(/ +/).join('')} = ${expression.evaluate().toString()}`;
}

module.exports = { parse, compute };