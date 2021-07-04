const ComplexNumber = require("../ComplexNumberClass");

class FunctionDescription {
    constructor(maxNumOfInputs, minNumOfInputs, func) {
        this.maxNumOfInputs = maxNumOfInputs;
        this.minNumOfInputs = minNumOfInputs;
        this.func = func;
    }
}

const FunctionNameInformationMap = new Map();

FunctionNameInformationMap.set('square', new FunctionDescription(1, 1, ComplexNumber.square));
FunctionNameInformationMap.set('cube', new FunctionDescription(1, 1, ComplexNumber.cube));

FunctionNameInformationMap.set('sqrt', new FunctionDescription(1, 1, ComplexNumber.sqrt));
FunctionNameInformationMap.set('cbrt', new FunctionDescription(1, 1, ComplexNumber.cbrt));

FunctionNameInformationMap.set('recripocate', new FunctionDescription(1, 1, ComplexNumber.recripocate));

FunctionNameInformationMap.set('exp', new FunctionDescription(1, 1, ComplexNumber.exp));
FunctionNameInformationMap.set('ln', new FunctionDescription(1, 1, ComplexNumber.ln));

FunctionNameInformationMap.set('sin', new FunctionDescription(1, 1, ComplexNumber.sin));
FunctionNameInformationMap.set('cos', new FunctionDescription(1, 1, ComplexNumber.cos));
FunctionNameInformationMap.set('tan', new FunctionDescription(1, 1, ComplexNumber.tan));
FunctionNameInformationMap.set('sec', new FunctionDescription(1, 1, ComplexNumber.sec));
FunctionNameInformationMap.set('csc', new FunctionDescription(1, 1, ComplexNumber.csc));
FunctionNameInformationMap.set('cot', new FunctionDescription(1, 1, ComplexNumber.cot));

FunctionNameInformationMap.set('sinh', new FunctionDescription(1, 1, ComplexNumber.sinh));
FunctionNameInformationMap.set('cosh', new FunctionDescription(1, 1, ComplexNumber.cosh));
FunctionNameInformationMap.set('tanh', new FunctionDescription(1, 1, ComplexNumber.tanh));
FunctionNameInformationMap.set('sech', new FunctionDescription(1, 1, ComplexNumber.sech));
FunctionNameInformationMap.set('csch', new FunctionDescription(1, 1, ComplexNumber.csch));
FunctionNameInformationMap.set('coth', new FunctionDescription(1, 1, ComplexNumber.coth));

FunctionNameInformationMap.set('asin', new FunctionDescription(1, 1, ComplexNumber.asin));
FunctionNameInformationMap.set('acos', new FunctionDescription(1, 1, ComplexNumber.acos));
FunctionNameInformationMap.set('atan', new FunctionDescription(1, 1, ComplexNumber.atan));
FunctionNameInformationMap.set('asec', new FunctionDescription(1, 1, ComplexNumber.asec));
FunctionNameInformationMap.set('acsc', new FunctionDescription(1, 1, ComplexNumber.acsc));
FunctionNameInformationMap.set('acot', new FunctionDescription(1, 1, ComplexNumber.acot));

module.exports = FunctionNameInformationMap;