import React from "react";
import Select from "react-select";
import {fetchData} from "../../../../library/api/middleware";

class SelectField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            showSelect: false,
            showLabel: true,
            showControls: false,
            selectValue: [],
            selectOptions: []
        }
        this.selectFieldClick = this.selectFieldClick.bind(this)
        this.selectChangeHandler = this.selectChangeHandler.bind(this)
        this.saveEvent = this.saveEvent.bind(this)
        this.cancelEvent = this.cancelEvent.bind(this)
    }

    selectChangeHandler(e) {
        this.setState({
            selectValue: e,
        })
    }

    getItemDataById(id) {
        let category = this.state.selectOptions.find((item) => (item.data.id === id));
        return category.data;
    }

    getSelectOptions(data) {
        return data.map((item, index) => {
            return {
                data: item,
                value: item.id,
                label: item[this.props.config.fieldConfig.select.labelKey]
            }
        })

    }
    saveEvent(row, config, e) {
        row[config.field] = this.state.selectValue.map((item) => {
            return this.getItemDataById(item.value);
        });
        this.cancelEvent();
        this.props.updateCallback(row, config, this.props.formResponseCallback)
    }

    cancelEvent(row, config, e) {
        this.setState({
            editing: false,
            showSelect: false,
            showLabel: true,
            showControls: false
        })
    }

    selectFieldClick(row, config, e) {
        fetchData(this.props.config.fieldConfig.select.endpoint).then((response) => {
            let selectValue = row[config.field].map((item) => {
                return {
                    value: item[config.fieldConfig.select.valueKey],
                    label: item[config.fieldConfig.select.labelKey],
                }
            })
            let selectOptions = this.getSelectOptions(response.data.data);
            this.setState({
                editing: true,
                showSelect: true,
                showLabel: false,
                showControls: true,
                selectValue: selectValue,
                selectOptions: selectOptions,
            })
        })
    }

    render() {
        let data = this.props.data;
        let config = this.props.config;
        return (
            <div className={"datalist-field datalist-select-field" + (this.state.editing? " editing" : "")}>
                {this.state.showLabel &&
                <div className={"datalist-select-field--label datalist-field-border" +
                (data[config.field].length === 0? " datalist-select-field--empty" : "")}
                     onClick={this.selectFieldClick.bind(this, this.props.data, this.props.config)}>
                    {data[config.field].map((item, index) => (
                        item.category_label + ((index !== data[config.field].length - 1) ? ", " : "")
                    ))}
                </div>
                }
                {this.state.showSelect &&
                <div className={"datalist-select-field--control"}>
                    <Select
                        value={this.state.selectValue}
                        onChange={this.selectChangeHandler}
                        options={this.state.selectOptions}
                        isMulti={!!config.fieldConfig.multiple}/>
                </div>
                }
                {this.state.showControls &&
                <div className={"datalist-field-controls"}>
                    <a className={"save"} onClick={this.saveEvent.bind(this, this.props.data, this.props.config)}>
                        <i className="fas fa-check"/>
                    </a>
                    <a className={"cancel"} onClick={this.cancelEvent.bind(this, this.props.data, this.props.config)}>
                        <i className="fas fa-times"/>
                    </a>
                </div>
                }
            </div>
        )
    }
}

export default SelectField;