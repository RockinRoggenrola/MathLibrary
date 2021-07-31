const compute = require("../Compute/ComputeFunction");

class Polynomial {
	constructor(coefficients, optionalExponent) {
        if (optionalExponent !== undefined) {
            let coefficientArray = [];
            for (let i = 0; i < optionalExponent; i++) {
                coefficientArray.push(0);
            }
            coefficientArray.unshift(coefficients.toString());
            this.coefficients = new Polynomial(coefficientArray).coefficients;
            return;
        }

        if (coefficients[0] === undefined) {
            this.coefficients = [compute('0')];
            return;
        }

        if (compute(`${coefficients[0]}`).equals(compute('0'))) {
            this.coefficients = new Polynomial(coefficients.slice(1)).coefficients;
            return;
        }

		this.coefficients = coefficients.reverse().map(value => compute(String(value)));
	}

	get degree() {
		return this.coefficients.length - 1;
	}

    evaluate(x) {
        return this.coefficients.reduce((total, coefficient, index) => compute(`${total}+(${coefficient})(${x.exponentiateByInt(index)})`), '0');
    }

	equals(that) {
		return this.coefficients.reduce((total, value, index) => {
			return total && value.equals(that.coefficients[index]) && this.degree === that.degree;
		}, true)
	}

    isMonomial() {
        return this.equals(new Polynomial(this.coefficients[this.degree], this.degree));
    }

	toString() {
        if (this.degree === 0 && this.coefficients[0].equals(compute('0'))) return '0';

        const baseString = this.coefficients.reduce((total, value, index) => {
            if (index === 0 || value.equals(compute('0'))) var variable = '';
            else if (index === 1) var variable = 'x';
            else var variable = `x^${index}`;

            const coefficientStartsWithMinus = value.toString()[0] === '-';
            const realAndImaginaryAreNonZero = value.real !== 0 && value.imaginary !== 0;

            if (value.equals(compute('0'))) var coefficient = '';
            else if (index === 0) var coefficient = coefficientStartsWithMinus ? value : `+${value.toString()}`
            else if (value.equals(compute('1'))) var coefficient = '';
            else if (value.equals(compute('-1'))) var coefficient = '-';

            else if (coefficientStartsWithMinus && realAndImaginaryAreNonZero) var coefficient = `-(${compute(`-(${value.toString()})`)})`;
            else if (!coefficientStartsWithMinus && !realAndImaginaryAreNonZero) var coefficient = `+${value.toString()}`;
            else if (coefficientStartsWithMinus && !realAndImaginaryAreNonZero) var coefficient = value.toString();
            else if (!coefficientStartsWithMinus && realAndImaginaryAreNonZero) var coefficient = `+(${value.toString()})`

            return coefficient + variable + total;
        }, '')

        return baseString[0] === '+' ? baseString.slice(1) : baseString;
    }

	solve() {
		const [a, b, c, d, e] = this.coefficients.reverse().map(value => `(${value.toString()})`);
        this.coefficients.reverse();

		if (this.degree === 1) return [compute(`-${b}/${a}`).fixPrecision()];

		if (this.degree === 2) return [
			compute(`(-${b}+sqrt(${b}^2-4${a}${c}))/(2${a})`).fixPrecision(),
			compute(`(-${b}-sqrt(${b}^2-4${a}${c}))/(2${a})`).fixPrecision()
		];

		if (this.degree === 3) {
            const p = `(${compute(`(${c}-(${b}^2)/(3${a}))/${a}`).fixPrecision()})`;
            const q = `(${compute(`(${d}+(2${b}^3)/(27${a}^2)-(${b}${c})/(3${a}))/${a}`).fixPrecision()})`;
            const discriminant = `${compute(`${q}^2/4+${p}^3/27`).fixPrecision()}`;

            const root1 = [
                compute(`exp(0ipi/3)cbrt(-${q}/2-sqrt(${discriminant}))+exp(0ipi/3)cbrt(-${q}/2+sqrt(${discriminant}))-${b}/(3${a})`).fixPrecision(),
                compute(`exp(0ipi/3)cbrt(-${q}/2-sqrt(${discriminant}))+exp(2ipi/3)cbrt(-${q}/2+sqrt(${discriminant}))-${b}/(3${a})`).fixPrecision(),
                compute(`exp(0ipi/3)cbrt(-${q}/2-sqrt(${discriminant}))+exp(4ipi/3)cbrt(-${q}/2+sqrt(${discriminant}))-${b}/(3${a})`).fixPrecision(),
                compute(`exp(2ipi/3)cbrt(-${q}/2-sqrt(${discriminant}))+exp(0ipi/3)cbrt(-${q}/2+sqrt(${discriminant}))-${b}/(3${a})`).fixPrecision(),
                compute(`exp(2ipi/3)cbrt(-${q}/2-sqrt(${discriminant}))+exp(2ipi/3)cbrt(-${q}/2+sqrt(${discriminant}))-${b}/(3${a})`).fixPrecision(),
                compute(`exp(2ipi/3)cbrt(-${q}/2-sqrt(${discriminant}))+exp(4ipi/3)cbrt(-${q}/2+sqrt(${discriminant}))-${b}/(3${a})`).fixPrecision(),
                compute(`exp(4ipi/3)cbrt(-${q}/2-sqrt(${discriminant}))+exp(0ipi/3)cbrt(-${q}/2+sqrt(${discriminant}))-${b}/(3${a})`).fixPrecision(),
                compute(`exp(4ipi/3)cbrt(-${q}/2-sqrt(${discriminant}))+exp(2ipi/3)cbrt(-${q}/2+sqrt(${discriminant}))-${b}/(3${a})`).fixPrecision(),
                compute(`exp(4ipi/3)cbrt(-${q}/2-sqrt(${discriminant}))+exp(4ipi/3)cbrt(-${q}/2+sqrt(${discriminant}))-${b}/(3${a})`).fixPrecision()
            ].find(value => this.evaluate(value).equals(compute('0')));

            const resultingQuadratic = Polynomial.divide([this, new Polynomial([1, compute(`-(${root1})`)])]);
            return [root1, ...resultingQuadratic.solve()];
        }

		if (this.degree === 4) {
            const p = `(${compute(`(${c}-(3${b}^2)/(8${a}))/${a}`)})`;
            const q = `(${compute(`(${b}^3/(8${a}^2)-(${b}${c})/(2${a})+${d})/${a}`)})`;
            const r = `(${compute(`(${b}^4/(256${a}^3)-${b}^3/(64${a}^3)+(${b}^2${c})/(16${a}^2)+(${b}${d})/(4${a})+${e})/${a}`)})`;
            const z = `(${new Polynomial([8, `20${p}`, `16${p}^2-8${r}`, `4${p}^3-4${p}${r}-${q}^2`]).solve()[0]})`;
            const alpha = `(${compute(`sqrt(2${z}+${p})`)})`;

            return [
               compute(`-${b}/(4${a})+(${alpha}+sqrt(-2${z}-3${p}+(2${q})/${alpha}))/2`), 
               compute(`-${b}/(4${a})+(${alpha}-sqrt(-2${z}-3${p}+(2${q})/${alpha}))/2`) 
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

		if (this.coefficients[this.degree].equals(compute('1'))) return factors;
		if (this.coefficients[this.degree].equals(compute('-1'))) return '-' + factors;
		return this.coefficients[this.degree].toString() + factors;
	}
    
    static add(arrayOfPolynomials) {
        return arrayOfPolynomials.reduce((polynomial1, polynomial2) => {
            const biggerPolynomial = polynomial1.degree >= polynomial2.degree ? polynomial1 : polynomial2; 
            const smallerPolynomial = polynomial1.degree >= polynomial2.degree ? polynomial2 : polynomial1; 

            return new Polynomial(biggerPolynomial.coefficients.reduce((total, value, index) => {
                if (!smallerPolynomial.coefficients[index]) return [...total, value];
                return [...total, compute(`${value}+(${smallerPolynomial.coefficients[index]})`)];
            }, []).reverse());
        }, new Polynomial([]));
    }

    static subtract(arrayOfPolynomials) {
        return arrayOfPolynomials.reduce((polynomial1, polynomial2) => {
            const biggerPolynomial = polynomial1.degree >= polynomial2.degree ? polynomial1 : polynomial2; 
            const smallerPolynomial = polynomial1.degree >= polynomial2.degree ? polynomial2 : polynomial1; 

            return new Polynomial(biggerPolynomial.coefficients.reduce((total, value, index) => {
                if (!smallerPolynomial.coefficients[index]) return [...total, value];
                return [...total, compute(`${value}-(${smallerPolynomial.coefficients[index]})`)];
            }, []).reverse());
        }, new Polynomial([]));
    }

    static multiply(arrayOfPolynomials) {
        return arrayOfPolynomials.reduce((polynomial1, polynomial2) => {
            const polynomial1Len = polynomial1.coefficients.length;
            const polynomial2Len = polynomial2.coefficients.length;
            let product = new Polynomial([]);

            for (let exponent1 = 0; exponent1 < polynomial1Len; exponent1++) {
                const coefficient1 = polynomial1.coefficients[exponent1];
                for (let exponent2 = 0; exponent2 < polynomial2Len; exponent2++) {
                    const coefficient2 = polynomial2.coefficients[exponent2];
                    product = Polynomial.add([product, new Polynomial(compute(`(${coefficient1})(${coefficient2})`), exponent1 + exponent2)]);        
                }
            }

            return product;
        }, new Polynomial([1]))
    }

    static divide(arrayOfPolynomials) {
        return arrayOfPolynomials.reduce((polynomial1, divisor) => {
            let quotient = new Polynomial([]);
            let dividend = polynomial1;

            for (let i = 0; dividend.degree - divisor.degree >= 0; i++) {
                const nextPartOfQuotient = new Polynomial(compute(`(${dividend.coefficients[dividend.degree]})/(${divisor.coefficients[divisor.degree]})`), dividend.degree - divisor.degree);
                quotient = Polynomial.add([quotient, nextPartOfQuotient]);
                dividend = Polynomial.subtract([dividend, Polynomial.multiply([nextPartOfQuotient, divisor])])
            }

            return quotient;
        })
    }

    exponentiate(number) {
        const factors = [];
        for (let i = 0; i < number; i++) {
            factors.push(this);
        }
        return Polynomial.multiply(factors);
    }
}


module.exports = Polynomial;
