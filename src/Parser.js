const InvalidExpression = require('./Invalid Expression Class');
const Expression = require('./Expression Class');
const stateSequenceMap = require('./State Sequence Map');
const { CharacterTypes, longestCharLen } = require('./Character Types');

function parse(exprString) {
    const exprArray = exprString.split("");
    let currentState = 'b';
    let currentExpression = {
        numbers: [],
        addSub: [],
        multDiv: [],
        exponents: [],
        isDecimal: 0,
        character: '',
        charLen: 0,
        lastCharacter: '',
        strIndex: 0
    };

    let { character, strIndex, charLen } = currentExpression;

    for (; strIndex < exprArray.length; strIndex += charLen) {
        currentExpression.lastCharacter = character;

        for (i = longestCharLen; i > 0; i--) {
            const possibleCharacter = exprArray.slice(strIndex, strIndex + i);
            if (CharacterTypes.has(possibleCharacter)) character = possibleCharacter; break;
            if (possibleCharacter.length = 1) character = possibleCharacter;
        }

        const nextState = CharacterTypes.get(character) || 'u';

        if (nextState == 'u') return new InvalidExpression(`Invalid character: ${character}`, currentExpression.strIndex + 1);

        const stateSequence = stateSequenceMap.get(currentState + nextState);
        const onFunction = stateSequence.onFunction;

        [currentExpression.character, currentExpression.strIndex, currentExpression.charLen] = [character, strIndex, charLen];

        currentExpression = onFunction(currentExpression);

        if (Object.getPrototypeOf(currentExpression).constructor == InvalidExpression) return currentExpression;

        currentState = nextState;
    }
    
    const lastChacterType =  CharacterTypes.get(currentExpression.character);
    if (lastChacterType != 'n' && lastChacterType != 'c') return 
    new InvalidExpression(`Can't end an expression with a ${character}.`, strIndex);

    let { numbers, addSub, multDiv, exponents } = currentExpression;
    let operations = [...exponents, ...multDiv, ...addSub];
    return new Expression(numbers, operations);
} 

function compute(exprString) {
    const expression = parse(exprString);
    if (Object.getPrototypeOf(expression).constructor == InvalidExpression) return expression.fullMessage;
    return `${exprString} = ${expression.evaluate()}`;
}

module.exports = { parse, compute };