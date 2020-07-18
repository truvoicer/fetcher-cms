import React from "react";

class TextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            showControls: false,
            fieldValue: ""
        }
        this.textFieldClick = this.textFieldClick.bind(this)
        this.textFieldChangeEvent = this.textFieldChangeEvent.bind(this)
        this.saveEvent = this.saveEvent.bind(this)
        this.cancelEvent = this.cancelEvent.bind(this)
    }

    textFieldChangeEvent(e) {
        this.setState({
            fieldValue: e.target.value
        })
    }

    saveEvent(row, config, e) {
        row[config.field] = this.state.fieldValue;
        this.cancelEvent();
        this.props.updateCallback(row, config, this.props.formResponseCallback)
    }

    cancelEvent(row, config, e) {
        this.setState({
            editing: false,
            showControls: false,
        })
    }

    textFieldClick(row, config, e) {
        this.setState({
            editing: true,
            showControls: true,
            fieldValue: row[config.field]
        })
    }

    render() {
        return (
            <div className={"datalist-field datalist-text-field" + (this.state.editing? " editing" : "")}>

                <input className={"text-field--input datalist-field-border"} type={"text"}
                       placeholder={this.props.data[this.props.config.field]}
                       value={this.state.fieldValue}
                       onChange={this.textFieldChangeEvent}
                       onClick={this.textFieldClick.bind(this, this.props.data, this.props.config)}
                />
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

export default TextField;