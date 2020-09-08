import React from 'react';
import {getColumnControls} from "../../../../library/datalist/datalist-actions";

const ExpandedRow = (props) => {
    // console.log(props)
    return (
        <div>
            {getColumnControls(
                props.inlineControls,
                props.dropdownControls,
                props.data,
                props.showModalCallback,
                true,
                "inline"
            )}
        </div>
    );
}

export default ExpandedRow;
