import React, {Component} from 'react';

const Switcher = (props) => {

    const switchableUpdate = (row, config, e) => {
        e.preventDefault()
        let dataValue = e.target.getAttribute("data-value");
        if (dataValue === true || dataValue === "true") {
            row[config.field] = false
        } else if (!dataValue || dataValue === "false") {
            row[config.field] = true;
        }
        props.updateCallback(row, config, props.formResponseCallback)
    }

    const value = props.data[props.config.field]
    if (typeof value === "undefined" || !value) {
        return <a className={"switchable-link"}>
            <i className="fas fa-times" data-value={false}
               onClick={switchableUpdate.bind(this, props.data, props.config)}/>
        </a>;
    } else {
        return <a className={"switchable-link"}>
            <i className="fas fa-check" data-value={true}
               onClick={switchableUpdate.bind(this, props.data, props.config)}/>
        </a>;
    }

}

export default Switcher;