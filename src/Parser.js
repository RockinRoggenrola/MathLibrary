const InvalidExpression = require('./Classes/InvalidExpressionClass');
const Expression = require('./Classes/ExpressionClass');
const { CharacterTypes, longestCharLen } = require('./CharacterTypes');
const UnsortedExpression = require('./Classes/UnsortedExpressionClass');

function parse(exprString) {
    let currentState = 'b';
    let currentExpr = new UnsortedExpression(exprString);
    let { character, strIndex, charLen, exprArray } = currentExpr;

    for (; strIndex < exprArray.length; strIndex += charLen) {
        currentExpr.lastCharacter = character;


        for (let i = longestCharLen; i > 0; i--) {
            const possibleCharacter = exprArray.slice(strIndex, strIndex + i).join("");
            if (CharacterTypes.has(possibleCharacter)) {
                character = possibleCharacter; 
                break;
            }
            if (i == 1) character = possibleCharacter;
        }
        charLen = character.length;


        const nextState = CharacterTypes.get(character) || 'u';
        if (nextState == 'u') return new InvalidExpression(`Invalid character: ${character}.`, strIndex + 1);
        currentExpr.update(character, strIndex, charLen);
        
        if (currentState == 'n' && nextState != 'n' && nextState != 'd') currentExpr.makeLastNumComplex();

        const stateSequence = currentState + nextState;
        try { 
            if (Object.getPrototypeOf(currentExpr[stateSequence]()).constructor == InvalidExpression) 
            return currentExpr[stateSequence]();
        } catch(err) {}

        
        if (currentExpr.isIndexAtEndOfExpr && nextState == 'n') currentExpr.makeLastNumComplex();
        currentState = nextState;
    }
    
    const lastChacterType =  CharacterTypes.get(currentExpr.character);
    if (lastChacterType != 'n' && lastChacterType != 'c' && lastChacterType != 'r') return // to next line ->
    new InvalidExpression(`Can't end an expression with a ${character}.`, strIndex);

    const operations = currentExpr.operations.reduce((total, value) => value.merge().concat(total), []);
    const numbers = currentExpr.numbers;
    return new Expression(numbers, operations);
} 


function compute(exprString) {
    const expression = parse(exprString);
    if (Object.getPrototypeOf(expression).constructor == InvalidExpression) return expression.fullMessage;
    return `${exprString.trim().split(/ +/).join('')} = ${expression.evaluate().toString()}`;
}

module.exports = { parse, compute };