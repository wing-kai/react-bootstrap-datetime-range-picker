# React-Bootstrap-Datetime-Range-Picker

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
        <DateTimeRangePicker onChange={this.handleChange} />
    }
}
```

# Todo

- [ ] Support custom Language.
- [ ] Demo Page.