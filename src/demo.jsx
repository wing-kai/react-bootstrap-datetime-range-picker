const { Component } = React;
const Render = ReactDOM.render;

class Main extends Component {
    render() {
        return (
            <DateTimeRangePicker />
        );
    }
}

const wrap = document.getElementById("main");

Render(<Main />, wrap);