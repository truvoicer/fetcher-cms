import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Switcher extends Component {
    constructor(props) {
        super(props);
        this.switchableUpdate = this.switchableUpdate.bind(this)
    }

    switchableUpdate(row, config, e) {
        e.preventDefault()
        let dataValue = e.target.getAttribute("data-value");
        if (dataValue === true || dataValue === "true") {
            row[config.field] = false
        } else if (!dataValue || dataValue === "false") {
            row[config.field] = true;
        }
        this.props.updateCallback(row, config, this.props.formResponseCallback)
    }

    render() {
        let value = this.props.data[this.props.config.field]
        if (typeof value === "undefined" || !value) {
            return <a className={"switchable-link"}>
                <i className="fas fa-times" data-value={false}
                   onClick={this.switchableUpdate.bind(this, this.props.data, this.props.config)}/>
            </a>;
        } else {
            return <a className={"switchable-link"}>
                <i className="fas fa-check" data-value={true}
                   onClick={this.switchableUpdate.bind(this, this.props.data, this.props.config)}/>
            </a>;
        }
    }
}

export default Switcher;