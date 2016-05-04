const React = require('react');
const ReactDOM = require('react-dom');

const Calendar = React.createClass({
    getDefaultProps() {
        return {};
    },

    getInitialState() {
        return {};
    },

    render() {
        return (
            <center>
                <table className='table table-condensed calendar'>
                    <thead>
                        <tr>
                            <th><i className="fa fa-chevron-left switch-month"></i></th>
                            <th colSpan="5">五月 2016</th>
                            <th><i className="fa fa-chevron-right switch-month"></i></th>
                        </tr>
                        <tr>
                            <th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>29</td><td>30</td><td>31</td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
                        <tr><td>29</td><td>30</td><td>31</td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
                        <tr><td>29</td><td>30</td><td>31</td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
                        <tr><td>29</td><td>30</td><td>31</td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
                        <tr><td>29</td><td>30</td><td>31</td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
                    </tbody>
                </table>
            </center>
        );
    },

    componentDidMount() {

    }
});

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

const PickerBody = React.createClass({
    getDefaultProps() {
        return {};
    },

    getInitialState() {
        return {};
    },

    render() {
        const thisProps = this.props;
        const style = {
            top: thisProps.position.top,
            left: thisProps.position.left,
            display: thisProps.show ? 'block' : 'none',
            width: 560,
            padding: 10
        };

        return (
            <div className="dropdown-menu datetime-range-picker" style={style}>
                <div className="row">
                    <div className="col-xs-6">
                        <Calendar />
                        <TimePicker />
                    </div>
                    <div className="col-xs-6">
                        <Calendar />
                        <TimePicker />
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-xs-12">
                        <button className="btn btn-success btn-sm">应用</button>
                        {' '}
                        <button className="btn btn-default btn-sm">取消</button>
                    </div>
                </div>
            </div>
        );
    },

    componentDidMount() {

    }
});

const PickerTrigger = React.createClass({
    getDefaultProps() {
        return {
            elementType: 'input'
        };
    },

    getInitialState() {
        return {
            showPicker: true
        };
    },

    componentWillMount() {
        this.wrap = document.createElement('div');
        document.body.appendChild(this.wrap);
    },

    render() {
        if (this.props.elementType === 'input') {
            return (<input ref='trigger' onClick={this.handleClickTrigger} className="input form-control" type="text" />)
        }

        return (
            <button ref='trigger' onClick={this.handleClickTrigger} className="btn btn-default">blabla</button>
        );
    },

    componentDidMount() {
        this.renderBody();
    },

    componentDidUpdate() {
        this.renderBody();
    },

    renderBody() {
        const targetBCR = this.refs.trigger.getBoundingClientRect();
        const position = {
            top: targetBCR.top + targetBCR.height,
            left: targetBCR.left
        }

        const props = {
            show: this.state.showPicker,
            position
        };

        ReactDOM.render(<PickerBody {...props} />, this.wrap);
    },

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.wrap);
        document.body.removeChild(this.wrap);
    },

    handleClickTrigger() {
        this.setState({
            showPicker: !this.state.showPicker
        });
    }
});

// do not use 'export default Picker'
module.exports = PickerTrigger;