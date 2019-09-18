const operationString = input_string => {
    for (let i = 0; i < input_string.length; i++) {
        if (!isNaN(input_string.charAt(i)) == false) {
            const operation = input_string.charAt(i);
            input_string = input_string.split(operation);
            return eval(input_string[0] + operation + input_string[1]);
        }
    }
}

console.log(`${operationString('4+2')}`);
console.log(`${operationString('5*7')}`);
console.log(`${operationString('6-1')}`);
console.log(`${operationString('9/2')}`);