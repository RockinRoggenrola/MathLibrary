const compute = require("../Compute/ComputeFunction");
const Polynomial = require("./PolynomialClass");

class RationalFunction {
    constructor(numerator, denominator) {
        this.numerator = numerator;
        this.denominator = denominator;
    }

    evaluate(x) {
        return compute(`(${this.numerator.evaluate(x)})/(${this.denominator.evaluate(x)})`);
    }

    toString() {
        if (this.numerator.equals(this.denominator)) return '1';
        if (this.numerator.toString() === '0') return '0';
        return `(${this.numerator.toString()})/(${this.denominator.toString()})`;
    }
}

module.exports = RationalFunction;
