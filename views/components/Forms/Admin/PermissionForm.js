import React, {useEffect, useState} from "react";
import {isNotEmpty} from "../../../../library/utils";
import {fetchRequest, postRequest} from "../../../../library/api/fetcher-api/fetcher-middleware";
import ApiConfig from "../../../../config/api-config";
import DataForm from "../DataForm/DataForm";
import {PermissionFormData} from "../../../../library/forms/permission-form";

const PermissionForm = ({operation, data, formResponse}) => {

    const [permissionData, setPermissionData] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [response, setResponse] = useState({
        show: false,
        variant: "",
        message: ""
    });

    const addButtonLabel = "Save";
    const updateButtonLabel = "Update";

    const getPermissionDataById = (permissionId) => {
        fetchRequest({
            endpoint: ApiConfig.endpoints.permission,
            operation: `${permissionId}`,
            onSuccess: (responseData) => {
                console.log(responseData)
                if (responseData.status === "success") {
                    setPermissionData(responseData.data)
                    setShowForm(true);
                }
            },
            onError: (error) => {
                console.error(error)
            }
        })
    }

    useEffect(() => {
        switch (data?.action) {
            case "create":
                setPermissionData(null);
                setShowForm(true);
                break;
            case "update":
                if (isNotEmpty(data?.itemId)) {
                    getPermissionDataById(data.itemId)
                }
                break;
        }
    }, [data])

    const submitHandler = (values) => {
        console.log(data?.action, values)
        if (data?.action === "update") {
                postRequest({
                endpoint: ApiConfig.endpoints.permission,
                operation: `${data.itemId}/update`,
                requestData: values,
                onSuccess: (responseData) => {
                    setPermissionData(responseData.data)
                    setResponse({
                        show: true,
                        variant: "success",
                        message: responseData.message
                    })
                    formResponse(200, responseData.message, responseData.data)
                },
                onError: (error) => {
                    setResponse({
                        show: true,
                        variant: "success",
                        message: "Error"
                    })
                    formResponse(400, error?.response?.message || "Error", [])
                }
            })
        } else if (data?.action === "create") {
            postRequest({
                endpoint: ApiConfig.endpoints.permission,
                operation: `create`,
                requestData: values,
                onSuccess: (responseData) => {
                    // setOperation("update")
                    setPermissionData(responseData.data)
                    setResponse({
                        show: true,
                        variant: "success",
                        message: responseData.message
                    })
                    formResponse(200, responseData.message, responseData.data)
                },
                onError: (error) => {
                    setResponse({
                        show: true,
                        variant: "danger",
                        message: "Error"
                    })
                    formResponse(400, error?.response?.message || "Error", [])
                }
            })
        } else {
            console.error("Form operation not set")
        }
    }

    return (
        <>
            {/*{operation === "insert" && showForm  &&*/}
            {response.show &&
            <div className={`alert alert-${response.variant}`} role="alert">
                {response.message}
            </div>
            }
            <DataForm
                formType={"single"}
                data={PermissionFormData((operation === "update"), permissionData)}
                submitCallback={submitHandler}
                submitButtonText={(operation === "update") ? updateButtonLabel : addButtonLabel}
            />
            {/*}*/}
        </>
    );
}
export default PermissionForm;