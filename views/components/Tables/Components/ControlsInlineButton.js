import React from 'react';
import Link from "next/link";
import {getLinkData} from "../../../../library/utils";
import Button from "react-bootstrap/Button";

const ControlsInlineButton = (props) => {
    if (props.config.control === "link") {
        let linkData = getLinkData(props.config, props.data)
        return (
            <Link href={linkData.href} as={linkData.linkAs}>
                <a className={props.config.classes}>
                    {props.config.text}
                </a>
            </Link>
        )
    } else if (props.config.control === "button") {
        let clickHandler = props.callback.bind(this, props.config, props.data);
        if (typeof props.config.action === "function") {
            clickHandler = props.config.action;
        }
        return (
            <Button
                variant={props.config.classes}
                size={props.config.size}
                onClick={clickHandler.bind(this, props.data)}
            >
                {props.config.text}
            </Button>
        )
    }
    return null;

}

export default ControlsInlineButton;