const InvalidExpression = require('./Classes/InvalidExpressionClass');
const Expression = require('./Classes/ExpressionClass');
const { CharacterTypes, longestCharLen, validEndingTypes } = require('./CharacterTypes');
const UnorganizedExpression = require('./Classes/UnorganizedExpressionClass');


const findCharacter = (exprArray, index) => {
    for (let i = longestCharLen; i > 0; i--) {
        const possibleCharacter = exprArray.slice(index, index + i).join("");
        if (CharacterTypes.has(possibleCharacter)) {
            return possibleCharacter;
        }
        if (i == 1) return possibleCharacter;
    }
}

const parse = exprString => {
    let currentState = 'b';
    let currentExpr = new UnorganizedExpression(exprString);
    let { character, strIndex, charLen, exprArray } = currentExpr;

    for (; strIndex < exprArray.length; strIndex += charLen) {

        currentExpr.lastCharacter = character;
        character = findCharacter(exprArray, strIndex)
        charLen = character.length;

        const nextState = CharacterTypes.get(character);
        if (!nextState) return new InvalidExpression(`Invalid character: ${character}.`, strIndex + 1);
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

    if (!validEndingTypes.has(CharacterTypes.get(character))) return new InvalidExpression(
        `Can't end an expression with a ${character}.`, undefined);

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