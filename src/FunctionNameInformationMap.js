const ComplexNumber = require("../ComplexNumberClass");

class FunctionDescription {
    constructor(maxNumOfInputs, minNumOfInputs, func) {
        this.maxNumOfInputs = maxNumOfInputs;
        this.minNumOfInputs = minNumOfInputs;
        this.func = func;
    }
}

const FunctionNameInformationMap = new Map();

FunctionNameInformationMap.set('exp', new FunctionDescription(1, 1, ComplexNumber.exp));
FunctionNameInformationMap.set('ln', new FunctionDescription(1, 1, ComplexNumber.ln));

module.exports = FunctionNameInformationMap;