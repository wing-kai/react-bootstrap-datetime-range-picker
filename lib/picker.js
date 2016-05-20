'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var Util = require('./utils');

var TimePicker = require('./timepicker');

var INFINITE = Symbol('∞');

var MONTH = {
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

var DateBlock = React.createClass({
    displayName: 'DateBlock',
    getDefaultProps: function getDefaultProps() {
        return {
            date: new Date(),
            disabled: false,
            month: new Date().getMonth(),
            selecting: false,
            onClick: function onClick() {
                return undefined;
            },
            isBeginTime: false,
            isEndTime: false
        };
    },
    render: function render() {
        var _this = this;

        var showDate = this.props.date.getDate();
        var showDateMonth = this.props.date.getMonth();

        var className = this.props.disabled ? "disabled" : showDateMonth !== this.props.month ? "not-this-month-date" : "";
        className += this.props.isSelected ? " selecting" : "";
        className += this.props.isBeginTime ? " is-begin-time" : "";
        className += this.props.isEndTime ? " is-end-time" : "";
        className += Util.dateFormat(this.props.date) === Util.dateFormat(new Date()) ? " today" : "";

        var otherProps = this.props.disabled ? {} : {
            onClick: function onClick() {
                return _this.props.onClick(_this.props.date);
            }
        };

        if (this.props.selecting) {
            otherProps.onMouseEnter = function (event) {
                return _this.props.onMouseEnter(_this.props.date);
            };
        }

        return React.createElement(
            'td',
            _extends({ className: className.trim() }, otherProps),
            showDate
        );
    }
});

var Calendar = function Calendar(props) {
    var dateArray = [new Array(7), new Array(7), new Array(7), new Array(7), new Array(7)];
    var firstDate = new Date(props.inYear + '-' + (props.inMonth + 1));
    var firstDateDay = firstDate.getDay();
    var lastDate = void 0;

    dateArray = dateArray.map(function (week, i) {
        if (i === 0) {
            week[firstDateDay] = firstDate;

            if (week[0] === undefined) {
                for (var f = firstDateDay - 1, x = -1; f >= 0; f--, x--) {
                    week[f] = Util.getDate(firstDate, x);
                }
            }

            for (var _f = firstDateDay + 1, _x = 1; _f < 7; _f++, _x++) {
                week[_f] = Util.getDate(firstDate, _x);
            }
        } else {
            week = Array.from(week).map(function (x, i) {
                return Util.getDate(lastDate, i + 1);
            });
        }

        lastDate = week[6];
        return week;
    });

    var mapDateBlock = function mapDateBlock(date, i) {
        var blockTime = date.getTime();

        var isBeginTimeBlock = Util.dateFormat(blockTime) === Util.dateFormat(props.beginTime);
        var isEndTimeBlock = Util.dateFormat(blockTime) === Util.dateFormat(props.endTime);

        var isSelected = false;

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

    var mapWeek = function mapWeek(week, i) {
        return React.createElement(
            'tr',
            { key: i },
            week.map(mapDateBlock)
        );
    };

    var nextMonthBtnProps = props.inYear === props.maxYear && props.inMonth === props.maxMonth ? { className: "disabled" } : { onClick: props.handleClickNextMonth };

    var previousMonthBtnProps = props.inYear === props.minYear && props.inMonth === props.minMonth ? { className: "disabled" } : { onClick: props.handleClickPreviousMonth };

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

var PickerBody = React.createClass({
    displayName: 'PickerBody',
    getDefaultProps: function getDefaultProps() {
        return {
            show: false,
            beginTime: INFINITE,
            endTime: INFINITE
        };
    },
    getInitialState: function getInitialState() {
        var _props = this.props;
        var beginTime = _props.beginTime;
        var endTime = _props.endTime;


        var beginTimeFullYear = beginTime.getFullYear();
        var beginTimeMonth = beginTime.getMonth();

        var initialState = { noEndTime: false };

        if (endTime === INFINITE) {
            endTime = new Date(beginTime.getTime() + 1000);
            initialState.noEndTime = true;
        }

        var endTimeFullYear = endTime.getFullYear();
        var endTimeMonth = endTime.getMonth();

        return _extends({}, initialState, {
            beginTime: beginTime,
            endTime: endTime,
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
    render: function render() {
        var _this2 = this;

        var thisProps = this.props;

        var noOutline = { outline: 'none' };
        var style = _extends({
            display: thisProps.show ? 'block' : 'none',
            width: 560,
            padding: 10
        }, thisProps.leftSide ? {} : { right: 0, left: 'auto' });

        var renderEndTime = this.state.noEndTime ? new Date('2099-12-31 23:59:59') : this.state.endTime;

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
                        onClickDate: function onClickDate(date) {
                            return _this2.handleClickDate('first', date);
                        },
                        selecting: this.state.selecting,
                        onMouseEnter: this.handleMouseEnterDate,
                        handleClickPreviousMonth: function handleClickPreviousMonth() {
                            return _this2.handleClickPreviousMonth('first');
                        },
                        handleClickNextMonth: function handleClickNextMonth() {
                            return _this2.handleClickNextMonth('first');
                        }
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
                        onClickDate: function onClickDate(date) {
                            return _this2.handleClickDate('second', date);
                        },
                        selecting: this.state.selecting,
                        onMouseEnter: this.handleMouseEnterDate,
                        handleClickPreviousMonth: function handleClickPreviousMonth() {
                            return _this2.handleClickPreviousMonth('second');
                        },
                        handleClickNextMonth: function handleClickNextMonth() {
                            return _this2.handleClickNextMonth('second');
                        }
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
    handleClickDate: function handleClickDate(index, date) {
        var _this3 = this;

        var originState = this.state;
        var activeCalender = index === 'first' ? 'calendar1' : 'calendar2';

        var newState = {};

        var newDate = Util.dateFormat(date, 'yyyy-MM-dd');
        var newBeginTime = new Date(newDate + Util.dateFormat(originState.beginTime, ' hh:mm:ss'));
        var newEndTime = new Date(newDate + Util.dateFormat(originState.endTime, ' hh:mm:ss'));

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

        this.setState(newState, function () {
            _this3.props.updateValue(_this3.state.beginTime, _this3.state.endTime);
        });
    },
    handleMouseEnterDate: function handleMouseEnterDate(date) {
        var _this4 = this;

        if (date.getTime() > this.state.beginTime.getTime()) {
            return this.setState({
                endTime: new Date(Util.dateFormat(date, 'yyyy-MM-dd') + Util.dateFormat(this.state.endTime, ' hh:mm:ss')),
                noEndTime: false
            }, function () {
                _this4.props.updateValue(_this4.state.beginTime, _this4.state.endTime);
            });
        }

        return this.setState({
            endTime: this.state.beginTime,
            noEndTime: false
        }, function () {
            _this4.props.updateValue(_this4.state.beginTime, _this4.state.endTime);
        });
    },
    handleClickPreviousMonth: function handleClickPreviousMonth(index) {
        var activeCalender = index === 'first' ? 'calendar1' : 'calendar2';
        var _state$activeCalender = this.state[activeCalender];
        var inMonth = _state$activeCalender.inMonth;
        var inYear = _state$activeCalender.inYear;


        var newState = _defineProperty({}, activeCalender, _extends({}, this.state[activeCalender], {
            inMonth: inMonth === 0 ? 11 : inMonth - 1,
            inYear: inYear - (inMonth === 0 ? 1 : 0)
        }));

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
    handleClickNextMonth: function handleClickNextMonth(index) {
        var activeCalender = index === 'first' ? 'calendar1' : 'calendar2';
        var _state$activeCalender2 = this.state[activeCalender];
        var inMonth = _state$activeCalender2.inMonth;
        var inYear = _state$activeCalender2.inYear;


        var newState = _defineProperty({}, activeCalender, _extends({}, this.state[activeCalender], {
            inMonth: inMonth === 11 ? 0 : inMonth + 1,
            inYear: inMonth === 11 ? inYear + 1 : inYear
        }));

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
    handleChangeTime: function handleChangeTime(index, timeStr) {
        var _this5 = this;

        var newState = {};

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

        this.setState(newState, function () {
            _this5.props.updateValue(_this5.state.beginTime, _this5.state.endTime);
        });
    },
    handleToggleEndTimeLimit: function handleToggleEndTimeLimit() {
        var _this6 = this;

        this.setState({
            noEndTime: !this.state.noEndTime
        }, function () {
            _this6.props.updateValue(_this6.state.beginTime, _this6.state.noEndTime ? INFINITE : _this6.state.endTime);
        });
    }
});

var PickerTrigger = React.createClass({
    displayName: 'PickerTrigger',
    getDefaultProps: function getDefaultProps() {
        var now = new Date();

        var beginTime = Util.getDate(now, 0);
        var endTime = Util.getDate(now, 7);

        return {
            elementType: 'input',
            beginTime: beginTime,
            endTime: endTime,
            onChange: function onChange() {
                return undefined;
            },
            className: ''
        };
    },
    getInitialState: function getInitialState() {
        var _props2 = this.props;
        var beginTime = _props2.beginTime;
        var endTime = _props2.endTime;


        endTime = endTime === 'Infinite' ? INFINITE : endTime;

        return _extends({}, this.validator(beginTime, endTime), {
            showPicker: false,
            leftSide: true
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
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
    render: function render() {
        var _state = this.state;
        var beginTime = _state.beginTime;
        var endTime = _state.endTime;


        var timeString = Util.dateFormat(this.state.beginTime, 'yyyy-MM-dd hh:mm:ss') + ' ~ ' + (endTime === INFINITE ? '∞' : Util.dateFormat(endTime, 'yyyy-MM-dd hh:mm:ss'));

        var elementProps = _extends({}, this.props);
        delete elementProps.beginTime;
        delete elementProps.endTime;
        delete elementProps.onChange;
        delete elementProps.elementType;
        delete elementProps.type;

        var wrapStyle = {
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

        var props = {
            show: this.state.showPicker,
            beginTime: beginTime,
            endTime: endTime,
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
                    onChange: function onChange(e) {
                        return undefined;
                    }
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
    validator: function validator(b, e) {
        var beginTime = b;
        var endTime = e;

        if (beginTime instanceof Date && String(beginTime) !== 'Invalid Date') {
            if (endTime instanceof Date && String(endTime) !== 'Invalid Date') {
                if (beginTime.getTime() < endTime.getTime()) {
                    return {
                        beginTime: beginTime, endTime: endTime
                    };
                }
            } else if (endTime === INFINITE || endTime === 'Infinite') {
                return {
                    beginTime: beginTime,
                    endTime: INFINITE
                };
            }
        }

        return {
            beginTime: new Date(),
            endTime: new Date(Util.getDate(new Date(), 7, 'yyyy-MM-dd hh:mm:ss'))
        };
    },
    handleClickTrigger: function handleClickTrigger() {
        var _refs$trigger$getBoun = this.refs.trigger.getBoundingClientRect();

        var left = _refs$trigger$getBoun.left;
        var width = _refs$trigger$getBoun.width;


        var a = document.body.clientWidth - left - 570;
        var b = left + width - 570;

        this.setState({
            showPicker: true,
            leftSide: b < a
        });
    },
    handleUpdateValue: function handleUpdateValue(beginTime, endTime) {
        this.setState({
            beginTime: beginTime,
            endTime: endTime
        });
    },
    handleClickCancel: function handleClickCancel() {
        this.setState(this.getInitialState());
    },
    handleClickConfirm: function handleClickConfirm() {
        var _this7 = this;

        this.setState({
            showPicker: false
        }, function () {
            _this7.props.onChange(_this7.state.beginTime, _this7.state.endTime === INFINITE ? 'Infinite' : _this7.state.endTime);
        });
    }
});

module.exports = PickerTrigger;