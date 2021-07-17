const StateSequence = require("../../Classes/StateSequenceClass");
const FunctionNameInformationMap = require("../../FunctionNameInformationMap");
const { GroupingSymbolMap } = require("../../GroupingSymbols");
const InvalidExpression = require("../../Classes/InvalidExpressionClass");

const onFunction = function() {
    const validCharsForMultiVarFuncs = new Set(['(', '[']);
    if (FunctionNameInformationMap.get(this.lastCharacter).maxNumOfInputs !== 1 && !validCharsForMultiVarFuncs.has(this.character))
    return new InvalidExpression(`Must have a parenthesis or square bracket after the ${this.lastCharacter} function.`, this.srtIndex);

    this.operations[this.totalNestingLvl].functions.pop();
    this.openExpressionGroup();
    
    this.totalNestingLvl--;
    this.insertFunction(this.lastCharacter);
    this.totalNestingLvl++;
};

module.exports = new StateSequence('function', 'left', onFunction);