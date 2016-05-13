const { Component } = React;
const Render = ReactDOM.render;

class Main extends Component {
    constructor(props) {
        super(props);

        this.handleChange = (beginTime, endTime) => {
            this.setState({
                begin: beginTime,
                end: endTime
            });
        }

        const now = new Date();

        this.state = {
            begin: now,
            end: 'Infinite'
        }
    }

    render() {
        return (
            <DateTimeRangePicker onChange={this.handleChange} beginTime={this.state.begin} endTime={this.state.end} />
        );
    }
}

const wrap = document.getElementById("main");

Render(<Main />, wrap);