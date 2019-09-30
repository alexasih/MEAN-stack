function* fibs () {
    let [val1, val2, result] = [0, 1, 0];
    yield val1;
    yield val2;
    while (result < 10000) {
        result = val1+val2;
        val1 = val2;
        val2 = result;
        yield result;
    }
}

function* getEvenElements () {

    let myFibs = fibs()
    let count = 0;
    while (count < 100) {
        let this_value = myFibs.next().value;
        if (this_value % 2 == 0 && this_value != 0) {
            yield this_value;
            count+=1;
        }
    }
}

const gee = getEvenElements();
let count = 0;
while (count < 6) {
    let this_value = gee.next().value;
    if (this_value % 2 == 0) {
        console.log(this_value);
        count+=1;
    }
}




