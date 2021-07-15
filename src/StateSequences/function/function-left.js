const StateSequence = require("../../Classes/StateSequenceClass");
const FunctionNameInformationMap = require("../../FunctionNameInformationMap");
const { GroupingSymbolMap } = require("../../GroupingSymbols");

const onFunction = function() {
    const groupingSymFunc = GroupingSymbolMap.get(this.character).function;
    if (FunctionNameInformationMap.get(this.lastCharacter).maxNumOfInputs !== 1 && groupingSymFunc !== (array => array[0]))
    console.log(true);

    this.openExpressionGroup();
    this.insertFunction(this.lastCharacter);
};

module.exports = new StateSequence('function', 'left', onFunction);