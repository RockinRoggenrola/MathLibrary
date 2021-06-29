const fs = require('fs');
const process = require('process');
const ComplexNumber = require('../../ComplexNumberClass');

class UnsortedExpression {
    constructor(exprString) {
        this.numbers = [];
        this.addSub = [];
        this.multDiv = [];
        this.exponents = [];
        this.isDecimal = 0;
        this.character = '';
        this.charLen = 0;
        this.lastCharacter = '';
        this.strIndex = 0;
        this.exprArray = 
        exprString.trim().split(/ +/).join().split('');
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
    
    update(character, strIndex, charLen) {
        [this.character, this.strIndex, this.charLen] = [character, strIndex, charLen];
    }

    makeLastNumComplex() {
        this.numbers[this.numbersLen - 1] = new ComplexNumber(this.lastNumber, 0);
    }

}

process.chdir(__dirname);
const stateSequcenceFiles = fs.readdirSync('../StateSequences').filter(file => file.endsWith('.js'));

stateSequcenceFiles.forEach(value => {
    const file = require(`../StateSequences/${value}`);
    UnsortedExpression.prototype[file.stateSequenceAsStr] = file.onFunction; 
})

module.exports = UnsortedExpression;
