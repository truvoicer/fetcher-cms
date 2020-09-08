import React, {useState} from "react";
import Select from "react-select";
import {fetchData} from "../../../../library/api/middleware";

const SelectField = (props) => {
    const [editing, setEditing] = useState(false);
    const [showSelect, setShowSelect] = useState(false);
    const [showLabel, setShowLabel] = useState(true);
    const [showControls, setShowControls] = useState(false);
    const [selectValue, setSelectValue] = useState([]);
    const [selectOptions, setSelectOptions] = useState([]);

    const selectChangeHandler = (e) => {
        setSelectValue(e)
    }

    const getItemDataById = (id) => {
        let category = selectOptions.find((item) => (item.data.id === id));
        return category.data;
    }

    const getSelectOptions = (data) => {
        return data.map((item, index) => {
            return {
                data: item,
                value: item.id,
                label: item[props.config.fieldConfig.select.labelKey]
            }
        })

    }
    const saveEvent = (row, config, e) => {
        row[config.field] = selectValue.map((item) => {
            return getItemDataById(item.value);
        });
        cancelEvent();
        props.updateCallback(row, config, props.formResponseCallback)
    }

    const cancelEvent = (row, config, e) => {
        setEditing(false);
        setShowSelect(false);
        setShowLabel(true);
        setShowControls(false);
    }

    const selectFieldClick = (row, config, e) => {
        fetchData(props.config.fieldConfig.select.endpoint).then((response) => {
            let selectValue = row[config.field].map((item) => {
                return {
                    value: item[config.fieldConfig.select.valueKey],
                    label: item[config.fieldConfig.select.labelKey],
                }
            })
            setEditing(true);
            setShowSelect(true);
            setShowLabel(false);
            setShowControls(true);
            setSelectValue(selectValue);
            setSelectOptions(getSelectOptions(response.data.data));
        })
    }

        let data = props.data;
        let config = props.config;
        return (
            <div className={"datalist-field datalist-select-field" + (editing? " editing" : "")}>
                {showLabel &&
                <div className={"datalist-select-field--label datalist-field-border" +
                (data[config.field].length === 0? " datalist-select-field--empty" : "")}
                     onClick={selectFieldClick.bind(this, props.data, props.config)}>
                    {data[config.field].map((item, index) => (
                        item.category_label + ((index !== data[config.field].length - 1) ? ", " : "")
                    ))}
                </div>
                }
                {showSelect &&
                <div className={"datalist-select-field--control"}>
                    <Select
                        value={selectValue}
                        onChange={selectChangeHandler}
                        options={selectOptions}
                        isMulti={!!config.fieldConfig.multiple}/>
                </div>
                }
                {showControls &&
                <div className={"datalist-field-controls"}>
                    <a className={"save"} onClick={saveEvent.bind(this, props.data, props.config)}>
                        <i className="fas fa-check"/>
                    </a>
                    <a className={"cancel"} onClick={cancelEvent.bind(this, props.data, props.config)}>
                        <i className="fas fa-times"/>
                    </a>
                </div>
                }
            </div>
        )

}

export default SelectField;