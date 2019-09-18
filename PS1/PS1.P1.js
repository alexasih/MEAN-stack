const alphabetize = input_string => {
    input_string = input_string.replace(/[0123456789.,\/#!$%\^&\*;:{}=\-_`~()]/g,'');
    input_string = input_string.split('');
    input_string = input_string.sort();
    input_string = input_string.join('');
    return input_string;
}
console.log(`${alphabetize('supercalifragilisticexpialidocious')}`);