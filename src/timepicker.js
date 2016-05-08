const React = require('react');

const TimePicker = React.createClass({
    getDefaultProps() {
        return {};
    },

    getInitialState() {
        return {};
    },

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 time-slider">
                        <div>时间:</div>
                        {'　'}
                        <input type="range" min="0" max="23" step="1" defaultValue="0" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 time-slider">
                        <div>分钟:</div>
                        {'　'}
                        <input type="range" min="0" max="59" step="1" defaultValue="0" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 time-slider">
                        <div>Minutes:</div>
                        {'　'}
                        <input type="range" min="0" max="59" step="1" defaultValue="0" />
                    </div>
                </div>
            </div>
        );
    },

    componentDidMount() {

    }
});

module.exports = TimePicker;