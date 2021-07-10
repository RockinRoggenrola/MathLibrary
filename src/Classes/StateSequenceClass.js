class StateSequence {
    constructor(char1type, char2type, onFunction) {
        this.char1type = char1type;
        this.char2type = char2type;
        this.onFunction = onFunction;
    }
    
    get stateSequenceAsStr() {
        return this.char1type + this.char2type;
    }
}

module.exports = StateSequence;