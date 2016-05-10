"use strict";

const dateFormat = (originDate, format = 'yyyy-MM-dd') => {

    let date = originDate instanceof Date ? originDate : new Date(originDate);

    const o = {
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

    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }

    return format;
};

const getDate = (base = new Date(), offset = false) => {
    const now = new Date(base);
    const offsetTime = parseInt(offset === false ? now : offset) * 24 * 60 * 60 * 1000 || 0;
    const newDate = now.getTime() + offsetTime;

    return new Date(newDate);
};

module.exports = {
    dateFormat,
    getDate
};