import React, {Component, useState} from 'react';
import {Field, Formik} from "formik";
import {isSet} from "../../../library/utils";
import Select from "react-select";

const DataForm = (props) => {

    const getInitialDataObject = () => {
        let initialValues = {};
        props.data.fields.map((item) => {
            initialValues[item.name] = isSet(item.value) && item.fieldType === "text" ? item.value : "";
            if (isSet(item.subFields)) {
                item.subFields.map((subItem) => {
                    initialValues[subItem.name] = isSet(subItem.value) && subItem.fieldType === "text" ? subItem.value : "";
                })
            }
        })
        return initialValues;
    }

    const [initialValues, setInitialValues] = useState(getInitialDataObject())

    const validationRules = (rule, values, key) => {
        switch (rule.type) {
            case "required":
                if (!values[key]) {
                    return 'Required';
                }
                break;
            case "email":
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[key])) {
                    return 'Invalid email address';
                }
                break;
            case "alphanumeric":
                if (!/^[\w_ ]+$/.test(values[key])) {
                    return 'Can only contain letters and numbers';
                }
                break;
            case "length":
                if (values[key].length < parseInt(rule.min)) {
                    return sprintf('Must be more than %d characters', rule.min);
                } else if (values[key].length > parseInt(rule.max)) {
                    return sprintf('Must be less than %d characters', rule.max)
                }
                break;
            case "password":
                let conditions = "";
                rule.allowedChars?.map((char) => {
                    if (char === "alphanumeric") {
                        conditions += "[A-Z0-9.-]";
                    }
                    if (char === "symbols") {
                        conditions += "[*.! @#$%^&(){}[]:;<>,.?/~_+-=|\\]";
                    }
                })
                const regEx = new RegExp(sprintf("!/^%s$/i", conditions));
                if (regEx.test(values[key])) {
                    return sprintf("Can only contain (%s)", rule.allowedChars.join(", "));
                }
                break;
            case "match":
                if (values[key] !== values[rule.matchField]) {
                    return sprintf('Does not match with %s', getFieldByName(rule.matchField).label);
                }
                break;
        }
        return true;
    }

    const getFieldByName = (name) => {
        let fieldObject = {};
        props.data.fields.map(field => {
            if (isSet(field.subFields)) {
                field.subFields.map((subField) => {
                    if (subField.name === name) {
                        fieldObject = subField
                    }
                })
            }
            if (field.name === name) {
                fieldObject = field
            }
        })
        return fieldObject
    }
    const getIgnoredFields = (values) => {
        let ignoredFields = [];
        Object.keys(values).map((key) => {
            const field = getFieldByName(key);
            if (field.fieldType === "select") {
                ignoredFields.push(field.name);
            }
            field.subFields?.map((subField) => {
                if ((field.fieldType === "checkbox" && !values[field.name]) ||
                    (field.fieldType === "checkbox" && values[field.name] === "")) {
                    ignoredFields.push(subField.name);
                }
            })
        });
        return ignoredFields;
    }
    const validateForm = (values) => {
        const errors = {};
        const ignoredFields = getIgnoredFields(values);
        console.log(ignoredFields)
        Object.keys(values).map((key) => {
            const field = getFieldByName(key);
            if (!ignoredFields.includes(field.name)) {
                const isAllowEmpty = field.validation?.rules?.filter(rule => rule.type === "allow_empty");
                if (!isSet(isAllowEmpty) ||
                    (Array.isArray(isAllowEmpty) && isAllowEmpty.length > 0 && values[field.name] !== "") ||
                    (Array.isArray(isAllowEmpty) && isAllowEmpty.length === 0)
                ) {
                    field.validation?.rules?.map((rule) => {
                        const validate = validationRules(rule, values, key);
                        // console.log(validate)
                        if (validate !== true) {
                            errors[key] = validate
                        }
                    })
                }
            }
        })
        return errors;
    };

    const formSubmitHandler = (values) => {
        const ignoredFields = getIgnoredFields(values);
        Object.keys(values).map((key) => {
            const field = getFieldByName(key);
            if (field.fieldType === "checkbox" && values[field.name] === "") {
                values[field.name] = false;
            }
            if (ignoredFields.includes(key)) {
                values[key] = "";
            }
        });
        props.submitCallback(values);
    }

    const selectChangeHandler = (e) => {
        console.log(e);
    }

    const getSelectRow = (field, errors, touched, handleBlur, handleChange, values) => {
        let selectData;
        if (!isSet(props.selectData[field.name])) {
            return <p>Select error...</p>
        }
        selectData = props.selectData[field.name];
        return (
            <div className="row form-group form-group-text">
                <div className="col-md-12">
                    {field.label &&
                    <>
                        {field.label}
                        <label className="text-black" htmlFor={field.name}>
                        <span className={"site-form--error--field"}>
                            {errors[field.name] && touched[field.name] && errors[field.name]}
                        </span>
                        </label>
                    </>
                    }
                    <Select
                        isMulti={selectData.multi && selectData.multi}
                        options={selectData.options}
                        value={values[field.name]}
                        onChange={handleChange}
                    />
                </div>
            </div>
        )
    }

    const getInputRow = (field, errors, touched, handleBlur, handleChange, values) => {
        return (
            <div className="row form-group form-group-text">
                <div className="col-md-12">
                    {field.label &&
                    <>
                        {field.label}
                        <label className="text-black" htmlFor={field.name}>
                        <span className={"site-form--error--field"}>
                            {errors[field.name] && touched[field.name] && errors[field.name]}
                        </span>
                        </label>
                    </>
                    }
                    <input
                        id={field.name}
                        type={field.type}
                        name={field.name}
                        className="form-control text-input"
                        placeholder={field.placeHolder}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values[field.name]}
                    />
                </div>
            </div>
        )
    }

    return (
        <Formik
            initialValues={initialValues}
            validate={values => validateForm(values)}
            onSubmit={values => formSubmitHandler(values)}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
              }) => (
                <>
                    <form className="site-form"
                          onSubmit={handleSubmit}>
                        {props.data.fields.map((field, index) => (
                            <React.Fragment key={index}>
                                {field.fieldType === "text" &&
                                getInputRow(field, errors, touched, handleBlur, handleChange, values)
                                }
                                {field.fieldType === "select" &&
                                getSelectRow(field, errors, touched, handleBlur, handleChange, values)
                                }
                                {field.fieldType === "checkbox" &&
                                <div className={"form-check-group"}>
                                    <div className="form-check">
                                        <label>
                                            <Field
                                                className="form-check-input"
                                                type="checkbox"
                                                name={field.name}
                                                // value={field.value}
                                            />
                                            {field.label}
                                        </label>
                                    </div>
                                    {field.subFields && values[field.name] &&
                                    <div className={"form-subfields"}>
                                        {field.subFields.map((subField, subFieldIndex) => (
                                            <React.Fragment key={subFieldIndex}>
                                                {subField.fieldType === "text" &&
                                                getInputRow(subField, errors, touched, handleBlur, handleChange, values)
                                                }
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    }
                                </div>
                                }
                            </React.Fragment>
                        ))}

                        <div className="row form-group">
                            <div className="col-md-12">
                                <input type="submit"
                                       value={props.submitButtonText}
                                       className="btn btn-primary py-2 px-4 text-white"/>
                            </div>
                        </div>

                        {props.children}

                    </form>
                </>
            )}
        </Formik>
    );
}
export default DataForm;
