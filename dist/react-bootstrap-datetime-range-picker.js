(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DateTimeRangePicker = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
const Util = require('./utils');

const TimePicker = require('./timepicker');

const INFINITE = Symbol('∞');

const MONTH = {
    0: "一月",
    1: "二月",
    2: "三月",
    3: "四月",
    4: "五月",
    5: "六月",
    6: "七月",
    7: "八月",
    8: "九月",
    9: "十月",
    10: "十一月",
    11: "十二月"
};

const DateBlock = React.createClass({
    displayName: 'DateBlock',

    getDefaultProps() {
        return {
            date: new Date(),
            disabled: false,
            month: new Date().getMonth(),
            selecting: false,
            onClick: () => undefined,
            isBeginTime: false,
            isEndTime: false
        };
    },

    render() {
        const showDate = this.props.date.getDate();
        const showDateMonth = this.props.date.getMonth();

        let className = this.props.disabled ? "disabled" : showDateMonth !== this.props.month ? "not-this-month-date" : "";
        className += this.props.isSelected ? " selecting" : "";
        className += this.props.isBeginTime ? " is-begin-time" : "";
        className += this.props.isEndTime ? " is-end-time" : "";
        className += Util.dateFormat(this.props.date) === Util.dateFormat(new Date()) ? " today" : "";

        let otherProps = this.props.disabled ? {} : {
            onClick: () => this.props.onClick(this.props.date)
        };

        if (this.props.selecting) {
            otherProps.onMouseEnter = event => this.props.onMouseEnter(this.props.date);
        }

        return React.createElement(
            'td',
            _extends({ className: className.trim() }, otherProps),
            showDate
        );
    }
});

const Calendar = props => {
    let dateArray = [new Array(7), new Array(7), new Array(7), new Array(7), new Array(7)];
    const firstDate = new Date(props.inYear + '-' + (props.inMonth + 1));
    const firstDateDay = firstDate.getDay();
    let lastDate;

    dateArray = dateArray.map((week, i) => {
        if (i === 0) {
            week[firstDateDay] = firstDate;

            if (week[0] === undefined) {
                for (let f = firstDateDay - 1, x = -1; f >= 0; f--, x--) {
                    week[f] = Util.getDate(firstDate, x);
                }
            }

            for (let f = firstDateDay + 1, x = 1; f < 7; f++, x++) {
                week[f] = Util.getDate(firstDate, x);
            }
        } else {
            week = Array.from(week).map((x, i) => Util.getDate(lastDate, i + 1));
        }

        lastDate = week[6];
        return week;
    });

    const mapDateBlock = (date, i) => {
        const blockTime = date.getTime();

        const isBeginTimeBlock = Util.dateFormat(blockTime) === Util.dateFormat(props.beginTime);
        const isEndTimeBlock = Util.dateFormat(blockTime) === Util.dateFormat(props.endTime);

        let isSelected = false;

        if (!isBeginTimeBlock && !isEndTimeBlock) {
            isSelected = blockTime > props.beginTime.getTime() && blockTime < props.endTime.getTime();
        }

        return React.createElement(DateBlock, {
            key: i,
            date: date,
            month: props.inMonth,
            isSelected: isSelected,
            selecting: props.selecting,
            isBeginTime: isBeginTimeBlock,
            isEndTime: isEndTimeBlock,
            onClick: props.onClickDate,
            onMouseEnter: props.onMouseEnter
        });
    };

    const mapWeek = (week, i) => React.createElement(
        'tr',
        { key: i },
        week.map(mapDateBlock)
    );

    const nextMonthBtnProps = props.inYear === props.maxYear && props.inMonth === props.maxMonth ? { className: "disabled" } : { onClick: props.handleClickNextMonth };

    const previousMonthBtnProps = props.inYear === props.minYear && props.inMonth === props.minMonth ? { className: "disabled" } : { onClick: props.handleClickPreviousMonth };

    return React.createElement(
        'center',
        null,
        React.createElement(
            'table',
            { className: 'table table-condensed calendar' },
            React.createElement(
                'thead',
                null,
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'th',
                        previousMonthBtnProps,
                        React.createElement('i', { className: 'fa fa-chevron-left switch-month' })
                    ),
                    React.createElement(
                        'th',
                        { colSpan: '5' },
                        MONTH[props.inMonth] + '　' + props.inYear
                    ),
                    React.createElement(
                        'th',
                        nextMonthBtnProps,
                        React.createElement('i', { className: 'fa fa-chevron-right switch-month' })
                    )
                ),
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'th',
                        null,
                        '日'
                    ),
                    React.createElement(
                        'th',
                        null,
                        '一'
                    ),
                    React.createElement(
                        'th',
                        null,
                        '二'
                    ),
                    React.createElement(
                        'th',
                        null,
                        '三'
                    ),
                    React.createElement(
                        'th',
                        null,
                        '四'
                    ),
                    React.createElement(
                        'th',
                        null,
                        '五'
                    ),
                    React.createElement(
                        'th',
                        null,
                        '六'
                    )
                )
            ),
            React.createElement(
                'tbody',
                null,
                dateArray.map(mapWeek)
            )
        )
    );
};

const PickerBody = React.createClass({
    displayName: 'PickerBody',

    getDefaultProps() {
        return {
            show: false,
            beginTime: INFINITE,
            endTime: INFINITE
        };
    },

    getInitialState() {
        let { beginTime, endTime } = this.props;

        const beginTimeFullYear = beginTime.getFullYear();
        const beginTimeMonth = beginTime.getMonth();

        let initialState = { noEndTime: false };

        if (endTime === INFINITE) {
            endTime = new Date(beginTime.getTime() + 1000);
            initialState.noEndTime = true;
        }

        const endTimeFullYear = endTime.getFullYear();
        const endTimeMonth = endTime.getMonth();

        return _extends({}, initialState, {
            beginTime,
            endTime,
            selecting: false,
            calendar1: {
                inYear: beginTimeFullYear,
                inMonth: beginTimeMonth,
                maxYear: beginTimeFullYear,
                maxMonth: beginTimeMonth
            },
            calendar2: {
                inYear: endTimeFullYear + (beginTimeMonth === endTimeMonth && beginTimeFullYear === endTimeFullYear && beginTimeMonth === 11 ? 1 : 0),
                inMonth: beginTimeFullYear === endTimeFullYear ? beginTimeMonth === 11 ? 0 : endTimeMonth + 1 : endTimeMonth,
                minYear: beginTimeFullYear + (beginTimeMonth === 11 ? 1 : 0),
                minMonth: beginTimeMonth === 11 ? 0 : beginTimeMonth + 1
            }
        });
    },

    render() {
        const thisProps = this.props;

        const noOutline = { outline: 'none' };
        const style = _extends({
            display: thisProps.show ? 'block' : 'none',
            width: 560,
            padding: 10
        }, thisProps.leftSide ? {} : { right: 0, left: 'auto' });

        const renderEndTime = this.state.noEndTime ? new Date('2099-12-31 23:59:59') : this.state.endTime;

        return React.createElement(
            'div',
            { className: 'dropdown-menu datetime-range-picker', style: style },
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-xs-6' },
                    React.createElement(Calendar, _extends({
                        index: 'first',
                        beginTime: this.state.beginTime,
                        endTime: renderEndTime,
                        onClickDate: date => this.handleClickDate('first', date),
                        selecting: this.state.selecting,
                        onMouseEnter: this.handleMouseEnterDate,
                        handleClickPreviousMonth: () => this.handleClickPreviousMonth('first'),
                        handleClickNextMonth: () => this.handleClickNextMonth('first')
                    }, this.state.calendar1)),
                    React.createElement(TimePicker, { index: 'clock1', beginTime: this.state.beginTime, onChange: this.handleChangeTime })
                ),
                React.createElement(
                    'div',
                    { className: 'col-xs-6' },
                    React.createElement(Calendar, _extends({
                        index: 'second',
                        beginTime: this.state.beginTime,
                        endTime: renderEndTime,
                        onClickDate: date => this.handleClickDate('second', date),
                        selecting: this.state.selecting,
                        onMouseEnter: this.handleMouseEnterDate,
                        handleClickPreviousMonth: () => this.handleClickPreviousMonth('second'),
                        handleClickNextMonth: () => this.handleClickNextMonth('second')
                    }, this.state.calendar2)),
                    React.createElement(TimePicker, {
                        index: 'clock2',
                        endTime: renderEndTime,
                        onChange: this.handleChangeTime
                    })
                )
            ),
            React.createElement('hr', null),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-xs-12' },
                    React.createElement(
                        'button',
                        {
                            style: noOutline,
                            className: "btn btn-default btn-sm" + (this.state.noEndTime ? ' active' : ''),
                            onClick: this.handleToggleEndTimeLimit
                        },
                        '无截止日期'
                    ),
                    React.createElement(
                        'span',
                        { className: 'pull-right' },
                        React.createElement(
                            'button',
                            { style: noOutline, className: 'btn btn-default btn-sm', onClick: this.props.onCancel },
                            '取消'
                        ),
                        ' ',
                        React.createElement(
                            'button',
                            { style: noOutline, className: 'btn btn-success btn-sm', onClick: this.props.onConfirm },
                            '应用'
                        )
                    )
                )
            )
        );
    },

    handleClickDate(index, date) {
        const originState = this.state;
        const activeCalender = index === 'first' ? 'calendar1' : 'calendar2';

        let newState = {};

        const newDate = Util.dateFormat(date, 'yyyy-MM-dd');
        const newBeginTime = new Date(newDate + Util.dateFormat(originState.beginTime, ' hh:mm:ss'));
        const newEndTime = new Date(newDate + Util.dateFormat(originState.endTime, ' hh:mm:ss'));

        if (!originState.selecting) {
            newState = _extends({}, newState, {
                selecting: true,
                beginTime: newBeginTime,
                endTime: newEndTime
            });
        }

        if (originState.selecting) {
            if (date.getTime() < new Date(Util.dateFormat(originState.beginTime, 'yyyy-MM-dd 00:00:00')).getTime()) {
                newState = _extends({}, newState, {
                    beginTime: newBeginTime,
                    endTime: newEndTime
                });
            } else {
                newState = _extends({}, newState, {
                    beginTime: this.state.beginTime,
                    selecting: false,
                    endTime: newEndTime
                });

                if (newState.beginTime.getTime() === newState.endTime.getTime()) {
                    newState = _extends({}, newState, {
                        endTime: new Date(newState.endTime.getTime() + 1000)
                    });
                }
            }
        }

        if (date.getMonth() < originState[activeCalender].inMonth) {
            this.handleClickPreviousMonth(index);
        } else if (date.getMonth() > originState[activeCalender].inMonth) {
            this.handleClickNextMonth(index);
        }

        newState.noEndTime = false;

        this.setState(newState, () => {
            this.props.updateValue(this.state.beginTime, this.state.endTime);
        });
    },

    handleMouseEnterDate(date) {
        if (date.getTime() > this.state.beginTime.getTime()) {
            return this.setState({
                endTime: new Date(Util.dateFormat(date, 'yyyy-MM-dd') + Util.dateFormat(this.state.endTime, ' hh:mm:ss')),
                noEndTime: false
            }, () => {
                this.props.updateValue(this.state.beginTime, this.state.endTime);
            });
        }

        return this.setState({
            endTime: this.state.beginTime,
            noEndTime: false
        }, () => {
            this.props.updateValue(this.state.beginTime, this.state.endTime);
        });
    },

    handleClickPreviousMonth(index) {
        const activeCalender = index === 'first' ? 'calendar1' : 'calendar2';
        const { inMonth, inYear } = this.state[activeCalender];

        let newState = {
            [activeCalender]: _extends({}, this.state[activeCalender], {
                inMonth: inMonth === 0 ? 11 : inMonth - 1,
                inYear: inYear - (inMonth === 0 ? 1 : 0)
            })
        };

        if (activeCalender === 'calendar1') {
            newState.calendar2 = _extends({}, this.state.calendar2, {
                minMonth: newState.calendar1.inMonth === 11 ? 0 : newState.calendar1.inMonth + 1,
                minYear: newState.calendar1.inYear + (newState.calendar1.inMonth === 11 ? 1 : 0)
            });
        } else {
            newState.calendar1 = _extends({}, this.state.calendar1, {
                maxMonth: newState.calendar2.inMonth === 0 ? 11 : newState.calendar2.inMonth - 1,
                maxYear: newState.calendar2.inYear - (newState.calendar2.inMonth === 0 ? 1 : 0)
            });
        }

        if (new Date(newState.calendar1.inYear + '-' + newState.calendar1.inMonth).getTime() > new Date(newState.calendar1.maxYear + '-' + newState.calendar1.maxMonth).getTime() || new Date(newState.calendar2.inYear + '-' + newState.calendar2.inMonth).getTime() < new Date(newState.calendar2.minYear + '-' + newState.calendar2.minMonth).getTime()) {
            return;
        }

        return this.setState(newState);
    },

    handleClickNextMonth(index) {
        const activeCalender = index === 'first' ? 'calendar1' : 'calendar2';
        const { inMonth, inYear } = this.state[activeCalender];

        let newState = {
            [activeCalender]: _extends({}, this.state[activeCalender], {
                inMonth: inMonth === 11 ? 0 : inMonth + 1,
                inYear: inMonth === 11 ? inYear + 1 : inYear
            })
        };

        if (activeCalender === 'calendar1') {
            newState.calendar2 = _extends({}, this.state.calendar2, {
                minMonth: newState.calendar1.inMonth === 11 ? 0 : newState.calendar1.inMonth + 1,
                minYear: newState.calendar1.inYear + (newState.calendar1.inMonth === 11 ? 1 : 0)
            });
        } else {
            newState.calendar1 = _extends({}, this.state.calendar1, {
                maxMonth: newState.calendar2.inMonth === 0 ? 11 : newState.calendar2.inMonth - 1,
                maxYear: newState.calendar2.inYear - (newState.calendar2.inMonth === 0 ? 1 : 0)
            });
        }

        if (new Date(newState.calendar1.inYear + '-' + newState.calendar1.inMonth).getTime() > new Date(newState.calendar1.maxYear + '-' + newState.calendar1.maxMonth).getTime() || new Date(newState.calendar2.inYear + '-' + newState.calendar2.inMonth).getTime() < new Date(newState.calendar2.minYear + '-' + newState.calendar2.minMonth).getTime()) {
            return;
        }

        this.setState(newState);
    },

    handleChangeTime(index, timeStr) {
        let newState = {};

        if (index === 'clock1') {
            newState = {
                beginTime: new Date(Util.dateFormat(this.state.beginTime, 'yyyy-MM-dd') + ' ' + timeStr),
                endTime: this.state.endTime
            };
        } else {
            newState = {
                beginTime: this.state.beginTime,
                endTime: new Date(Util.dateFormat(this.state.endTime, 'yyyy-MM-dd') + ' ' + timeStr),
                noEndTime: false
            };
        }

        if (newState.beginTime.getTime() > newState.endTime.getTime()) {
            newState.endTime = new Date(newState.beginTime.getTime() + 1000);
        }

        this.setState(newState, () => {
            this.props.updateValue(this.state.beginTime, this.state.endTime);
        });
    },

    handleToggleEndTimeLimit() {
        this.setState({
            noEndTime: !this.state.noEndTime
        }, () => {
            this.props.updateValue(this.state.beginTime, this.state.noEndTime ? INFINITE : this.state.endTime);
        });
    }
});

const PickerTrigger = React.createClass({
    displayName: 'PickerTrigger',

    getDefaultProps() {
        const now = new Date();

        const beginTime = Util.getDate(now, 0);
        const endTime = Util.getDate(now, 7);

        return {
            elementType: 'input',
            beginTime,
            endTime,
            onChange: () => undefined,
            className: ''
        };
    },

    getInitialState() {
        let { beginTime, endTime } = this.props;

        endTime = endTime === 'Infinite' ? INFINITE : endTime;

        return _extends({}, this.validator(beginTime, endTime), {
            showPicker: false,
            leftSide: true
        });
    },

    componentWillReceiveProps(nextProps) {
        if (this.props.beginTime.getTime() !== nextProps.beginTime.getTime()) {
            this.setState(_extends({}, this.validator(nextProps.beginTime, nextProps.endTime)));
        }

        if (this.props.endTime !== nextProps.endTime) {
            if (this.props.endTime === 'Infinite' || nextProps.endTime === 'Infinite') {
                this.setState(_extends({}, this.validator(nextProps.beginTime, nextProps.endTime)));
            } else if (this.props.endTime.getTime() !== nextProps.endTime.getTime()) {
                this.setState(_extends({}, this.validator(nextProps.beginTime, nextProps.endTime)));
            }
        }
    },

    render() {
        const { beginTime, endTime } = this.state;

        const timeString = Util.dateFormat(this.state.beginTime, 'yyyy-MM-dd hh:mm:ss') + ' ~ ' + (endTime === INFINITE ? '∞' : Util.dateFormat(endTime, 'yyyy-MM-dd hh:mm:ss'));

        let elementProps = _extends({}, this.props);
        delete elementProps.beginTime;
        delete elementProps.endTime;
        delete elementProps.onChange;
        delete elementProps.elementType;
        delete elementProps.type;

        const wrapStyle = {
            position: 'relative',
            display: 'inline-block'
        };

        if ('style' in elementProps) {
            if ('display' in elementProps.style) {
                wrapStyle.display = elementProps.style.display;
                delete elementProps.style.display;
            }
            if ('position' in elementProps.style) {
                wrapStyle.position = elementProps.style.position;
                delete elementProps.style.position;
            }
        }

        const props = {
            show: this.state.showPicker,
            beginTime,
            endTime,
            updateValue: this.handleUpdateValue,
            onCancel: this.handleClickCancel,
            onConfirm: this.handleClickConfirm,
            leftSide: this.state.leftSide
        };

        if (this.props.elementType === 'input') {
            return React.createElement(
                'div',
                { style: wrapStyle },
                React.createElement('input', _extends({}, elementProps, {
                    ref: 'trigger',
                    onClick: this.handleClickTrigger,
                    type: 'text',
                    value: timeString,
                    className: this.props.className || 'form-control',
                    onChange: e => undefined
                })),
                this.state.showPicker ? React.createElement(PickerBody, props) : null
            );
        }

        return React.createElement(
            'div',
            { style: { position: 'relative', display: 'inline-block' } },
            React.createElement(
                'button',
                _extends({}, elementProps, {
                    ref: 'trigger',
                    onClick: this.handleClickTrigger,
                    className: this.props.className || 'btn btn-default'
                }),
                timeString
            ),
            this.state.showPicker ? React.createElement(PickerBody, props) : null
        );
    },

    validator(b, e) {
        let beginTime = b;
        let endTime = e;

        if (beginTime instanceof Date && String(beginTime) !== 'Invalid Date') {
            if (endTime instanceof Date && String(endTime) !== 'Invalid Date') {
                if (beginTime.getTime() < endTime.getTime()) {
                    return {
                        beginTime, endTime
                    };
                }
            } else if (endTime === INFINITE || endTime === 'Infinite') {
                return {
                    beginTime,
                    endTime: INFINITE
                };
            }
        }

        return {
            beginTime: new Date(),
            endTime: new Date(Util.getDate(new Date(), 7, 'yyyy-MM-dd hh:mm:ss'))
        };
    },

    handleClickTrigger() {
        const { left, width } = this.refs.trigger.getBoundingClientRect();

        const a = document.body.clientWidth - left - 570;
        const b = left + width - 570;

        this.setState({
            showPicker: true,
            leftSide: b < a
        });
    },

    handleUpdateValue(beginTime, endTime) {
        this.setState({
            beginTime,
            endTime
        });
    },

    handleClickCancel() {
        this.setState(this.getInitialState());
    },

    handleClickConfirm() {
        this.setState({
            showPicker: false
        }, () => {
            this.props.onChange(this.state.beginTime, this.state.endTime === INFINITE ? 'Infinite' : this.state.endTime);
        });
    }
});

module.exports = PickerTrigger;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./timepicker":2,"./utils":5}],2:[function(require,module,exports){
(function (global){
'use strict';

const React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

const TimePicker = React.createClass({
    displayName: 'TimePicker',

    render() {

        const hour = this.props[this.props.index === 'clock1' ? 'beginTime' : 'endTime'].getHours();
        const minute = this.props[this.props.index === 'clock1' ? 'beginTime' : 'endTime'].getMinutes();
        const second = this.props[this.props.index === 'clock1' ? 'beginTime' : 'endTime'].getSeconds();

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-xs-12 time-slider' },
                    React.createElement(
                        'div',
                        null,
                        '时间:'
                    ),
                    '　',
                    React.createElement('input', {
                        ref: 'hour', type: 'range',
                        min: '0', max: '23',
                        step: '1', value: hour,
                        onChange: this.handleChangeTime
                    })
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-xs-12 time-slider' },
                    React.createElement(
                        'div',
                        null,
                        '分钟:'
                    ),
                    '　',
                    React.createElement('input', {
                        ref: 'minute', type: 'range',
                        min: '0', max: '59',
                        step: '1', value: minute,
                        onChange: this.handleChangeTime
                    })
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-xs-12 time-slider' },
                    React.createElement(
                        'div',
                        null,
                        '秒钟:'
                    ),
                    '　',
                    React.createElement('input', {
                        ref: 'second', type: 'range',
                        min: '0', max: '59',
                        step: '1', value: second,
                        onChange: this.handleChangeTime
                    })
                )
            )
        );
    },

    handleChangeTime() {
        const Refs = this.refs;
        const timeStr = Refs.hour.value + ':' + Refs.minute.value + ':' + Refs.second.value;
        this.props.onChange(this.props.index, timeStr);
    }
});

module.exports = TimePicker;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
'use strict';

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
};

module.exports = clone;
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = _extends({
    clone: require('./clone')
}, require('./date'));
},{"./clone":3,"./date":4}]},{},[1])(1)
});