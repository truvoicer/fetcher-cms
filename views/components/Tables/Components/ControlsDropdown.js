import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ControlsDropdownItem from "./ControlsDropdownItem";

class ControlsDropdown extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {this.props.title}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                {this.props.controls.map((config, index) => (
                        <ControlsDropdownItem key={index}
                                              config={config}
                                              data={this.props.data}
                                              callback={this.props.callback} />

                ))}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

export default ControlsDropdown;