import React, {Component} from 'react';
import {getColumnControls} from "../../../../library/datalist/datalist-actions";

class RowMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        let getList = getColumnControls(
            this.props.inlineControls,
            this.props.dropdownControls,
            this.props.data,
            this.props.showModalCallback,
            true,
            "list");
        console.log(getList)
        return (
            <div className={"row-click-menu fade show popover"}
                 style={this.props.style}>
                <h3 className={"popover-header"}>Menu<a onClick={this.props.closeMenuCallback}><i className="fas fa-times"/></a></h3>
                <div className={"popover-body"}>
                    {getList}
                </div>
            </div>
        );
    }
}

export default RowMenu;
