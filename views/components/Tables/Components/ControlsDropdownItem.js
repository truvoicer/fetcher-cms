import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Link from "next/link";
import {getLinkData, isSet} from "../../../../library/utils";

class ControlsDropdownItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.config.control === "link") {
            let linkData = getLinkData(this.props.config, this.props.data)
            return (
                    <Link href={linkData.href} as={linkData.linkAs}>
                        <Dropdown.Item href={linkData.href}>
                            {this.props.config.text}
                        </Dropdown.Item>
                    </Link>
            )
        } else if (this.props.config.control === "button") {
            return (
                    <Dropdown.Item
                        variant={this.props.config.classes}
                        size={this.props.config.size}
                        onClick={this.props.callback.bind(this, this.props.config, this.props.data)}
                    >
                        {this.props.config.text}
                    </Dropdown.Item>
            )
        }
        return null;
    }
}

export default ControlsDropdownItem;