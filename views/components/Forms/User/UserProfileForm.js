import React, {useEffect, useState} from "react";
import {isNotEmpty} from "../../../../library/utils";
import {fetchRequest, postRequest} from "../../../../library/api/fetcher-api/fetcher-middleware";
import ApiConfig from "../../../../config/api-config";
import DataForm from "../DataForm/DataForm";
import {UserProfileFormData} from "../../../../library/forms/user-profile-form";

const UserProfileForm = ({operation, user = null, data, config}) => {

    const [userData, setUserData] = useState(null);
    const [formOperation, setFormOperation] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [response, setResponse] = useState({
        show: false,
        variant: "",
        message: ""
    });


    const roles = [
        {
            value: "ROLE_SUPER_ADMIN",
            label: "ROLE_SUPER_ADMIN"
        },
        {
            value: "ROLE_ADMIN",
            label: "ROLE_ADMIN"
        },
        {
            value: "ROLE_USER",
            label: "ROLE_USER"
        },
    ]

    const addButtonLabel = "Save";
    const updateButtonLabel = "Update";

    const getUserDataById = (userId) => {
        fetchRequest({
            endpoint: ApiConfig.endpoints.admin,
            operation: `user/${userId}`,
            onSuccess: (responseData) => {
                console.log(responseData)
                if (responseData.status === "success") {
                    setUserData(responseData.data)
                    setShowForm(true);
                }
            },
            onError: (error) => {
                console.error(error)
            }
        })
    }

    const getUserProfileData = () => {
        fetchRequest({
            endpoint: ApiConfig.endpoints.user,
            operation: "detail",
            onSuccess: (responseData) => {
                if (responseData.status === "success") {
                    setUserData(responseData.data)
                    setShowForm(true);
                }
            },
            onError: (error) => {
                console.error(error)
            }
        })
    }

    useEffect(() => {
        switch (formOperation) {
            case "new_user":
                setUserData(null);
                setShowForm(true);
                break;
            case "update_user":
                if (isNotEmpty(data?.itemId)) {
                    getUserDataById(data.itemId)
                }
                break;
            case "update_user_profile":
                getUserProfileData()
                break;
        }
    }, [formOperation])

    useEffect(() => {
        if (isNotEmpty(config?.operation)) {
            setFormOperation(config.operation)
        } else {
            setFormOperation(operation)
        }
    }, [operation, config])

    const submitHandler = (values) => {
        let requestData = {...values};
        let endpoint;
        let endpointOperation;
        switch (formOperation) {
            case "new_user":
                endpoint = ApiConfig.endpoints.admin;
                endpointOperation = "user/create";
                requestData.roles = values.roles.map(item => item.value);
                break;
            case "update_user":
                endpoint = ApiConfig.endpoints.admin;
                endpointOperation = "user/update";
                requestData.user_id = userData.id;
                requestData.id = userData.id;
                requestData.roles = values.roles.map(item => item.value);
                break;
            case "update_user_profile":
                endpoint = ApiConfig.endpoints.user;
                endpointOperation = "update";
                break;
            default:
                console.error("Form operation not set")
                return;
        }
        postRequest({
            endpoint: endpoint,
            operation: endpointOperation,
            requestData: requestData,
            onSuccess: (responseData) => {
                setUserData(responseData.data)
                setResponse({
                    show: true,
                    variant: "success",
                    message: responseData.message
                })
            },
            onError: (error) => {
                console.log(error.response)
                setResponse({
                    show: true,
                    variant: "danger",
                    message: error?.response?.data?.message || "Error saving user"
                })
            }
        })
    }

    return (
        <>
            {response.show &&
            <div className={`alert alert-${response.variant}`} role="alert">
                {response.message}
            </div>
            }
            <DataForm
                formType={"single"}
                data={UserProfileFormData(formOperation, userData, roles)}
                submitCallback={submitHandler}
                submitButtonText={
                    (formOperation === "update_user" || formOperation === "update_user_profile") ? updateButtonLabel : addButtonLabel
                }
            />
        </>
    );
}
export default UserProfileForm;