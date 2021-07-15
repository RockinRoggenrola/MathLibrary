const ComplexNumber = require("../ComplexNumberClass");

class GroupingSymbolPair {
    constructor(left, right, singular, plural, func) {
        this.left = left;
        this.right = right;
        this.singular = singular;
        this.plural = plural;
        this.func = func;
    }
}

const GroupingSymbolMap = new Map();

GroupingSymbolMap.set('(', new GroupingSymbolPair('(', ')', 'parenthesis', 'parentheses', array => array[0]));
GroupingSymbolMap.set('[', new GroupingSymbolPair('[', ']', 'square bracket', 'square brackets', array => array[0]));

GroupingSymbolMap.set('{', new GroupingSymbolPair('{', '}', 'curly brace', 'curly braces', array => ComplexNumber.frac(array)));
GroupingSymbolMap.set('⌊', new GroupingSymbolPair('⌊', '⌋', 'floor symbol', 'floor symbols', array => ComplexNumber.floor(array)));
GroupingSymbolMap.set('⌈', new GroupingSymbolPair('⌈', '⌉', 'ceiling symbol', 'ceiling symbols', array => ComplexNumber.ceiling(array)));

const RightToLeftGroupingSymbols = new Map();

GroupingSymbolMap.forEach(value => {
    RightToLeftGroupingSymbols.set(value.right, value)
});

module.exports = { GroupingSymbolMap, RightToLeftGroupingSymbols };