const stringPassed = 'supercalifragilisticexpialidocious';
let count = 0;

const stringBreak = (value, operation) => operation(value);

let stringFragments = stringBreak(
    stringPassed,
    fragment => fragment.replace(/c/g,' c').split(' ')

)

let capitalize = stringBreak(
    stringPassed,
    capitalizeA => capitalizeA.replace(/a/gi, 'A')
)

for (let i=0; i<capitalize.length; i++) {
    if (capitalize.charAt(i) == 'A') {
        count += 1;
    }
}

const capitalizeObject = {
    originalString: stringPassed,
    modifiedString: capitalize,
    numberReplaced: count,
    length: capitalize.length
};

console.log(stringFragments);
console.log(capitalizeObject);