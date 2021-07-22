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
			compute(`(-${b}-sqrt(${b}^2-4${a}${c}))/(2${a})`).fixPrecision()
		];

		if (this.degree === 3) {
			const p = `(${compute(`-${b}/(3${a})`).fixPrecision()})`;
			const q = `(${compute(`${p}^3+(${b}${c}-3${a}${d})/(6${a}^2)`).fixPrecision()})`;
			const r = `(${compute(`${c}/(3${a})`).fixPrecision()})`;
			const s = compute(`${q}^2+(${r}-${p}^2)^3`).fixPrecision();

			return [
				compute(`exp(0ipi/3)(${q}+sqrt(${s}))^(1/3)+exp(0ipi/3)(${q}-sqrt(${s}))^(1/3)+${p}`).fixPrecision(),
				compute(`exp(2ipi/3)(${q}+sqrt(${s}))^(1/3)+exp(2ipi/3)(${q}-sqrt(${s}))^(1/3)+${p}`).fixPrecision(),
				compute(`exp(4ipi/3)(${q}+sqrt(${s}))^(1/3)+exp(4ipi/3)(${q}-sqrt(${s}))^(1/3)+${p}`).fixPrecision()
			];
		}

		if (this.degree === 4) {
			const discriminant = `(${compute(`256${a}^3${e}^3-192${a}^2${b}${d}${e}^2-128${a}^2${c}^2${e}^2+144${a}^2${c}${d}^2${e}-27${a}^2${d}^4+144${a}${b}^2${c}${e}^2-6${a}${b}^2${d}^2${e}-80${a}${b}${c}^2${d}${e}+18${a}${b}${c}${d}^3+16${a}${c}^4${e}-4${a}${c}^3${d}^2-27${b}^4${e}^2+18${b}^3${c}${d}${e}-4${b}^3${d}^3-4${b}^2${c}^3${e}+${b}^2${c}^2${d}^2`)})`;

			const p = `(${compute(`(8${a}${c}-3${b}^2)/(8${a}^2)`).fixPrecision()})`;
			const q = `(${compute(`(${b}^3-4${a}${b}${c}+8${a}^2${d})/(8${a}^3)`).fixPrecision()})`;
			const r = `(${compute(`${c}^2-3${b}${d}+12${a}${e}`).fixPrecision()})`;
			const s = `(${compute(`2${c}^3-9${b}${c}${d}+27${b}^2${e}+27${a}${d}^2-72${a}${c}${e}`).fixPrecision()})`;
			const t = `(${compute(`cbrt((${s}+sqrt(-27${discriminant}))/2)`).fixPrecision()})`;
			const u = `(${compute(`1/2sqrt(-2/3${p}+1/(3${a})(${t}+${r}/${t}))`).fixPrecision()})`; 

			console.log(discriminant, p, q, u, r, s, t, u);
			return [
				compute(`-${b}/(4${a})+${u}+1/2sqrt(-4${u}^2-2${p}-${q}/${u})`).fixPrecision(),
				compute(`-${b}/(4${a})+${u}-1/2sqrt(-4${u}^2-2${p}-${q}/${u})`).fixPrecision(),
				compute(`-${b}/(4${a})-${u}+1/2sqrt(-4${u}^2-2${p}-${q}/${u})`).fixPrecision(),
				compute(`-${b}/(4${a})-${u}-1/2sqrt(-4${u}^2-2${p}-${q}/${u})`).fixPrecision()
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
