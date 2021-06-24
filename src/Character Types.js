const CharacterTypes = new Map();

CharacterTypes.set('0', 'n');
CharacterTypes.set('1', 'n');
CharacterTypes.set('2', 'n');
CharacterTypes.set('3', 'n');
CharacterTypes.set('4', 'n');
CharacterTypes.set('5', 'n');
CharacterTypes.set('6', 'n');
CharacterTypes.set('7', 'n');
CharacterTypes.set('8', 'n');
CharacterTypes.set('9', 'n');

CharacterTypes.set('+', 'o');
CharacterTypes.set('-', 'o');
CharacterTypes.set('*', 'o');
CharacterTypes.set('/', 'o');
CharacterTypes.set('^', 'o');

CharacterTypes.set('pi', 'c');
CharacterTypes.set('π', 'c');
CharacterTypes.set('e', 'c');

CharacterTypes.set('.', 'd');

let longestCharLen = 0;
const keyIterator = CharacterTypes.keys();
for (key of keyIterator) {
    if (key.length > longestCharLen) longestCharLen = key.length;
}

module.exports = { CharacterTypes, longestCharLen };