'use strict';

const React = require('react');

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
                        'Minutes:'
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