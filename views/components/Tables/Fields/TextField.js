import React, {useState} from "react";

const TextField = (props) => {

    const [editing, setEditing] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [fieldValue, setFieldValue] = useState("");

    const textFieldChangeEvent = (e) => {
        setFieldValue(e.target.value);
    }

    const saveEvent = (row, config, e) => {
        row[config.field] = fieldValue;
        cancelEvent();
        props.updateCallback(row, config, props.formResponseCallback)
    }

    const cancelEvent = (row, config, e) => {
        setEditing(false);
        setShowControls(false);
    }

    const textFieldClick = (row, config, e) => {
        setEditing(true);
        setShowControls(true);
        setFieldValue(row[config.field]);
    }

        return (
            <div className={"datalist-field datalist-text-field" + (editing? " editing" : "")}>

                <input className={"text-field--input datalist-field-border"} type={"text"}
                       placeholder={props.data[props.config.field]}
                       value={fieldValue}
                       onChange={textFieldChangeEvent}
                       onClick={textFieldClick.bind(this, props.data, props.config)}
                />
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

export default TextField;