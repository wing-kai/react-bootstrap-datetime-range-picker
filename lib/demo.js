"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _React = React;
var Component = _React.Component;

var Render = ReactDOM.render;

var now2 = new Date();

var Main = function (_Component) {
    _inherits(Main, _Component);

    function Main(props) {
        _classCallCheck(this, Main);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Main).call(this, props));

        _this.handleChange = function (beginTime, endTime) {
            console.log(beginTime, endTime);
            _this.setState({
                begin: beginTime,
                end: endTime
            });
        };

        var now = new Date();

        _this.state = {
            begin: now,
            end: 'Infinite'
        };
        return _this;
    }

    _createClass(Main, [{
        key: "render",
        value: function render() {
            return React.createElement(DateTimeRangePicker, {
                style: { width: 400 },
                onChange: this.handleChange,
                beginTime: this.state.begin,
                endTime: this.state.end
            });
        }
    }]);

    return Main;
}(Component);

var wrap = document.getElementById("main");

Render(React.createElement(Main, null), wrap);