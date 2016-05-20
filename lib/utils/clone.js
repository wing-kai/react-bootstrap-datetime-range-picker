'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var clone = function clone(target) {
    if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'symbol') {
        throw TypeError('Cannot clone "Symbol" object: ' + String(target));
    }
    if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object') {
        if (target && target instanceof Set) {
            return new Set(clone([].concat(_toConsumableArray(target))));
        }
        if (target && target instanceof Map) {
            return new Map(clone([].concat(_toConsumableArray(target))));
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
};

module.exports = clone;