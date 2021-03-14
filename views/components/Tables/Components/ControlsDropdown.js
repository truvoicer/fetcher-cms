import React from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import ControlsDropdownItem from "./ControlsDropdownItem";

const ControlsDropdown = (props) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {props.title}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {props.controls.map((config, index) => (
                    <ControlsDropdownItem key={index}
                                          config={config}
                                          data={props.data}
                                          callback={props.callback}/>

                ))}
            </Dropdown.Menu>
        </Dropdown>
    );

}

export default ControlsDropdown;