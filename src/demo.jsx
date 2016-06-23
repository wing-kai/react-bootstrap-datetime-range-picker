const { Component } = React;
const Render = ReactDOM.render;

const now2 = new Date();

class Main extends Component {
    constructor(props) {
        super(props);

        this.handleChange = (beginTime, endTime) => {
            console.log(beginTime, endTime)
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
            <DateTimeRangePicker
                style={{width: 400}}
                onChange={this.handleChange}
                beginTime={this.state.begin}
                endTime={this.state.end}
            />
        );
    }
}

const wrap = document.getElementById("main");

Render(<Main />, wrap);