let math = {
    compute: require('./src/Parser').compute,
    ComplexNumber: require('./ComplexNumberClass'),
    Expression: require('./src/Classes/ExpressionClass')
};

console.log(math.compute('(5-3)exp(pi)'));

module.exports = math;