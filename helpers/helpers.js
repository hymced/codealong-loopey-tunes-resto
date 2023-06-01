
function mathHelper(lvalue, operator, rvalue) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator]
};

function incHelper(value) {
    return ++value;
};

// module.exports = {
//     incHelper: incHelper,
//     mathHelper: mathHelper,
// };

module.exports = {
    incHelper,
    mathHelper,
};