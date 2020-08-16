import React, {Component} from 'react';
import Link from "next/link";
import {getLinkData, isSet} from "../../../../library/utils";
import Button from "react-bootstrap/Button";

class ControlsListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.config.control === "link") {
            let linkData = getLinkData(this.props.config, this.props.data)
            return (
                <Link href={linkData.href} as={linkData.linkAs}>
                    <a>
                        {this.props.config.text}
                    </a>
                </Link>
            )
        } else if (this.props.config.control === "button") {
            return (
                    <a className={this.props.config.classes}
                       onClick={this.props.callback.bind(this, this.props.config, this.props.data)}>
                        {this.props.config.text}
                    </a>
            )
        }
        return null;
    }
}

export default ControlsListItem;