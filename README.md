# React Bootstrap Date&Time Range Picker

日期时间范围选择器，支持无结束时间。

[![npm version](https://img.shields.io/npm/v/react-bootstrap-datetimerange-picker.svg?style=flat)](https://www.npmjs.com/package/react-bootstrap-datetimerange-picker)

[view demo](http://wing-kai.github.io/react-bootstrap-datetime-range-picker/)

# Install

```bash
npm install --save react-bootstrap-datetimerange-picker
```

# Usage
```jsx
import React, { Component } from 'react';
import DateTimeRangePicker from 'react-bootstrap-datetimerange-picker';

class Body extends Component {
    constructor(props) {
        super(props);
        
        this.handleChange = (beginTime, endTime) => {
            // code...
        }
    }

    render() {
        return (
            <DateTimeRangePicker onChange={this.handleChange} />
        );
    }
}
```

# Todo

- [ ] Support custom Language.
- [x] Demo Page.
