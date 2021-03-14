import React from 'react';
import {getColumnControls} from "../../../../library/datalist/datalist-actions";

const RowMenu = (props) => {

    let getList = getColumnControls(
        props.inlineControls,
        props.dropdownControls,
        props.data,
        props.showModalCallback,
        true,
        "list");

    return (
        <div className={"row-click-menu fade show popover"}
             style={props.style}>
            <h3 className={"popover-header"}>
                Menu
                <a onClick={props.closeMenuCallback}>
                    <i className="fas fa-times"/>
                </a>
            </h3>
            <div className={"popover-body"}>
                {getList}
            </div>
        </div>
    );
}

export default RowMenu;
