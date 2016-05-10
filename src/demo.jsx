const { Component } = React;
const Render = ReactDOM.render;

class Main extends Component {
    constructor(props) {
        super(props);

        this.handleChange = (beginTime, endTime) => {
            console.log('handleChange', beginTime, endTime);
        }
    }

    render() {
        return (
            <DateTimeRangePicker onChange={this.handleChange} />
        );
    }
}

const wrap = document.getElementById("main");

Render(<Main />, wrap);