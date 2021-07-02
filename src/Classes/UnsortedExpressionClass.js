const fs = require('fs');
const process = require('process');
const ComplexNumber = require('../../ComplexNumberClass');
const NumberSymbolMap = require('../NumberSymbolMap');
const Operation = require('../Classes/OperationClass');
const OperationArray = require('./OperationArrayClass');

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
        let number = NumberSymbolMap.get(this.character);
        this.numbers.push(number);
    }

    insertOperation(operatorSymbol) {
        if (!this.operations[this.currentNestingLvl]) this.operations[this.currentNestingLvl] = new OperationArray();
        const operation = new Operation(operatorSymbol, this.numbersLen - 1, 2);

        if (operatorSymbol == '+' || operatorSymbol == '-') this.operations[this.currentNestingLvl].addSub.push(operation);
        else if (operatorSymbol == '*' || operatorSymbol == '/') this.operations[this.currentNestingLvl].multDiv.push(operation);
        else if (operatorSymbol == '^' || operatorSymbol == '**') this.operations[this.currentNestingLvl].exponents.unshift(operation); 
    } 
    
    update(character, strIndex, charLen) {
        [this.character, this.strIndex, this.charLen] = [character, strIndex, charLen];
    }

    makeLastNumComplex() {
        this.numbers[this.numbersLen - 1] = new ComplexNumber(this.lastNumber, 0);
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
