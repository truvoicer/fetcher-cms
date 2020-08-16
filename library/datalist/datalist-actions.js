import ControlsInlineButton from "../../views/components/Tables/Components/ControlsInlineButton";
import ControlsDropdown from "../../views/components/Tables/Components/ControlsDropdown";
import React from "react";
import ControlsListItem from "../../views/components/Tables/Components/ControlsListItem";

export const getColumnControls = (dropdownControls = [], inlineControls = [], row, modalCallback, allToggle = false, toggleType) => {
    let controls = [];
    if (!allToggle) {
        inlineControls.map((config, index) => {
            controls.push(
                <ControlsInlineButton key={index}
                                      config={config}
                                      data={row}
                                      callback={modalCallback}/>
            )
        });
        controls.push(
            <ControlsDropdown key={"data_list_dropdown"} title={"Controls"} controls={dropdownControls}
                              data={row} callback={modalCallback}/>
        )
        return controls;
    } else {
        let controlsArray = [...inlineControls];
        dropdownControls.map((item) => {
            controlsArray.push(item);
        });
        if (toggleType === "inline") {
            controlsArray.map((config, index) => {
                controls.push(
                    <ControlsInlineButton key={index}
                                          config={config}
                                          data={row}
                                          callback={modalCallback}/>
                )
            });
            return controls;
        } else if (toggleType === "list") {
            return (
                <ul>
                    {controlsArray.map((config, index) => (
                        <li key={index.toString()}>
                            <ControlsListItem key={index}
                                              config={config}
                                              data={row}
                                              callback={modalCallback}/>
                        </li>
                    ))}
                </ul>
            )
        }
    }
}