const InvalidExpression = require('./Invalid Expression Class');
const Expression = require('./Expression Class');
const stateSequenceMap = require('./State Sequence Map');
const CharacterTypes = require('./Character Types');

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
        lastCharacter: '',
        strIndex: 0
    };

    let { character, strIndex } = currentExpression;

    for (; strIndex < exprArray.length; strIndex++) {
        currentExpression.lastCharacter = character;

        character = exprArray[strIndex];
        const nextState = CharacterTypes.get(character) || 'u';

        if (nextState == 'u') return new InvalidExpression(`Invalid character: ${character}`, currentExpression.strIndex + 1);

        const stateSequence = stateSequenceMap.get(currentState + nextState);
        const onFunction = stateSequence.onFunction;

        [currentExpression.character, currentExpression.strIndex] = [character, strIndex];

        currentExpression = onFunction(currentExpression);

        if (Object.getPrototypeOf(currentExpression).constructor == InvalidExpression) return currentExpression;

        currentState = nextState;
    }
    
    if (CharacterTypes.get(currentExpression.character) != 'n') return 
    new InvalidExpression(`Can't end an expression with a ${character}.`, strIndex);

    let { numbers, addSub, multDiv, exponents } = currentExpression;
    let operations = [...exponents, ...multDiv, ...addSub];
    return new Expression(numbers, operations);
} 

function compute(exprString) {
    let expression = parse(exprString);
    if (Object.getPrototypeOf(expression).constructor == InvalidExpression) return expression.fullMessage;
    return `${exprString} = ${expression.evaluate()}`;
}

module.exports = { parse, compute };