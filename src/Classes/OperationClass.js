class Operation {
    constructor(func, firstIndex, numOfInputs) {
        this.func = func;
        this.firstIndex = firstIndex;
        this.numOfInputs = numOfInputs
    }
    
    get indiciesArray() {
        const numOfInputs = this.numOfInputs;
        let indiciesArray = [];

        for (let i = 0; i < numOfInputs; i++) {
            indiciesArray.push(this.firstIndex + i);
        }
        
        return indiciesArray;
    }
}

module.exports = Operation;