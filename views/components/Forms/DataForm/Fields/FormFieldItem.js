import React from 'react';
import DatePicker from "react-datepicker";
import {Field} from "formik";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import {isNotEmpty, isSet} from "../../../../../library/utils";
import {useFormikContext} from 'formik';
import ImageUploadField from "./FileUpload/ImageUploadField";
import FileUploadField from "./FileUpload/FileUploadField";
import moment from 'moment';
import TelephoneField from "./Telephone/TelephoneField";

function FormFieldItem({
                           formId, field, handleChange, handleBlur,
                           checkboxOptions, radioOptions, arrayFieldIndex = false
                       }) {
    const {values, setFieldValue} = useFormikContext();

    const getFieldName = () => {
        if (arrayFieldIndex === false) {
            return field.name;
        }
        return `${formId}[${arrayFieldIndex}].${field.name}`;
    }

    const getFieldValue = (fieldName) => {
        if (arrayFieldIndex === false) {
            return values[fieldName];
        }
        return values[formId][arrayFieldIndex][fieldName];
    }


    const getListFieldValue = (name, value) => {
        return values[formId].map((item, itemIndex) => {
            if (itemIndex === arrayFieldIndex) {
                item[name] = value;
            }
            return item;
        })
    }

    const setFormFieldValue = (name, value, index) => {
        if (index === false) {
            setFieldValue(name, value);
            return;
        }
        setFieldValue(formId, getListFieldValue(name, value));
    }

    const dateChangeHandler = (key, date, e) => {
        setFormFieldValue(key, date, arrayFieldIndex)
    }

    const selectChangeHandler = (name, e) => {
        setFormFieldValue(name, e, arrayFieldIndex)
    }

    const fileUploadCallback = (name, file, index) => {
        setFormFieldValue(name, file, index)
    }

    const imageUploadCallback = (name, imageData, index) => {
        setFormFieldValue(name, imageData, index)
    }

    const getChoiceField = (name, label, value = null, type) => {
        let containerClass = "";
        let fieldProps = {
            type: type,
            name: name
        }
        if (type === "checkbox") {
            fieldProps.className = "form-check-input";
            containerClass = "form-check";
        } else if (type === "radio") {
            fieldProps.className = "form-radio-input";
            containerClass = "form-radio";
        }
        if (value !== null) {
            fieldProps.value = getFieldValue(field.name);
        }
        return (
            <div className={containerClass}>
                <label>
                    <Field
                        onChange={handleChange}
                        {...fieldProps}
                    />
                    {label}
                </label>
            </div>
        );
    }

    const getChoiceFieldList = (type, choiceFieldOptions, field) => {
        return (
            <>
                {choiceFieldOptions && choiceFieldOptions.map((item, index) => (
                    <React.Fragment key={index}>
                        {getChoiceField(getFieldName(), item.label, item.value, type)}
                    </React.Fragment>
                ))}
            </>
        )
    }

    const getTextField = () => {
        let extraProps = {};
        if (isNotEmpty(field?.min) && !isNaN(field.min)) {
            extraProps.min = field.min;
        }
        if (isNotEmpty(field?.max) && !isNaN(field.max)) {
            extraProps.max = field.max;
        }
        return (
            <input
                id={field.name}
                type={field.type}
                name={getFieldName()}
                className="form-control text-input"
                placeholder={field.placeHolder}
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={getFieldValue(field.name)}
                {...extraProps}
            />
        )
    }
    const getTextAreaField = () => {
        return (
            <textarea
                rows={field.rows ? field.rows : 4}
                id={field.name}
                name={getFieldName()}
                className="form-control text-input"
                placeholder={field.placeHolder}
                onChange={handleChange}
                onBlur={handleBlur}
                value={getFieldValue(field.name)}
            />
        )
    }
    const getSelectField = () => {
        // console.log(values)
        if (!isSet(field?.options)) {
            return <p>Select error...</p>
        }
        if (field.fieldType === "select_data_source") {
            const selectedOptions = getFieldValue(field.name);
            return (
                <>
                    {Array.isArray(selectedOptions) &&
                    <CreatableSelect
                        isMulti={field.multi && field.multi}
                        options={field.options}
                        value={selectedOptions}
                        onChange={selectChangeHandler.bind(this, field.name)}
                    />
                    }
                </>
            )
        }
        return (
            <Select
                isMulti={field.multi && field.multi}
                options={field.options}
                value={getFieldValue(field.name)}
                onChange={selectChangeHandler.bind(this, field.name)}
            />
        )
    }
    const getDateField = () => {
        const extraProps = {};
        const dateString = getFieldValue(field.name);
        if (isNotEmpty(dateString)) {
            extraProps.selected = moment(dateString).toDate();
        }
        return (
            <DatePicker
                id={field.name}
                name={getFieldName()}
                dateFormat={field.format}
                className={"filter-datepicker"}
                onChange={dateChangeHandler.bind(this, field.name)}
                {...extraProps}
            />
        )
    }
    const getCheckboxField = () => {
        let options;
        if (isSet(checkboxOptions) && isSet(checkboxOptions[field.name])) {
            options = checkboxOptions[field.name];
        }
        if (isSet(field.checkboxType) && field.checkboxType === "true_false") {
            return getChoiceField(field.name, field.label, null, "checkbox");
        } else if (Array.isArray(options)) {
            return getChoiceFieldList("checkbox", options, field);
        }
        return null;
    }
    const getRadioField = () => {
        let options;
        if (isSet(radioOptions) && isSet(radioOptions[field.name])) {
            options = radioOptions[field.name];
        }
        if (Array.isArray(options)) {
            return getChoiceFieldList("radio", options, field);
        }
        return null;
    }

    const buildFormField = ({fieldType, name}) => {
        switch (fieldType) {
            case "text":
                return getTextField();
            case "textarea":
                return getTextAreaField();
            case "select":
            case "select_data_source":
                return getSelectField();
            case "date":
                return getDateField();
            case "checkbox":
                return getCheckboxField();
            case "radio":
                return getRadioField();
            case "tel":
                return (
                    <TelephoneField
                        name={name}
                        callback={setFormFieldValue}
                        arrayFieldIndex={arrayFieldIndex}
                        value={getFieldValue(field.name)}
                        placeholder={field.placeHolder}
                    />
                )
            case "file_upload":
                return (
                    <FileUploadField
                        name={name}
                        description={field?.description}
                        showDropzone={field?.showDropzone}
                        dropzoneMessage={field?.dropzoneMessage}
                        acceptedFilesMessage={field?.acceptedFileTypesMessage}
                        callback={fileUploadCallback}
                        arrayFieldIndex={arrayFieldIndex}
                        allowedFileTypes={field.allowedFileTypes}
                        value={getFieldValue(field.name)}
                    />
                );
            case "image_upload":
                return (
                    <ImageUploadField
                        name={name}
                        description={field?.description}
                        showDropzone={field?.showDropzone}
                        dropzoneMessage={field?.dropzoneMessage}
                        acceptedFilesMessage={field?.acceptedFileTypesMessage}
                        callback={imageUploadCallback}
                        arrayFieldIndex={arrayFieldIndex}
                        value={getFieldValue(field.name)}
                    />
                );
            default:
                return null;
        }
    }

    return buildFormField(field);
}

export default FormFieldItem;