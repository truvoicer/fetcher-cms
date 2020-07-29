import React, {Component} from 'react';
import Link from "next/link";
import {getLinkData, isSet} from "../../../../library/utils";
import Button from "react-bootstrap/Button";

class ControlsInlineButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.config.control === "link") {
            let linkData = getLinkData(this.props.config, this.props.data)
            return (
                    <Link href={linkData.href} as={linkData.linkAs}>
                        <a className={this.props.config.classes}>
                            {this.props.config.text}
                        </a>
                    </Link>
            )
        } else if (this.props.config.control === "button") {
            return (
                    <Button
                        variant={this.props.config.classes}
                        size={this.props.config.size}
                        onClick={this.props.callback.bind(this, this.props.config, this.props.data)}
                    >
                        {this.props.config.text}
                    </Button>
            )
        }
        return null;
    }
}

export default ControlsInlineButton;