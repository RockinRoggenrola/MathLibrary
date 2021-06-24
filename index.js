let math = {
    compute: require('./src/Parser').compute,
    ComplexNumber: require('./Complex Number Class')
};

console.log(math.compute('3+pi'));

module.exports = math;