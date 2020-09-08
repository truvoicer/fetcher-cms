import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Link from "next/link";
import {getLinkData, isSet} from "../../../../library/utils";

const ControlsDropdownItem = (props) => {
    if (props.config.control === "link") {
        let linkData = getLinkData(props.config, props.data)
        return (
            <Link href={linkData.href} as={linkData.linkAs}>
                <Dropdown.Item href={linkData.href}>
                    {props.config.text}
                </Dropdown.Item>
            </Link>
        )
    } else if (props.config.control === "button") {
        return (
            <Dropdown.Item
                variant={props.config.classes}
                size={props.config.size}
                onClick={props.callback.bind(this, props.config, props.data)}
            >
                {props.config.text}
            </Dropdown.Item>
        )
    }
    return null;
}

export default ControlsDropdownItem;