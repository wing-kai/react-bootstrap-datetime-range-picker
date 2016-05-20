"use strict";

var dateFormat = function dateFormat(originDate) {
    var format = arguments.length <= 1 || arguments[1] === undefined ? 'yyyy-MM-dd' : arguments[1];


    var date = originDate instanceof Date ? originDate : new Date(originDate);

    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }

    return format;
};

var getDate = function getDate() {
    var base = arguments.length <= 0 || arguments[0] === undefined ? new Date() : arguments[0];
    var offset = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    var now = new Date(base);
    var offsetTime = parseInt(offset === false ? now : offset) * 24 * 60 * 60 * 1000 || 0;
    var newDate = now.getTime() + offsetTime;

    return new Date(newDate);
};

module.exports = {
    dateFormat: dateFormat,
    getDate: getDate
};