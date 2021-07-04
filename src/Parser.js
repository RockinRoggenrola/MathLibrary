const InvalidExpression = require('./Classes/InvalidExpressionClass');
const { CharacterTypes } = require('./CharacterTypes');
const UnsortedExpression = require('./Classes/UnsortedExpressionClass');

const parse = exprString => {
    let currentState = 'b';
    let currentExpr = new UnsortedExpression(exprString);
    const { exprArray } = currentExpr; 

    while (currentExpr.strIndex < exprArray.length) {

        currentExpr.update();
        const { character, strIndex } = currentExpr;
        const nextState = CharacterTypes.get(character);
        
        if (!nextState) return new InvalidExpression(`Invalid character: ${character}.`, strIndex + 1);
        
        const executionValue = currentExpr[currentState + nextState]();

        try { 
            if (Object.getPrototypeOf(executionValue).constructor == InvalidExpression) 
            return executionValue;
        } catch(err) {}
        
        if (currentExpr.isIndexAtEndOfExpr && nextState == 'n') currentExpr.makeLastNumComplex();
        currentState = nextState;
        currentExpr.strIndex += currentExpr.charLen;
        
    }
    
    if (currentExpr.currentNestingLvl != 0) return new InvalidExpression(
        'Must have the same number of opening parentheses as closing parentheses in your expression.');
    return currentExpr.completeParse();
}


const compute = exprString => {
    const expression = parse(exprString);
    if (Object.getPrototypeOf(expression).constructor == InvalidExpression) return expression.fullMessage;
    return `${exprString.trim().split(/ +/).join('')} = ${expression.evaluate().toString()}`;
}

module.exports = { parse, compute };