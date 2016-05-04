const clone = target => {
    if (target && typeof target === 'symbol') {
        throw TypeError('Cannot clone "Symbol" object: ' + String(target));
    }
    if (target && typeof target === 'object') {
        if (target && target instanceof Set) {
            return new Set(clone([...target]));
        }
        if (target && target instanceof Map) {
            return new Map(clone([...target]));
        }
        var newObj = target instanceof Array ? [] : {};
        for (var key in target) {
            var val = target[key];
            newObj[key] = clone(val);
        }
        return newObj;
    } else {
        return target;
    }
}

module.exports = clone;