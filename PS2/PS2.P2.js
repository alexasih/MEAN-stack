function* getWordsInString (chars) {
    let this_string = chars.split(' ');
    let string_length = this_string.length;
    yield string_length;
    for (let i=0;i<string_length;i++) {
        yield this_string[i];

    }

}

const gwis = getWordsInString("All I know is something like a bird within her sang");
let value = gwis.next().value;
for (let i=0;i<value;i++) {
    console.log(gwis.next().value);
}

