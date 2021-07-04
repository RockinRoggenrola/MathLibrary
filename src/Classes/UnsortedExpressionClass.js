const fs = require('fs');
const process = require('process');
const ComplexNumber = require('../../ComplexNumberClass');
const NumberSymbolMap = require('../NumberSymbolMap');
const Operation = require('./OperationClass');
const OperationArray = require('./OperationArrayClass');
const Expression = require('./ExpressionClass');
const InvalidExpression = require('./InvalidExpressionClass');
const { findCharFromArrayAndIndex } = require('../CharacterTypes');
const { CharacterTypes, validEndingTypes } = require('../CharacterTypes');
const OperatorFunctionMap = require('../OperatorFunctionMap');
const FunctionNameInformationMap = require('../FunctionNameInformationMap');

class UnsortedExpression {
    constructor(exprString) {
        this.operations = [];
        this.numbers = [];
        this.character = '';
        this.lastCharacter = '';
        this.charLen = 0;
        this.isDecimal = 0;
        this.strIndex = 0;
        this.currentNestingLvl = 0;
        this.exprArray = 
        exprString.trim().toLowerCase().split(/ +/).join().split('');
    }

    get numbersLen() {
        return this.numbers.length
    }

    get lastNumber() {
        return this.numbers[this.numbersLen - 1];
    }
    
    get isIndexAtEndOfExpr() {
        return this.exprArray.length == this.strIndex + 1;
    }

    insertNumber() {
        const number = NumberSymbolMap.get(this.character);
        this.numbers.push(number);
    }

    insertOperator(operatorSymbol) {
        const nestingLvl = this.currentNestingLvl;
        const arrayExistsAtNestingLvl = !!this.operations[nestingLvl];
        const operatorFunction = OperatorFunctionMap.get(operatorSymbol);
        const operation = new Operation(operatorFunction, this.numbersLen - 1, 2);
        
        if (!arrayExistsAtNestingLvl) this.operations[nestingLvl] = new OperationArray();        
        
        if (operatorSymbol == '+' || operatorSymbol == '-') this.operations[nestingLvl].insertIntoAddSub(operation);
        else if (operatorSymbol == '*' || operatorSymbol == '/' || operatorSymbol == '÷') this.operations[nestingLvl].insertIntoMultDiv(operation);
        else if (operatorSymbol == '^' || operatorSymbol == '**') this.operations[nestingLvl].insertIntoExponents(operation);   
    }
    
    insertFunction(functionName) {
        const nestingLvl = this.currentNestingLvl;
        const arrayExistsAtNestingLvl = !!this.operations[nestingLvl];
        const functionInformation = FunctionNameInformationMap.get(functionName);
        const operatorFunction = functionInformation.func;
        const operation = new Operation(operatorFunction, this.numbersLen, functionInformation.minNumOfInputs);
        
        if (!arrayExistsAtNestingLvl) this.operations[nestingLvl] = new OperationArray();

        this.operations[nestingLvl].insertIntoFunctions(operation);
    }

    update() {
        this.lastCharacter = this.character;
        this.character = findCharFromArrayAndIndex(this.exprArray, this.strIndex);
        this.charLen = this.character.length;
    }

    makeLastNumComplex() {
        this.numbers[this.numbersLen - 1] = new ComplexNumber(this.lastNumber, 0);
    }

    completeParse() {
        if (!validEndingTypes.has(CharacterTypes.get(this.character))) return new InvalidExpression(
            `Can't end an expression with a "${this.character}".`, undefined);
    
        const operations = this.operations.reduce((total, value) => value.merge().concat(total), []);
        const numbers = this.numbers;
        return new Expression(numbers, operations);
    }

}

process.chdir(__dirname);
let stateSequcenceFiles = [];
fs.readdirSync('../StateSequences').forEach(value => {
    const fileArray = fs.readdirSync(`../StateSequences/${value}`).filter(file => file.endsWith('.js'));
    stateSequcenceFiles = [...stateSequcenceFiles, ...fileArray];
});

stateSequcenceFiles.forEach(value => {
    const file = require(`../StateSequences/${value[0]}/${value}`);
    UnsortedExpression.prototype[file.stateSequenceAsStr] = file.onFunction; 
})

module.exports = UnsortedExpression;