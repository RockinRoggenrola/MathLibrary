let math = {
    compute: require('./src/Parser').compute,
    ComplexNumber: require('./ComplexNumberClass'),
    Expression: require('./src/Classes/ExpressionClass')
};

console.log(math.compute('3tau'));

module.exports = math;