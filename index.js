let math = {
    compute: require('./src/Parser').compute,
    ComplexNumber: require('./Complex Number Class')
};

console.log(math.compute('π'));

module.exports = math;