'use strict';

var React = require('react');

var TimePicker = React.createClass({
    displayName: 'TimePicker',
    render: function render() {

        var hour = this.props[this.props.index === 'clock1' ? 'beginTime' : 'endTime'].getHours();
        var minute = this.props[this.props.index === 'clock1' ? 'beginTime' : 'endTime'].getMinutes();
        var second = this.props[this.props.index === 'clock1' ? 'beginTime' : 'endTime'].getSeconds();

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
    handleChangeTime: function handleChangeTime() {
        var Refs = this.refs;
        var timeStr = Refs.hour.value + ':' + Refs.minute.value + ':' + Refs.second.value;
        this.props.onChange(this.props.index, timeStr);
    }
});

module.exports = TimePicker;