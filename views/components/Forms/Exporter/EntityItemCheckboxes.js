import React from 'react';
import {useFormikContext} from "formik";

const EntityItemCheckboxes = ({entityItem}) => {
    const {values, setFieldValue, handleChange} = useFormikContext();
    return (
        <div>
            {entityItem.data.map((dataItem, dataItemIndex) => {
                return (
                    <div key={dataItemIndex}
                         className={"form-check checkbox" + (dataItemIndex > 0 ? "mt-2" : "")}>
                        <input
                            className="form-check-input"
                            id={`${entityItem.name}Data`}
                            name={`${entityItem.name}Data`}
                            type="checkbox"
                            onChange={handleChange}
                            value={dataItem[entityItem.id]}
                            checked={values[`${entityItem.name}Data`].includes(dataItem[entityItem.id].toString())}
                        />
                        <label
                            className="form-check-label"
                        >
                            {dataItem[entityItem.labelField]}
                        </label>
                    </div>
                )
            })}
                </div>
                );
            };

            export default EntityItemCheckboxes;
