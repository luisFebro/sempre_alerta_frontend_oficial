function isObj(value, options = {}) {
    const { noArrays = true } = options;

    const type = typeof value;
    const generalRes = !!value && (type === "object" || type === "function");

    if (noArrays) {
        const isArrayObj = Array.isArray(value);
        return !isArrayObj && generalRes;
    }

    return generalRes;
}

module.exports = isObj;
