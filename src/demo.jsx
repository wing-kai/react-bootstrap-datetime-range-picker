const { Component } = React;
const Render = ReactDOM.render;

class Main extends Component {
    render() {
        return (
            <DateTimeRangePicker onChange={this.handleChange.bind(this)} />
        );
    }

    handleChange(beginTime, endTime) {
        console.log('handleChange', beginTime, endTime);
    }
}

const wrap = document.getElementById("main");

Render(<Main />, wrap);