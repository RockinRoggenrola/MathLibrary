const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    return this.checkForInvalidCommas();
};

module.exports = new StateSequence('beginning', 'comma', onFunction);