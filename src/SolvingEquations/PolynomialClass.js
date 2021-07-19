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
        const [a, b, c, d, e] = this.coefficients.reverse().map(value => `(${value.toString()})`);
        
        if (this.degree === 1) return [compute(`-(${b})/(${a})`).fixPrecision()];

        if (this.degree === 2) return [
            compute(`(-${b}+sqrt(${b}^2-4${a}${c}))/(2${a})`).fixPrecision(),
            compute(`(-${b}-sqrt(${b}^2-4${a}${c}))/(2${a})`).fixPrecision()];
    
        if (this.degree === 3) {
            const p = `(${compute(`-${b}/(3${a})`).fixPrecision().toString()})`;
            const q = `(${compute(`${p}^3+(${b}${c}-3${a}${d})/(6${a}^2)`).fixPrecision().toString()})`;
            const r = `(${compute(`${c}/(3${a})`).fixPrecision().toString()})`;
            const discriminant = compute(`${q}^2+(${r}-${p}^2)^3`).fixPrecision().toString();

            return [
                compute(`exp(0ipi/3)(${q}+sqrt(${discriminant}))^(1/3)+exp(0ipi/3)(${q}-sqrt(${discriminant}))^(1/3)+${p}`).fixPrecision(),
                compute(`exp(2ipi/3)(${q}+sqrt(${discriminant}))^(1/3)+exp(2ipi/3)(${q}-sqrt(${discriminant}))^(1/3)+${p}`).fixPrecision(),
                compute(`exp(4ipi/3)(${q}+sqrt(${discriminant}))^(1/3)+exp(4ipi/3)(${q}-sqrt(${discriminant}))^(1/3)+${p}`).fixPrecision()
            ];
        }
    }

    factor() {
        return this.solve().map(value => new Polynomial([1, `-(${value.toString()})`]));
    }

    factoredExpressionString() {
        const factors = this.factor().reduce((total, value) => {
            if (value.toString() === 'x') return `x${total}`;
            return `${total}(${value.toString()})`;
        }, '')

        if (this.coefficients[0].equals('1')) return factors;
        if (this.coefficients[0].equals('-1')) return '-' + factors;
        return this.coefficients[0].toString() + factors;
    }

    static add(polynomial1, polynomial2) {

    }
}


module.exports = Polynomial;