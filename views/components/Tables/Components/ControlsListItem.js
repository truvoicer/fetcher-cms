import React, {Component} from 'react';
import Link from "next/link";
import {getLinkData, isSet} from "../../../../library/utils";

const ControlsListItem = (props) => {
    if (props.config.control === "link") {
        let linkData = getLinkData(props.config, props.data)
        return (
            <Link href={linkData.href} as={linkData.linkAs}>
                <a>
                    {props.config.text}
                </a>
            </Link>
        )
    } else if (props.config.control === "button") {
        return (
            <a className={props.config.classes}
               onClick={props.callback.bind(this, props.config, props.data)}>
                {props.config.text}
            </a>
        )
    }
    return null;
}

export default ControlsListItem;