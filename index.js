let math = {
    compute: require('./src/Parser').compute,
    ComplexNumber: require('./Complex Number Class')
};

console.log(math.compute('2+3'));

module.exports = math;