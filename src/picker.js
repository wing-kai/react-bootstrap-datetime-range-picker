const React = require('react');
const ReactDOM = require('react-dom');
const Util = require('./utils');

const TimePicker = require('./timepicker');

const INFINITE = Symbol('∞');

const MONTH = {
    0: "一月",
    1: "二月",
    2: "三月",
    3: "四月",
    4: "五月",
    5: "六月",
    6: "七月",
    7: "八月",
    8: "九月",
    9: "十月",
    10: "十一月",
    11: "十二月"
};

const DateBlock = React.createClass({
    getDefaultProps() {
        return {
            date: new Date(),
            disabled: false,
            month: new Date().getMonth(),
            selecting: false,
            onClick: () => undefined,
            isBeginTime: false,
            isEndTime: false,
        };
    },

    getInitialState() {
        return {};
    },

    render() {
        const showDate = this.props.date.getDate();
        const showDateMonth = this.props.date.getMonth();

        let className = this.props.disabled ? "disabled" : showDateMonth !== this.props.month ? "not-this-month-date" : "";
        className += (this.props.selecting ? " selecting" : "");
        className += (this.props.isBeginTime ? " is-begin-time" : "");
        className += (this.props.isEndTime ? " is-end-time" : "");

        let otherProps = this.props.disabled ? {} : {
            onClick: () => this.props.onClick(this.props.date)
        }

        if (this.props.selecting) {
            otherProps.onMouseHover = this.props.onHover;
        }

        return (
            <td className={className.trim()} {...otherProps}>
                {showDate}
            </td>
        );
    }
});

const Calendar = props => {
    let dateArray = [new Array(7), new Array(7), new Array(7), new Array(7), new Array(7)];
    const firstDate = new Date(props.inYear + '-' + (props.inMonth + 1));
    const firstDateDay = firstDate.getDay();
    let lastDate;

    dateArray = dateArray.map((week, i) => {
        if (i === 0) {
            week[firstDateDay] = firstDate;

            if (week[0] === undefined) {
                for (let f = firstDateDay - 1, x = -1; f >= 0; f--, x--) {
                    week[f] = Util.getDate(firstDate, x);
                }
            }

            for (let f = firstDateDay + 1, x = 1; f < 7; f++, x++) {
                week[f] = Util.getDate(firstDate, x);
            }
        } else {
            week = Array.from(week).map((x, i) => Util.getDate(lastDate, i + 1));
        }

        lastDate = week[6];
        return week;
    });

    const mapDateBlock = (date, i) => {
        const blockTime = date.getTime();

        const isBeginTimeBlock = Util.dateFormat(blockTime) === Util.dateFormat(props.beginTime);
        const isEndTimeBlock   = Util.dateFormat(blockTime) === Util.dateFormat(props.endTime);

        let selecting = false;

        if (!isBeginTimeBlock && !isEndTimeBlock) {
            selecting = blockTime > props.beginTime.getTime() && blockTime < props.endTime.getTime();
        }

        return (
            <DateBlock
                key={i}
                date={date}
                selecting={selecting}
                isBeginTime={isBeginTimeBlock}
                isEndTime={isEndTimeBlock}
                month={props.inMonth}
                onClick={props.onClickDate}
                onHover={props.onHover}
            />
        );
    }

    const mapWeek = (week, i) => (
        <tr key={i}>{week.map(mapDateBlock)}</tr>
    );

    const nextMonthBtnProps = props.inYear === props.maxYear && (props.inMonth === props.maxMonth)
        ? { className: "disabled" }
        : { onClick: props.handleClickNextMonth }

    const previousMonthBtnProps = props.inYear === props.minYear && (props.inMonth === props.minMonth)
        ? { className: "disabled" }
        : { onClick: props.handleClickPreviousMonth }

    return (
        <center>
            <table className='table table-condensed calendar'>
                <thead>
                    <tr>
                        <th {...previousMonthBtnProps}>
                            <i className="fa fa-chevron-left switch-month" />
                        </th>
                        <th colSpan="5">{MONTH[props.inMonth] + '　' + props.inYear}</th>
                        <th {...nextMonthBtnProps}>
                            <i className="fa fa-chevron-right switch-month" />
                        </th>
                    </tr>
                    <tr>
                        <th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th>
                    </tr>
                </thead>
                <tbody>
                    { dateArray.map(mapWeek) }
                </tbody>
            </table>
        </center>
    );
};

const PickerBody = React.createClass({
    getDefaultProps() {
        return {
            show: false,
            position: {
                top: 0,
                left: 0
            },
            beginTime: '∞',
            endTime: '∞'
        };
    },

    getInitialState() {
        const { beginTime, endTime } = this.props;

        const beginTimeFullYear = beginTime.getFullYear();
        const beginTimeMonth = beginTime.getMonth();

        return {
            beginTime: this.props.beginTime,
            endTime: this.props.endTime,
            selecting: false,
            calendar1: {
                inYear: beginTimeFullYear,
                inMonth: beginTimeMonth,
                maxYear: beginTimeFullYear,
                maxMonth: beginTimeMonth
            },
            calendar2: {
                inYear: beginTimeFullYear + (beginTimeMonth === 11 ? 1 : 0),
                inMonth: beginTimeMonth === 11 ? 0 : beginTimeMonth + 1,
                minYear: beginTimeFullYear + (beginTimeMonth === 11 ? 1 : 0),
                minMonth: beginTimeMonth === 11 ? 0 : beginTimeMonth + 1
            }
        };
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
                        <Calendar
                            index="first"
                            beginTime={this.state.beginTime}
                            endTime={this.state.endTime}
                            onClickDate={date => this.handleClickDate('first', date)}
                            selecting={this.state.selecting}
                            onHover={this.handleHoverDate}
                            handleClickPreviousMonth={() => this.handleClickPreviousMonth('first')}
                            handleClickNextMonth={() => this.handleClickNextMonth('first')}
                            {...this.state.calendar1}
                        />
                        <TimePicker />
                    </div>
                    <div className="col-xs-6">
                        <Calendar
                            index="second"
                            beginTime={this.state.beginTime}
                            endTime={this.state.endTime}
                            onClickDate={date => this.handleClickDate('second', date)}
                            selecting={this.state.selecting}
                            onHover={this.handleHoverDate}
                            handleClickPreviousMonth={() => this.handleClickPreviousMonth('second')}
                            handleClickNextMonth={() => this.handleClickNextMonth('second')}
                            {...this.state.calendar2}
                        />
                        <TimePicker />
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-xs-12">
                        <button className="btn btn-default btn-sm">无截止日期</button>
                        <span className="pull-right">
                            <button className="btn btn-default btn-sm">取消</button>
                            {' '}
                            <button className="btn btn-success btn-sm">应用</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    },

    handleClickDate(index, date) {
        const originState = this.state;

        let newState = {
            selecting: !originState.selecting,
            beginTime: originState.selecting ? originState.beginTime : date,
            endTime: originState.selecting ? date : originState.endTime,
        };

        const newBeginTimeFullYear = newState.beginTime.getFullYear();
        const newBeginTimeMonth = newState.beginTime.getMonth();
        const newEndTimeFullYear = newState.endTime.getFullYear();
        const newEndTimeMonth = newState.endTime.getMonth();

        if (index === 'first') {
            newState.calendar2 = {
                ...originState.calendar2,
                minYear: newBeginTimeMonth === 11 ? newBeginTimeFullYear + 1 : newBeginTimeFullYear,
                minMonth: newBeginTimeMonth === 11 ? 0 : newBeginTimeMonth
            };

            if (
                new Date(originState.calendar2.inYear + '-' + (originState.calendar2.inMonth + 1)).getTime() <
                new Date(newState.calendar2.minYear + '-' + (newState.calendar2.minMonth + 1)).getTime()
            ) {
                newState.calendar2.inYear = newState.calendar2.minYear;
                newState.calendar2.inMonth = newState.calendar2.minMonth;
            }
        } else {
            newState.calendar1 = {
                ...originState.calendar1,
                maxYear: newEndTimeMonth === 0 ? (newEndTimeFullYear - 1) : newEndTimeFullYear,
                maxMonth: newEndTimeMonth === 0 ? 11 : newEndTimeMonth - 1,
            };

            if (
                new Date(originState.calendar1.inYear + '-' + (originState.calendar1.inMonth + 1)).getTime() >
                new Date(newState.calendar1.maxYear + '-' + (newState.calendar1.maxMonth + 1)).getTime()
            ) {
                newState.calendar1.inYear = newState.calendar1.maxYear;
                newState.calendar1.inMonth = newState.calendar1.maxMonth;
            }
        }

        this.setState(newState);
    },

    handleHoverDate(date) {
        if (date.getTime() > this.state.beginTime.getTime()) {
            return this.setState({
                endTime: new Date(date)
            });
        }

        return this.setState({
            endTime: this.state.beginTime
        });
    },

    handleClickPreviousMonth(index) {
        const calendar = index === 'first' ? 'calendar1' : 'calendar2';
        const { inMonth, inYear } = this.state[calendar];
        this.setState({
            [calendar]: {
                ...this.state[calendar],
                inMonth: inMonth === 0 ? 11 : inMonth - 1,
                inYear: inMonth === 0 ? inYear - 1 : inYear
            }
        });
    },

    handleClickNextMonth(index) {
        const calendar = index === 'first' ? 'calendar1' : 'calendar2';
        const { inMonth, inYear } = this.state[calendar];
        this.setState({
            [calendar]: {
                ...this.state[calendar],
                inMonth: inMonth === 11 ? 0 : inMonth + 1,
                inYear: inMonth === 11 ? inYear + 1 : inYear
            }
        });
    },
});

const PickerTrigger = React.createClass({
    getDefaultProps() {

        const now = new Date();

        const beginTimeStr = Util.dateFormat(
            Util.getDate(now, 0), 'yyyy-MM-dd hh:mm:ss'
        );

        const endTimeStr = Util.dateFormat(
            Util.getDate(now, 7), 'yyyy-MM-dd hh:mm:ss'
        );

        return {
            elementType: 'input',
            value: beginTimeStr + ' ~ ' +  endTimeStr,
            onChange: () => undefined
        };
    },

    getInitialState() {

        const [ beginTimeStr, endTimeStr ] = this.props.value.match(/\d{4}(\-\d\d){2}\s\d{2}(\:\d\d){2}/g);

        let beginTime = new Date(beginTimeStr);
        let endTime = new Date(endTimeStr);

        if (String(beginTime) === 'Invalid Date' || (String(endTime) === 'Invalid Date')) {
            beginTime = new Date();
            endTime = new Date(Util.getDate(new Date(), 7, 'yyyy-MM-dd hh:mm:ss'));
        }

        return {
            showPicker: true,
            beginTime,
            endTime
        };
    },

    componentWillMount() {
        this.wrap = document.createElement('div');
        document.body.appendChild(this.wrap);
    },

    render() {
        if (this.props.elementType === 'input') {
            return (
                <input
                    ref='trigger'
                    onClick={this.handleClickTrigger}
                    className="input form-control"
                    type="text"
                    defaultValue={this.props.value}
                />
            );
        }

        return (
            <button ref='trigger' onClick={this.handleClickTrigger} className="btn btn-default">{this.props.value}</button>
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
        };
        const { beginTime, endTime } = this.state;

        const props = {
            show: this.state.showPicker,
            position,
            beginTime,
            endTime
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