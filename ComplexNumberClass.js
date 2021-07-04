class ComplexNumber {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    toString() {
        // the real part is 0
        if (this.imaginary == 0 && this.real == 0) return '0';
        if (this.real == 0 && this.imaginary == 1) return 'i';
        if (this.real == 0 && this.imaginary == -1) return '-i';
        if (this.real == 0) return `${this.imaginary}i`;

        //special num2s for the imaginary part
        if (this.imaginary == 1) return `${this.real}+i`;
        if (this.imaginary == -1) return `${this.real}-i`;
        if (this.imaginary == 0) return `${this.real}`;
        
        //the regular/default case
        if (this.imaginary > 0) return `${this.real}+${this.imaginary}i`;
        if (this.imaginary < 0) return `${this.real}${this.imaginary}i`; 
    }

    fixPrecision() {
        let newReal = this.real;
        let newImaginary = this.imaginary;
        
        const precisionErrReal = this.real - Math.trunc(this.real);
        const precisionErrImaginary = this.imaginary - Math.trunc(this.imaginary);
        const smallNum = 1e-10;
        
        if (Math.abs(precisionErrReal) < smallNum) newReal -= precisionErrReal;
        if (Math.abs(precisionErrImaginary) < smallNum) newImaginary -= precisionErrImaginary;

        return new ComplexNumber(newReal, newImaginary);
    }

    equals(that) {
        return (this.real == that.real && this.imaginary == that.imaginary);
    }

    get magnitude() {
        return Math.sqrt(this.real ** 2 + this.imaginary ** 2);
    }

    get angle() {
        if (this.real > 0) return Math.atan(this.imaginary / this.real);
        if (this.real < 0 && this.imaginary >= 0) return Math.atan(this.imaginary / this.real) + Math.PI;
        if (this.real < 0 && this.imaginary <= 0) return Math.atan(this.imaginary / this.real) - Math.PI;
        if (this.imaginary == 0) return 0;
        if (this.imaginary > 0) return Math.PI / 2;
        return Math.PI / -2;
    }

    static add(arrayOfNums) {
        return arrayOfNums.reduce((num1, num2) => 
            new ComplexNumber(
                num1.real + num2.real, num1.imaginary + num2.imaginary
            )
        );
    }
    
    static subtract(arrayOfNums) {
        return arrayOfNums.reduce((num1, num2) => 
            new ComplexNumber(
                num1.real - num2.real, num1.imaginary - num2.imaginary
            )
        );
    }
    
    static multiply(arrayOfNums) {
        return arrayOfNums.reduce((num1, num2) =>
            new ComplexNumber(num1.real*num2.real - num1.imaginary*num2.imaginary,
               num1.real*num2.imaginary + num1.imaginary*num2.real
            )
        );
    }
    
    static divide(arrayOfNums) {
        return arrayOfNums.reduce((num1, num2) => {
            const denominator = num2.real ** 2 + num2.imaginary ** 2;

            return new ComplexNumber(
                (num1.real*num2.real + num1.imaginary*num2.imaginary) / denominator,
                (num1.imaginary*num2.real - num1.real*num2.imaginary) /denominator
            )
        });
    }
    
    static exponentiate(arrayOfNums) {
        return arrayOfNums.reduce((num1, num2) => {
            const magnitude = Math.pow(num1.magnitude, num2.real) * Math.exp(-1 * num2.imaginary * num1.angle);
            const angle = num2.real * num1.angle + num2.imaginary * Math.log(num1.magnitude);

            return new ComplexNumber(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
        })
    }

    static exp(arrayOfNums) {
        const EulersNum = new ComplexNumber(Math.E, 0);
        return ComplexNumber.exponentiate([EulersNum, arrayOfNums[0]]);
    }

    static ln(arrayOfNums) {
        const number = arrayOfNums[0];
        return new ComplexNumber(
            Math.log(number.magnitude), number.angle
        );
    }

}

module.exports = ComplexNumber;