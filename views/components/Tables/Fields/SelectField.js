import React, {useState} from "react";
import Select from "react-select";
import {fetchRequest} from "../../../../library/api/fetcher-api/fetcher-middleware";
import {isObject} from "../../../../library/utils";

const SelectField = (props) => {
    const [editing, setEditing] = useState(false);
    const [showSelect, setShowSelect] = useState(false);
    const [showLabel, setShowLabel] = useState(true);
    const [showControls, setShowControls] = useState(false);
    const [selectValue, setSelectValue] = useState([]);
    const [selectOptions, setSelectOptions] = useState([]);

    const selectChangeHandler = (e) => {
        setSelectValue(e ? e : [])
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
        fetchRequest({
            endpoint: props.config.fieldConfig.select.endpoint,
            onSuccess: (responseData) => {
                let selectValue;
                if (Array.isArray(row[config.field])) {
                    selectValue = row[config.field].map((item) => {
                        return {
                            value: item[config.fieldConfig.select.valueKey],
                            label: item[config.fieldConfig.select.labelKey],
                        }
                    })
                } else if (!Array.isArray(row[config.field]) && isObject(row[config.field])) {
                    selectValue = [row[config.field]]
                } else {
                    selectValue = [];
                }
                setEditing(true);
                setShowSelect(true);
                setShowLabel(false);
                setShowControls(true);
                setSelectValue(selectValue);
                setSelectOptions(getSelectOptions(responseData.data));
            }
        })
    }

    let data = props.data;
    let config = props.config;
    let dataConfigField = data[config.field];
    if (!Array.isArray(dataConfigField) && dataConfigField === null) {
        dataConfigField = [];
    } else if (!Array.isArray(dataConfigField) && isObject(dataConfigField)) {
        dataConfigField = [dataConfigField]
    }
    return (
        <div className={"datalist-field datalist-select-field" + (editing ? " editing" : "")}>
            {showLabel &&
            <div className={"datalist-select-field--label datalist-field-border" +
            (dataConfigField.length === 0 ? " datalist-select-field--empty" : "")}
                 onClick={selectFieldClick.bind(this, props.data, props.config)}>
                {dataConfigField.map((item, index) => (
                    item.category_label + ((index !== dataConfigField.length - 1) ? ", " : "")
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