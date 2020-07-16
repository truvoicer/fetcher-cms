import React from "react";

class TextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldValue: ""
        }
        this.textFieldClick = this.textFieldClick.bind(this)
        this.saveEvent = this.saveEvent.bind(this)
        this.cancelEvent = this.cancelEvent.bind(this)
    }

    saveEvent(row, config, e) {
        let parent = e.target.parentNode.parentNode.parentNode;
        let input = parent.getElementsByClassName("text-field--input")[0];
        row[config.field] = input.value;
        this.props.updateCallback(row, config, this.props.formResponseCallback)
    }

    cancelEvent(row, config, e) {
        this.resetEdits()
        let parent = e.target.parentNode.parentNode.parentNode;
        let input = parent.getElementsByClassName("text-field--input")[0];
        input.value= "";
    }

    resetEdits() {
        let container = document.getElementsByClassName("datalist-text-field");
        let controls = document.getElementsByClassName("datalist-text-field--controls");
        for (let i=0;i<container.length;i++) {
            if (container[i].classList.contains("editing")) {
                container[i].classList.remove("editing");
            }
        }
        for (let i=0;i<controls.length;i++) {
            if (!controls[i].classList.contains("hide")) {
                controls[i].classList.add("hide");
            }
        }
    }

    textFieldClick(row, config, e) {
        this.resetEdits();
        let parent = e.target.parentNode;
        let controls = parent.getElementsByClassName("datalist-text-field--controls")[0];

        if (!parent.classList.contains("editing")) {
            parent.classList.add("editing");
            if (controls.classList.contains("hide")) {
                controls.classList.remove("hide");
            }
        }

        e.target.value = row[config.field];
    }

    render() {
        return (
            <div className={"datalist-text-field"}>
                <input className={"text-field--input"} type={"text"}
                       placeholder={this.props.data[this.props.config.field]}
                       onClick={this.textFieldClick.bind(this, this.props.data, this.props.config)}
                />
                <div className={"datalist-text-field--controls hide"}>
                    <a className={"save"} onClick={this.saveEvent.bind(this, this.props.data, this.props.config)}>
                        <i className="fas fa-check"/>
                    </a>
                    <a className={"cancel"} onClick={this.cancelEvent.bind(this, this.props.data, this.props.config)}>
                        <i className="fas fa-times"/>
                    </a>
                </div>
            </div>
        )
    }
}

export default TextField;