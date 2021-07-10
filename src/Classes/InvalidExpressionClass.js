class InvalidExpression {
    constructor(error, index) {
        this.error = error;
        this.index =  index;
        this.baseMessage = 'Invalid Expression.';
    }
    
    get fullMessage() {
        if (!this.index) return `${this.baseMessage} ${this.error}`;

        return `${this.baseMessage} ${this.error} At character ${this.index}.`;
    }
}

module.exports =  InvalidExpression;