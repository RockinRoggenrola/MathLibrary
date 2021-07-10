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
        this.pendingFunctions = [];
        this.character = '';
        this.lastCharacter = '';
        this.charLen = 0;
        this.isDecimal = 0;
        this.strIndex = 0;
        this.nestingLvl = 0;
        this.exprArray = 
        exprString.trim().toLowerCase().split(/ +/).join().split('');
    }

    get numbersLen() {
        return this.numbers.length;
    }

    get lastNumber() {
        return this.numbers[this.numbersLen - 1];
    }
    
    get isIndexAtEndOfExpr() {
        return this.exprArray.length === this.strIndex + 1;
    }
    
    update() {
        this.lastCharacter = this.character;
        this.character = findCharFromArrayAndIndex(this.exprArray, this.strIndex);
        this.charLen = this.character.length;
    }
    
    makeLastNumComplex() {
        this.numbers[this.numbersLen - 1] = new ComplexNumber(this.lastNumber, 0);
    }

    initializeOperationArrayAtNestingLvl() {
        const nestingLvl = this.nestingLvl;
        const thereIsOperationArrayAtNestingLvl = !!this.operations[nestingLvl];

        if (!thereIsOperationArrayAtNestingLvl) this.operations[nestingLvl] = new OperationArray();
    }
    
    insertNumber() {
        const number = NumberSymbolMap.get(this.character);
        this.numbers.push(number);
    }
    
    insertOperator(operatorSymbol) {
        this.initializeOperationArrayAtNestingLvl();

        const nestingLvl = this.nestingLvl;
        const operatorFunction = OperatorFunctionMap.get(operatorSymbol);
        const operation = new Operation(operatorFunction, this.numbersLen - 1, 2);
        
        switch (operatorSymbol) {
            case '+':
            case '-':
                this.operations[nestingLvl].insertIntoAddSub(operation);
                break;
            case '*':
            case '/':
            case '÷':
                this.operations[nestingLvl].insertIntoMultDiv(operation);
                break;
            case '^':
            case '**':
                this.operations[nestingLvl].insertIntoExponents(operation);
                break;
        }
    }
    
    insertFunction(functionName) {
        this.initializeOperationArrayAtNestingLvl();
    
        const nestingLvl = this.nestingLvl;
        const operatorFunction = FunctionNameInformationMap.get(functionName).func;
        const operation = new Operation(operatorFunction, this.numbersLen, 0);
        
        this.operations[nestingLvl].insertIntoFunctions(operation);
        this.pendingFunctions.push({
            strIndex: this.strIndex, 
            currentNumOfInputs: 0, 
            operatorIndex: this.operations[this.nestingLvl].functions.length - 1,
            functionName
        });
    }
    
    insertFunctionArgument() {
        if (!this.pendingFunctions.length) return;

        const lastUnresolvedFunction = this.pendingFunctions[this.pendingFunctions.length - 1];
        const numOfInputs = lastUnresolvedFunction.currentNumOfInputs + 1;
        const maxNumOfInputs = FunctionNameInformationMap.get(lastUnresolvedFunction.functionName).maxNumOfInputs;
        
        this.pendingFunctions[this.pendingFunctions.length - 1].currentNumOfInputs = numOfInputs;
        this.operations[this.nestingLvl - 1].functions[lastUnresolvedFunction.operatorIndex].numOfInputs = numOfInputs;
        
        if (maxNumOfInputs === 'multi') return;
        if (numOfInputs > maxNumOfInputs)
        return new InvalidExpression(`There are too many arguments in the ${lastUnresolvedFunction.functionName} function. There can't be more than ${maxNumOfInputs} argument(s).`, lastUnresolvedFunction.strIndex + 1);
    }
    
    checkForInvalidCommas() {
        if (!this.pendingFunctions.length) // checks that there are no resolved functions
        return new InvalidExpression('Can\'t use commas to separate the arguments of a function outside of a function.', this.strIndex + 1);
    }
    
    resolveFunction() {
        if (!this.pendingFunctions.length) return;
    
        const lastPendingFunc = this.pendingFunctions.pop();
        const numOfInputs = lastPendingFunc.currentNumOfInputs;
        const minNumOfInputs = FunctionNameInformationMap.get(lastPendingFunc.functionName).minNumOfInputs;
    
        if (numOfInputs < minNumOfInputs)
        return new InvalidExpression(`There are not enough arguments in the ${lastUnresolvedFunction.functionName} function. There can't be less than ${minNumOfInputs} argument(s).`, lastUnresolvedFunction.strIndex + 1);
    }

    completeParse() {
        if (!validEndingTypes.has(CharacterTypes.get(this.character))) return new InvalidExpression(
        `Can't end an expression with a "${this.character}".`, null);
    
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