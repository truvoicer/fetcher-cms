import ApiConfig from '../../../config/api-config'
import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import React, {useEffect, useState} from "react";
import {isSet, uCaseFirst} from "../../../library/utils";
import DataForm from "./DataForm";
import {ServiceRequestConfigFormData} from "../../../library/forms/service-request-config-form";
import {ServiceRequestResponseKeysFormData} from "../../../library/forms/service-request-response-keys-form";

const sprintf = require("sprintf-js").sprintf;

const RequestResponseKeysForm = (props) => {

    const addButtonLabel = "Add Request Config";
    const updateButtonLabel = "Update Request Config";

    const [selectData, setSelectData] = useState({
        return_data_type: {
            value: "text",
            label: "Text"
        }
    });

    const [selectOptions, setSelectOptions] = useState({
        return_data_type: [
            {
                value: "text",
                label: "Text"
            },
            {
                value: "object",
                label: "Object"
            },
            {
                value: "array",
                label: "Array"
            },
        ],
    });

    const [requestResponseKey, setRequestResponseKey] = useState({});
    const [listData, setListData] = useState({
        array_keys: []
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (isSet(props.data.action) && props.data.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.requestResponseKey, props.config.service_request_id, props.data.itemId))
            .then((response) => {
                setRequestResponseKey(response.data.data);
                const returnDataType = getReturnDataType(response.data.data.return_data_type);
                if (returnDataType !== null) {
                    setSelectData({
                        return_data_type: returnDataType
                    })
                }
                setListData({
                    array_keys: response.data.data.array_keys
                });
                setShowForm(true);
            })

        }
    }, [props.data.itemId, props.data.action])

    const getReturnDataType = (data) => {
        if (isSet(data) && data !== "" && data !== null && data !== false) {
            return {
                value: data,
                label: uCaseFirst(data)
            }
        }
        return null;
    }

    const submitHandler = (values) => {
        if (props.data.action === "update") {
            values.id = props.data.itemId;
        }
        values.service_request_id = props.config.service_request_id;
        values.return_data_type = values.return_data_type.value;
        responseHandler(sendData(props.data.action, "service/request/response/key", values), props.formResponse);
    }

    return (
        <>
            {props.data.action === "update" && showForm &&
            <DataForm
                data={
                    ServiceRequestResponseKeysFormData(
                        true,
                        requestResponseKey.key_name,
                        requestResponseKey.key_value,
                        requestResponseKey.show_in_response,
                        requestResponseKey.list_item,
                        requestResponseKey.has_array_value,
                    )
                }
                selectData={selectData}
                selectOptions={selectOptions}
                listData={listData}
                submitCallback={submitHandler}
                submitButtonText={updateButtonLabel}
            />
            }
            {props.data.action !== "update" &&
            <DataForm
                data={ServiceRequestResponseKeysFormData()}
                selectData={selectData}
                selectOptions={selectOptions}
                listData={listData}
                submitCallback={submitHandler}
                submitButtonText={addButtonLabel}
            />
            }
        </>
    );
    // render() {
    //     return (
    //         <Form onSubmit={this.formSubmitHandler}>
    //             <Form.Group>
    //                 <Form.Label>{this.state.key_name}</Form.Label>
    //                 <Form.Control
    //                     name={"key_value"}
    //                     value={this.state.key_value}
    //                     onChange={this.formChangeHandler}/>
    //             </Form.Group>
    //                 <Form.Group controlId="formShowInResponseCheckbox">
    //                     <Form.Check
    //                         checked={this.state.show_in_response ? "checked" : ""}
    //                         type={"checkbox"}
    //                         id={"show_in_response"}
    //                         label={"Show in Response?"}
    //                         name="show_in_response"
    //                         onChange={this.formChangeHandler}
    //                     />
    //                 </Form.Group>
    //                 <Form.Group controlId="formListItemCheckbox">
    //                     <Form.Check
    //                         checked={this.state.list_item ? "checked" : ""}
    //                         type={"checkbox"}
    //                         id={"list_item"}
    //                         label={"List Item?"}
    //                         name="list_item"
    //                         onChange={this.formChangeHandler}
    //                     />
    //                 </Form.Group>
    //                 <Form.Group controlId="formHasArrayValueCheckbox">
    //                     <Form.Check
    //                         checked={this.state.has_array_value ? "checked" : ""}
    //                         type={"checkbox"}
    //                         id={"has_array_value"}
    //                         label={"Has Array Value?"}
    //                         name="has_array_value"
    //                         onChange={this.formChangeHandler}
    //                     />
    //                 </Form.Group>
    //                 {this.state.has_array_value &&
    //                 <>
    //                     <Form.Group>
    //                         <Form.Label>Return Data Type</Form.Label>
    //                         <Select
    //                             value={this.state.return_data_type_select}
    //                             options={this.state.return_data_type_options}
    //                             onChange={this.formSelectHandler}
    //                         />
    //                     </Form.Group>
    //                     <FormList callback={this.formListCallback} data={this.state.array_keys}/>
    //                 </>
    //                 }
    //                 <Button variant="primary" type="submit">
    //                     Update
    //                 </Button>
    //         </Form>
    // )
    // }
}

    export default RequestResponseKeysForm;