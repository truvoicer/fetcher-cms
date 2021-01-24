import React from 'react';
import {isSet} from "../../../../../library/utils";

function FormFieldLabel({errors, field}) {
    const showLabel = () => {
        if (!isSet(field?.showLabel)) {
            return true;
        }
        if (field.showLabel && field.label) {
            return true;
        }
        return false;
    }
    return (
        <>
            {showLabel() &&
            <>
                {field.label}
                <label className="text-black" htmlFor={field.name}>
                <span className={"text-danger site-form--error--field"}>
                {errors[field.name]}
                </span>
                </label>
            </>
            }
        </>
    );
}

export default FormFieldLabel;