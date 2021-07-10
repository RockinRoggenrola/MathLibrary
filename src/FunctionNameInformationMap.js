const ComplexNumber = require("../ComplexNumberClass");

class FunctionDescription {
    constructor(minNumOfInputs, maxNumOfInputs, func) {
        this.minNumOfInputs = minNumOfInputs;
        this.maxNumOfInputs = maxNumOfInputs;
        this.func = func;
    }
}

const FunctionNameInformationMap = new Map();

FunctionNameInformationMap.set('add', new FunctionDescription(1, 'multi', ComplexNumber.add));
FunctionNameInformationMap.set('subtract', new FunctionDescription(1, 'multi', ComplexNumber.subtract));
FunctionNameInformationMap.set('multiply', new FunctionDescription(1, 'multi', ComplexNumber.multiply));
FunctionNameInformationMap.set('divide', new FunctionDescription(1, 'multi', ComplexNumber.divide));
FunctionNameInformationMap.set('exponentiate', new FunctionDescription(1, 'multi', ComplexNumber.exponentiate));

FunctionNameInformationMap.set('average', new FunctionDescription(1, 'multi', ComplexNumber.average));
FunctionNameInformationMap.set('avg', new FunctionDescription(1, 'multi', ComplexNumber.average));

FunctionNameInformationMap.set('square', new FunctionDescription(1, 1, ComplexNumber.square));
FunctionNameInformationMap.set('cube', new FunctionDescription(1, 1, ComplexNumber.cube));

FunctionNameInformationMap.set('sqrt', new FunctionDescription(1, 1, ComplexNumber.sqrt));
FunctionNameInformationMap.set('√', new FunctionDescription(1, 1, ComplexNumber.sqrt));

FunctionNameInformationMap.set('cbrt', new FunctionDescription(1, 1, ComplexNumber.cbrt));
FunctionNameInformationMap.set('∛', new FunctionDescription(1, 1, ComplexNumber.cbrt));

FunctionNameInformationMap.set('recripocate', new FunctionDescription(1, 1, ComplexNumber.recripocate));

FunctionNameInformationMap.set('abs', new FunctionDescription(1, 1, ComplexNumber.abs));
FunctionNameInformationMap.set('magnitude', new FunctionDescription(1, 1, ComplexNumber.abs));

FunctionNameInformationMap.set('arg', new FunctionDescription(1, 1, ComplexNumber.argument));
FunctionNameInformationMap.set('argument', new FunctionDescription(1, 1, ComplexNumber.argument));
FunctionNameInformationMap.set('angle', new FunctionDescription(1, 1, ComplexNumber.argument));

FunctionNameInformationMap.set('floor', new FunctionDescription(1, 1, ComplexNumber.floor));
FunctionNameInformationMap.set('flr', new FunctionDescription(1, 1, ComplexNumber.floor));

FunctionNameInformationMap.set('ceiling', new FunctionDescription(1, 1, ComplexNumber.ceiling));
FunctionNameInformationMap.set('ceil', new FunctionDescription(1, 1, ComplexNumber.ceiling));

FunctionNameInformationMap.set('exp', new FunctionDescription(1, 1, ComplexNumber.exp));
FunctionNameInformationMap.set('ln', new FunctionDescription(1, 1, ComplexNumber.ln));

FunctionNameInformationMap.set('sin', new FunctionDescription(1, 1, ComplexNumber.sin));
FunctionNameInformationMap.set('cos', new FunctionDescription(1, 2, ComplexNumber.cos));
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
FunctionNameInformationMap.set('asin', new FunctionDescription(1, 1, ComplexNumber.asin));
FunctionNameInformationMap.set('acos', new FunctionDescription(1, 1, ComplexNumber.acos));
FunctionNameInformationMap.set('atan', new FunctionDescription(1, 1, ComplexNumber.atan));
FunctionNameInformationMap.set('asec', new FunctionDescription(1, 1, ComplexNumber.asec));
FunctionNameInformationMap.set('acsc', new FunctionDescription(1, 1, ComplexNumber.acsc));
FunctionNameInformationMap.set('acot', new FunctionDescription(1, 1, ComplexNumber.acot));

FunctionNameInformationMap.set('arcsin', new FunctionDescription(1, 1, ComplexNumber.asin));
FunctionNameInformationMap.set('arccos', new FunctionDescription(1, 1, ComplexNumber.acos));
FunctionNameInformationMap.set('arctan', new FunctionDescription(1, 1, ComplexNumber.atan));
FunctionNameInformationMap.set('arcsec', new FunctionDescription(1, 1, ComplexNumber.asec));
FunctionNameInformationMap.set('arccsc', new FunctionDescription(1, 1, ComplexNumber.acsc));
FunctionNameInformationMap.set('arccot', new FunctionDescription(1, 1, ComplexNumber.acot));

FunctionNameInformationMap.set('sin^-1', new FunctionDescription(1, 1, ComplexNumber.asin));
FunctionNameInformationMap.set('cos^-1', new FunctionDescription(1, 1, ComplexNumber.acos));
FunctionNameInformationMap.set('tan^-1', new FunctionDescription(1, 1, ComplexNumber.atan));
FunctionNameInformationMap.set('sec^-1', new FunctionDescription(1, 1, ComplexNumber.asec));
FunctionNameInformationMap.set('csc^-1', new FunctionDescription(1, 1, ComplexNumber.acsc));
FunctionNameInformationMap.set('cot^-1', new FunctionDescription(1, 1, ComplexNumber.acot));

FunctionNameInformationMap.set('asinh', new FunctionDescription(1, 1, ComplexNumber.asinh));
FunctionNameInformationMap.set('acosh', new FunctionDescription(1, 1, ComplexNumber.acosh));
FunctionNameInformationMap.set('atanh', new FunctionDescription(1, 1, ComplexNumber.atanh));
FunctionNameInformationMap.set('asech', new FunctionDescription(1, 1, ComplexNumber.asech));
FunctionNameInformationMap.set('acsch', new FunctionDescription(1, 1, ComplexNumber.acsch));
FunctionNameInformationMap.set('acoth', new FunctionDescription(1, 1, ComplexNumber.acoth));

FunctionNameInformationMap.set('arcsinh', new FunctionDescription(1, 1, ComplexNumber.asinh));
FunctionNameInformationMap.set('arccosh', new FunctionDescription(1, 1, ComplexNumber.acosh));
FunctionNameInformationMap.set('arctanh', new FunctionDescription(1, 1, ComplexNumber.atanh));
FunctionNameInformationMap.set('arcsech', new FunctionDescription(1, 1, ComplexNumber.asech));
FunctionNameInformationMap.set('arccsch', new FunctionDescription(1, 1, ComplexNumber.acsch));
FunctionNameInformationMap.set('arccoth', new FunctionDescription(1, 1, ComplexNumber.acoth));

FunctionNameInformationMap.set('sinh^-1', new FunctionDescription(1, 1, ComplexNumber.asinh));
FunctionNameInformationMap.set('cosh^-1', new FunctionDescription(1, 1, ComplexNumber.acosh));
FunctionNameInformationMap.set('tanh^-1', new FunctionDescription(1, 1, ComplexNumber.atanh));
FunctionNameInformationMap.set('sech^-1', new FunctionDescription(1, 1, ComplexNumber.asech));
FunctionNameInformationMap.set('csch^-1', new FunctionDescription(1, 1, ComplexNumber.acsch));
FunctionNameInformationMap.set('coth^-1', new FunctionDescription(1, 1, ComplexNumber.acoth));

module.exports = FunctionNameInformationMap;