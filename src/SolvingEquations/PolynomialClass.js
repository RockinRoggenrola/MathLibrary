const ComplexNumber = require("../../ComplexNumberClass");
const compute = require("../Compute/ComputeFunction");

class Polynomial {
    constructor(coefficients) {
        this.coefficients = coefficients.reverse().map(value => compute(String(value)));
    }

    get degree() {
        return this.coefficients.length - 1;
    }

    equals(that) {
        return this.coefficients.reduce((total, value, index) => {
            return total && value.equals(that.coefficients[index]) && this.degree === that.degree;
        }, true)
    }

    toString() {
        const string = this.coefficients.reduce((total, value, index) => {
            const realPartIsNegative = value.real < 0;
            const coefficient =
            value.real !== 0 && value.imaginary !== 0 ?
                realPartIsNegative ?
                    `-(${compute(`-(${value.toString()})`).toString()})` :
                    `(${value.toString()})` :
                value.equals('1') || value.equals('-1') ?
                    value.equals('1') ?
                        `` :
                        `-` :    
                    value.toString();

            if (value.equals('0')) return total;
            if (index === 0 && !realPartIsNegative) return `+${value.toString()}`;
            if (index === 0) return value.toString();
            if (index === 1 && !realPartIsNegative) return `+${coefficient}x${total}`;
            if (index === 1) return `${coefficient}x${total}`;
            if (!realPartIsNegative) return `+${coefficient}x^${index}${total}`;
            else return `${coefficient}x^${index}${total}`;
        }, '')

        return string[0] === '+' ? string.slice(1) : string;
    }

    solve() {
        const [a, b, c, d, e] = this.coefficients.reverse().map(value => value.toString());
        
        if (this.degree === 1) return [compute(`-(${b})/(${a})`)];

        if (this.degree === 2) return [
            compute(`(-(${b})+sqrt((${b})^2-4(${a})(${c})))/(2(${a}))`),
            compute(`(-(${b})-sqrt((${b})^2-4(${a})(${c})))/(2(${a}))`)];
    }

    factor() {
        return this.solve().map(value => new Polynomial([1, `-(${value})`]));
    }

    factoredExpressionString() {
        return this.factor().reduce((total, value) => {
            const polynomialStr = value.toString();
            if (polynomialStr === 'x') return `x${total}`;

            return `${total}(${polynomialStr})`;
        }, '')
    }
}

module.exports = Polynomial;