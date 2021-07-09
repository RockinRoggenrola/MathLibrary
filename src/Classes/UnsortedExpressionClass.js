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
        this.unresolvedFunctions = [];
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
        return this.exprArray.length === this.strIndex + 1;
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
        
        if (operatorSymbol === '+' || operatorSymbol === '-') this.operations[nestingLvl].insertIntoAddSub(operation);
        else if (operatorSymbol === '*' || operatorSymbol === '/' || operatorSymbol === '÷') this.operations[nestingLvl].insertIntoMultDiv(operation);
        else if (operatorSymbol === '^' || operatorSymbol === '**') this.operations[nestingLvl].insertIntoExponents(operation);   
    }
    
    update() {
        this.lastCharacter = this.character;
        this.character = findCharFromArrayAndIndex(this.exprArray, this.strIndex);
        this.charLen = this.character.length;
    }
    
    makeLastNumComplex() {
        this.numbers[this.numbersLen - 1] = new ComplexNumber(this.lastNumber, 0);
    }
    
    checkForInvalidCommas() {
        if (!this.unresolvedFunctions.length)
        return new InvalidExpression('Can\'t use commas to separate the arguments of a function outside of a function.', this.strIndex + 1);
    }
    
    insertFunction(functionName) {
        const nestingLvl = this.currentNestingLvl;
        const arrayExistsAtNestingLvl = !!this.operations[nestingLvl];
        const functionInformation = FunctionNameInformationMap.get(functionName);
        const operatorFunction = functionInformation.func;
        const operation = new Operation(operatorFunction, this.numbersLen, 0);
        
        if (!arrayExistsAtNestingLvl) this.operations[nestingLvl] = new OperationArray();

        this.operations[nestingLvl].insertIntoFunctions(operation);
        this.unresolvedFunctions.push({
            strIndex: this.strIndex, 
            currentNumOfInputs: 0, 
            operatorIndex: this.operations.length - 1,
            functionName
        });
    }
    
    resolveFunction() {
        const lastUnresolvedFunction = this.unresolvedFunctions.pop();
        const numOfInputs = lastUnresolvedFunction.currentNumOfInputs;
        const minNumOfInputs = FunctionNameInformationMap.get(lastUnresolvedFunction.functionName).minNumOfInputs;
        
        if (numOfInputs < minNumOfInputs)
        return new InvalidExpression(`There are not enough arguments in the ${lastUnresolvedFunction.functionName} function. There can't be less than ${minNumOfInputs} argument(s).`, lastUnresolvedFunction.strIndex + 1);
    }
    
    insertFunctionArgument() {
        const lastUnresolvedFunction = this.unresolvedFunctions[this.unresolvedFunctions.length - 1];
        const numOfInputs = lastUnresolvedFunction.currentNumOfInputs + 1;
        const maxNumOfInputs = FunctionNameInformationMap.get(lastUnresolvedFunction.functionName).maxNumOfInputs;
        
        this.unresolvedFunctions[this.unresolvedFunctions.length - 1].currentNumOfInputs = numOfInputs;
        this.operations[lastUnresolvedFunction.operatorIndex].numOfInputs = numOfInputs;
        
        if (maxNumOfInputs === 'multi') return;
        if (numOfInputs > maxNumOfInputs)
        return new InvalidExpression(`There are too many arguments in the ${lastUnresolvedFunction.functionName} function. There can't be more than ${maxNumOfInputs} argument(s).`, lastUnresolvedFunction.strIndex + 1);
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
fs.readdirSync('../StateSequences').forEach(folder => {
    const fileArray = fs.readdirSync(`../StateSequences/${folder}`).filter(file => file.endsWith('.js'));

    fileArray.forEach(file => {
        const fileExports = require(`../StateSequences/${folder}/${file}`);
        UnsortedExpression.prototype[fileExports.stateSequenceAsStr] = fileExports.onFunction;
    })
});

module.exports = UnsortedExpression;