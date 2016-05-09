# React Bootstrap Date&Time Range Picker [![npm version](https://img.shields.io/npm/v/react-bootstrap-datetimerange-picker.svg?style=flat)](https://www.npmjs.com/package/react-bootstrap-datetimerange-picker)

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
- [ ] Demo Page.
