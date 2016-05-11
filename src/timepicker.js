const React = require('react');

const TimePicker = React.createClass({
    render() {

        const hour = this.props[this.props.index === 'clock1' ? 'beginTime' : 'endTime'].getHours();
        const minute = this.props[this.props.index === 'clock1' ? 'beginTime' : 'endTime'].getMinutes();
        const second = this.props[this.props.index === 'clock1' ? 'beginTime' : 'endTime'].getSeconds();

        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 time-slider">
                        <div>时间:</div>
                        {'　'}
                        <input
                            ref='hour' type="range"
                            min="0" max="23"
                            step="1" value={hour}
                            onChange={this.handleChangeTime}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 time-slider">
                        <div>分钟:</div>
                        {'　'}
                        <input
                            ref='minute' type="range"
                            min="0" max="59"
                            step="1" value={minute}
                            onChange={this.handleChangeTime}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 time-slider">
                        <div>秒钟:</div>
                        {'　'}
                        <input
                            ref='second' type="range"
                            min="0" max="59"
                            step="1" value={second}
                            onChange={this.handleChangeTime}
                        />
                    </div>
                </div>
            </div>
        );
    },

    handleChangeTime() {
        const Refs = this.refs;
        const timeStr = Refs.hour.value + ':' + Refs.minute.value + ':' + Refs.second.value;
        this.props.onChange(this.props.index, timeStr);
    }
});

module.exports = TimePicker;