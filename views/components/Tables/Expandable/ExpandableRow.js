import React from 'react';
import {getColumnControls} from "../../../../library/datalist/datalist-actions";
import {isSet} from "../../../../library/utils";

const ExpandableRow = (props) => {
    const getTitle = () => {
        if (!isSet(props.expandedRowData) || !isSet(props.expandedRowData.title)) {
            return null
        }
        return props.expandedRowData.title;
    }

    const getContent = () => {
        if (!isSet(props.expandedRowData) || !isSet(props.expandedRowData.component)) {
            return false
        }
        const Component = props.expandedRowData.component;
        return <Component {...getComponentProps()} />
    }

    const getComponentProps = () => {
        let propsObject = {};
        Object.keys(props.expandedRowData.props).map(key => {
            if (isSet(props.data[props.expandedRowData.props[key]])) {
                propsObject[key] = props.data[props.expandedRowData.props[key]];
            }
        })
        return propsObject;
    }
    const expandedContent = getContent();
    return (
            <div className="card border-success">
                <div className="card-header">
                    <div className="d-flex">
                        {getColumnControls(
                            props.inlineControls,
                            props.dropdownControls,
                            props.data,
                            props.showModalCallback,
                            true,
                            "inline"
                        )}
                    </div>
                </div>
                <div className="card-body">
                    <h4>{props.expandedRowData?.title? props.expandedRowData?.title : ""}</h4>
                    {expandedContent &&
                    <div>
                        {expandedContent}
                    </div>
                    }
                </div>
            </div>
    );
}

export default ExpandableRow;
