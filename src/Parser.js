const InvalidExpression = require('./Classes/InvalidExpressionClass');
const Expression = require('./Classes/ExpressionClass');
const stateSequenceMap = require('./StateSequenceMap');
const { CharacterTypes, longestCharLen } = require('./CharacterTypes');

function parse(exprString) {
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
        strIndex: 0,
        exprArray: exprString.trim().split(/ +/).join().split(''),
        numbersLen() {
            return this.numbers.length;
        },
        lastNumber() {
            return this.numbers[this.numbersLen() - 1];
        }
    };

    let { character, strIndex, charLen, exprArray } = currentExpression;

    for (; strIndex < exprArray.length; strIndex += charLen) {
        currentExpression.lastCharacter = character;

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
    return `${exprString.trim().split(/ +/).join('')} = ${expression.evaluate().toString()}`;
}

module.exports = { parse, compute };