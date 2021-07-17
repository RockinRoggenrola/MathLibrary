const fs = require('fs');
const process = require('process');
const ComplexNumber = require('../../ComplexNumberClass');
const NumberSymbolMap = require('../NumberSymbolMap');
const Operation = require('./OperationClass');
const OperationArray = require('./OperationArrayClass');
const InvalidExpression = require('./InvalidExpressionClass');
const { findCharFromArrayAndIndex } = require('../CharacterTypes');
const { CharacterTypes, validEndingTypes } = require('../CharacterTypes');
const { OperatorFunctionMap, UnaryOperatorFunctionMap } = require('../OperatorFunctionMap');
const FunctionNameInformationMap = require('../FunctionNameInformationMap');
const { GroupingSymbolMap, RightToLeftGroupingSymbols } = require('../GroupingSymbols');

class UnsortedExpression {
    constructor(exprString) {
        this.operations = [];
        this.numbers = [];
        this.pendingFunctions = [];
        this.pendingExprGroups = [];
        this.character = '';
        this.lastCharacter = '';
        this.charLen = 0;
        this.isDecimal = 0;
        this.strIndex = 0;
        this.totalNestingLvl = 0;
        this.exprArray = 
        exprString.trim().toLowerCase().split(/ +/).join().split('');
    
        this.individualNestingLvls = {};
        GroupingSymbolMap.forEach((value, key) => this.individualNestingLvls[key] = 0);
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
        const nestingLvl = this.totalNestingLvl;
        const thereIsOperationArrayAtNestingLvl = !!this.operations[nestingLvl];

        if (!thereIsOperationArrayAtNestingLvl) this.operations[nestingLvl] = new OperationArray();
    }
    
    insertNumber() {
        const number = NumberSymbolMap.get(this.character);
        this.numbers.push(number);
    }
    
    insertOperator(operatorSymbol) {
        this.initializeOperationArrayAtNestingLvl();

        const totalNestingLvl = this.totalNestingLvl;
        const operatorFunction = OperatorFunctionMap.get(operatorSymbol);
        const operation = new Operation(operatorFunction, this.numbersLen - 1, 2);
        
        switch (operatorSymbol) {
            case '+':
            case '-':
                this.operations[totalNestingLvl].insertIntoAddSub(operation);
                break;
            case '*':
            case '/':
            case '÷':
                this.operations[totalNestingLvl].insertIntoMultDiv(operation);
                break;
            case '^':
            case '**':
                this.operations[totalNestingLvl].insertIntoExponents(operation);
                break;
        }
    }
    
    insertFunction(functionName) {
        this.initializeOperationArrayAtNestingLvl();
        
        const totalNestingLvl = this.totalNestingLvl;
        const operatorFunction = FunctionNameInformationMap.get(functionName).func;
        const operation = new Operation(operatorFunction, this.numbersLen, 1);
        
        this.operations[totalNestingLvl].insertIntoFunctions(operation);
        this.pendingFunctions.push({
            strIndex: this.strIndex, 
            currentNumOfInputs: 1, 
            operatorIndex: this.operations[this.totalNestingLvl].functions.length - 1,
            functionName
        });
    }
    
    insertFunctionArgument() {
        if (!this.pendingFunctions.length) return;
        
        const lastUnresolvedFunction = this.pendingFunctions[this.pendingFunctions.length - 1];
        const numOfInputs = lastUnresolvedFunction.currentNumOfInputs + 1;
        const maxNumOfInputs = FunctionNameInformationMap.get(lastUnresolvedFunction.functionName).maxNumOfInputs;
        
        this.pendingFunctions[this.pendingFunctions.length - 1].currentNumOfInputs = numOfInputs;
        this.operations[this.totalNestingLvl - 1].functions[lastUnresolvedFunction.operatorIndex].numOfInputs = numOfInputs;
        
        if (maxNumOfInputs === 'multi') return;
        if (numOfInputs > maxNumOfInputs)
        return new InvalidExpression(`There are too many arguments in the ${lastUnresolvedFunction.functionName} function. There can't be more than ${maxNumOfInputs} argument(s).`, lastUnresolvedFunction.strIndex + 1);
    }

    insertUnaryOperator() {
        this.initializeOperationArrayAtNestingLvl();

        const operation = new Operation(
            UnaryOperatorFunctionMap.get(this.character),
            this.numbersLen - 1, 1
        )

        this.operations[this.totalNestingLvl].insertIntoUnary(operation);
    }
    
    openExpressionGroup() {
        this.initializeOperationArrayAtNestingLvl();

        this.operations[this.totalNestingLvl].insertIntoFunctions(new Operation(
            GroupingSymbolMap.get(this.character).func, 
            this.numbersLen, 1
        ));
        
        this.totalNestingLvl++;
        this.individualNestingLvls[this.character]++;
        this.pendingExprGroups.push(this.character);
    }

    closeExpressionGroup() {
        const lastOpeningGroupSymbol = GroupingSymbolMap.get(this.pendingExprGroups[this.pendingExprGroups.length - 1]);

        if (this.totalNestingLvl === 0)
        return new InvalidExpression(`Can't have a closing ${RightToLeftGroupingSymbols.get(this.character).singular} before you have an opening one.`, 
        this.strIndex + 1);

        if (this.character !== lastOpeningGroupSymbol.right) 
        return new InvalidExpression(`Can't close a ${lastOpeningGroupSymbol.singular} with a ${RightToLeftGroupingSymbols.get(this.character).singular}.`,
        this.strIndex + 1);

        this.pendingExprGroups.pop();
        this.totalNestingLvl--;
        this.individualNestingLvls[this.character]--;
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
        return { numbers, operations };
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