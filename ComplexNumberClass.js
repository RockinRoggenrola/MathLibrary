class ComplexNumber {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    toString() {
        // the real part is 0
        if (this.imaginary === 0 && this.real === 0) return '0';
        if (this.real === 0 && this.imaginary === 1) return 'i';
        if (this.real === 0 && this.imaginary == -1) return '-i';
        if (this.real === 0) return `${this.imaginary}i`;

        //special num2s for the imaginary part
        if (this.imaginary === 1) return `${this.real}+i`;
        if (this.imaginary === -1) return `${this.real}-i`;
        if (this.imaginary === 0) return `${this.real}`;
        
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
        return (this.real === that.real && this.imaginary === that.imaginary);
    }

    get magnitude() {
        return Math.sqrt(this.real ** 2 + this.imaginary ** 2);
    }

    get angle() {
        if (this.real > 0) return Math.atan(this.imaginary / this.real);
        if (this.real < 0 && this.imaginary >= 0) return Math.atan(this.imaginary / this.real) + Math.PI;
        if (this.real < 0 && this.imaginary <= 0) return Math.atan(this.imaginary / this.real) - Math.PI;
        if (this.imaginary === 0) return 0;
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
            if (num2.magnitude === 0) return new ComplexNumber(1, 0);
            if (num1.magnitude === 0) return new ComplexNumber(0, 0);

            const magnitude = Math.pow(num1.magnitude, num2.real) * Math.exp(-1 * num2.imaginary * num1.angle);
            const angle = num2.real * num1.angle + num2.imaginary * Math.log(num1.magnitude);

            return new ComplexNumber(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
        })
    }

    static average(arrayOfNums) {
        return ComplexNumber.divide([
            ComplexNumber.add(arrayOfNums),
            new ComplexNumber(arrayOfNums.length, 0)
        ]);
    }

    static square(arrayOfNums) {
        const number = arrayOfNums[0];
        const two = new ComplexNumber(2, 0);
        return ComplexNumber.exponentiate([number, two]);
    }
    
    static cube(arrayOfNums) {
        const number = arrayOfNums[0];
        const three = new ComplexNumber(3, 0);
        return ComplexNumber.exponentiate([number, three]);
    }

    static sqrt(arrayOfNums) {
        const oneHalf = new ComplexNumber(1/2, 0);
        return ComplexNumber.exponentiate([arrayOfNums[0], oneHalf]);
    }

    static cbrt(arrayOfNums) {
        const oneThird = new ComplexNumber(1/3, 0);
        return ComplexNumber.exponentiate([arrayOfNums[0], oneThird]);
    }

    static recripocate(arrayOfNums) {
        const number = arrayOfNums[0];
        const one = new ComplexNumber(1, 0);
        return ComplexNumber.divide([one, number]);
    }

    static abs(arrayOfNums) {
        return new ComplexNumber(arrayOfNums[0].magnitude, 0);
    }

    static argument(arrayOfNums) {
        return new ComplexNumber(arrayOfNums[0].angle, 0);
    }

    static floor(arrayOfNums) {
        const number = arrayOfNums[0];

        return ComplexNumber.multiply([
            number,
            ComplexNumber.divide([
                new ComplexNumber(Math.floor(number.magnitude), 0),
                new ComplexNumber(number.magnitude, 0)
            ])
        ]);
    }
    
    static ceiling(arrayOfNums) {
        const number = arrayOfNums[0];

        return ComplexNumber.multiply([
            number,
            ComplexNumber.divide([
                new ComplexNumber(Math.ceil(number.magnitude), 0),
                new ComplexNumber(number.magnitude, 0)
            ])
        ]);
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

    static sin(arrayOfNums) {
        const number = arrayOfNums[0];
        return new ComplexNumber(
            Math.sin(number.real)*Math.cosh(number.imaginary),
            Math.sinh(number.imaginary)*Math.cos(number.real)
        );
    }
    
    static cos(arrayOfNums) {
        const number = arrayOfNums[0];
        return new ComplexNumber(
            Math.cos(number.real)*Math.cosh(number.imaginary),
            -1*Math.sinh(number.imaginary)*Math.sin(number.real)
        );
    }

    static tan(arrayOfNums) {
        return ComplexNumber.divide([
            ComplexNumber.sin(arrayOfNums),
            ComplexNumber.cos(arrayOfNums)    
        ]);
    }

    static sec(arrayOfNums) {
        return ComplexNumber.recripocate([
            ComplexNumber.cos(arrayOfNums)
        ]);
    }
    
    static csc(arrayOfNums) {
        return ComplexNumber.recripocate([
            ComplexNumber.sin(arrayOfNums)
        ]);
    }
    
    static cot(arrayOfNums) {
        return ComplexNumber.recripocate([
            ComplexNumber.tan(arrayOfNums)
        ]);
    }
    
    static sinh(arrayOfNums) {
        const number = arrayOfNums[0];
        const imaginaryUnit = new ComplexNumber(0, 1);
        return ComplexNumber.multiply([
            imaginaryUnit,
            ComplexNumber.sin([
                new ComplexNumber(number.imaginary, -1*number.real)
            ])
        ]);
    }

    static cosh(arrayOfNums) {
        const number = arrayOfNums[0];
        const imaginaryUnit = new ComplexNumber(0, 1);
        return ComplexNumber.cos([
            ComplexNumber.multiply([
                imaginaryUnit, number
            ])
        ]);
    }
    
    static tanh(arrayOfNums) {
        return ComplexNumber.divide([
            ComplexNumber.sinh(arrayOfNums),
            ComplexNumber.cosh(arrayOfNums)
        ]);
    }
    
    static sech(arrayOfNums) {
        return ComplexNumber.recripocate([
            ComplexNumber.cosh(arrayOfNums)
        ]);
    }
    
    static csch(arrayOfNums) {
        return ComplexNumber.recripocate([
            ComplexNumber.sinh(arrayOfNums)
        ]);
    }
    
    static coth(arrayOfNums) {
        return ComplexNumber.recripocate([
            ComplexNumber.tanh(arrayOfNums)
        ]);
    }

    static asin(arrayOfNums) {
        const number = arrayOfNums[0];
        const imaginaryUnit = new ComplexNumber(0, 1);
        const one = new ComplexNumber(1, 0);
        const negativeOne = new ComplexNumber(-1, 0);
        return ComplexNumber.multiply([
            negativeOne,
            imaginaryUnit,
            ComplexNumber.ln([
                ComplexNumber.add([
                    ComplexNumber.multiply([
                        imaginaryUnit, number
                    ]),
                    ComplexNumber.sqrt([
                        ComplexNumber.subtract([
                            one,
                            ComplexNumber.square([number])
                        ])
                    ])
                ])
            ])
        ]);
    }
    
    static acos(arrayOfNums) {
        const number = arrayOfNums[0];
        const imaginaryUnit = new ComplexNumber(0, 1);
        const one = new ComplexNumber(1, 0);
        const negativeOne = new ComplexNumber(-1, 0);
        return ComplexNumber.multiply([
            negativeOne,
            imaginaryUnit,
            ComplexNumber.ln([
                ComplexNumber.add([
                    number,
                    ComplexNumber.sqrt([
                        ComplexNumber.subtract([
                            ComplexNumber.square([number]),
                            one
                        ])
                    ])
                ])
            ])
        ]);
    }

    static atan(arrayOfNums) {
        const number = arrayOfNums[0];
        const imaginaryUnit = new ComplexNumber(0, 1);
        const oneHalf = new ComplexNumber(1/2, 0);
        return ComplexNumber.multiply([
            imaginaryUnit,
            oneHalf,
            ComplexNumber.ln([
                ComplexNumber.divide([
                    ComplexNumber.add([
                        number, imaginaryUnit
                    ]),
                    ComplexNumber.subtract([
                        number, imaginaryUnit
                    ])
                ])
            ])
        ]);
    }

    
    static asec(arrayOfNums) {
        return ComplexNumber.acos([
            ComplexNumber.recripocate([
                arrayOfNums[0]
            ])
        ]);
    }
    
    static acsc(arrayOfNums) {
        return ComplexNumber.asin([
            ComplexNumber.recripocate([
                arrayOfNums[0]
            ])
        ]);
    }
    
    static acot(arrayOfNums) {
        return ComplexNumber.atan([
            ComplexNumber.recripocate([
                arrayOfNums[0]
            ])
        ]);
    }
    
    static asinh(arrayOfNums) {
        const number = arrayOfNums[0];
        const one = new ComplexNumber(1, 0);
        return ComplexNumber.ln([
            ComplexNumber.add([
                number,
                ComplexNumber.sqrt([
                    ComplexNumber.add([
                        ComplexNumber.square([number]),
                        one
                    ])
                ])
            ])
        ]);
    }
    
    static acosh(arrayOfNums) {
        const number = arrayOfNums[0];
        const one = new ComplexNumber(1, 0);
        return ComplexNumber.ln([
            ComplexNumber.add([
                number,
                ComplexNumber.sqrt([
                    ComplexNumber.subtract([
                        ComplexNumber.square([number]),
                        one
                    ])
                ])
            ])
        ]);
    }
    
    static atanh(arrayOfNums) {
        const number = arrayOfNums[0];
        const one = new ComplexNumber(1, 0);
        const oneHalf = new ComplexNumber(1/2, 0);
        return ComplexNumber.multiply([
            oneHalf,
            ComplexNumber.ln([
                ComplexNumber.divide([
                    ComplexNumber.add([one, number]),
                    ComplexNumber.subtract([one, number])
                ])
            ])
        ]);
    }
    
    static asech(arrayOfNums) {
        return ComplexNumber.acosh([
            ComplexNumber.recripocate([
                arrayOfNums[0]
            ])
        ]);
    }
    
    static acsch(arrayOfNums) {
        return ComplexNumber.asinh([
            ComplexNumber.recripocate([
                arrayOfNums[0]
            ])
        ]);
    }
    
    static acoth(arrayOfNums) {
        return ComplexNumber.asinh([
            ComplexNumber.recripocate([
                arrayOfNums[0]
            ])
        ]);
    }

}

module.exports = ComplexNumber;