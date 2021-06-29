let math = {
    compute: require('./src/Parser').compute,
    ComplexNumber: require('./ComplexNumberClass')
};

console.log(math.compute('5-2/4'));

module.exports = math;