import React, {Component} from 'react';
import {getColumnControls} from "../../../../library/datalist/datalist-actions";

class ExpandedRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        return (
            <div>
                {getColumnControls(this.props.inlineControls, this.props.dropdownControls, this.props.data, this.props.showModalCallback, true, "inline")}
            </div>
        );
    }
}

export default ExpandedRow;
