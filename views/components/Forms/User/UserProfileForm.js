import React, {useEffect, useState} from "react";
import {isNotEmpty} from "../../../../library/utils";
import {fetchRequest, postRequest} from "../../../../library/api/fetcher-api/fetcher-middleware";
import ApiConfig from "../../../../config/api-config";
import DataForm from "../DataForm/DataForm";
import {UserProfileFormData} from "../../../../library/forms/user-profile-form";

const UserProfileForm = ({operation, user = null}) => {

    const [userData, setUserData] = useState(null);
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
        console.log(ApiConfig.endpoints.admin)
        fetchRequest({
            endpoint: ApiConfig.endpoints.admin,
            operation: "user/profile",
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

    useEffect(() => {
        switch (operation) {
            case "new_user":
                setUserData(null);
                setShowForm(true);
                break;
            case "update_user":
                if (isNotEmpty(user?.id)) {
                    getUserDataById(user.id)
                }
                break;
            case "update_user_profile":
                getUserProfileData()
                break;
        }
    }, [operation, user])

    const submitHandler = (values) => {
        console.log(operation, values)
        values.roles = values.roles.map((item) => {
            return item.value;
        });
        if (operation === "update_user" || operation === "update_user_profile") {
                values.user_id = userData.id;
                values.id = userData.id;
                postRequest({
                endpoint: ApiConfig.endpoints.admin,
                operation: `user/update`,
                requestData: values,
                onSuccess: (responseData) => {
                    setUserData(responseData.data)
                    setResponse({
                        show: true,
                        variant: "success",
                        message: responseData.message
                    })
                },
                onError: (error) => {
                    setResponse({
                        show: true,
                        variant: "success",
                        message: "Error"
                    })
                }
            })
        } else if (operation === "new_user") {
            postRequest({
                endpoint: ApiConfig.endpoints.admin,
                operation: "user/create",
                requestData: values,
                onSuccess: (responseData) => {
                    // setOperation("update")
                    setUserData(responseData.data)
                    setResponse({
                        show: true,
                        variant: "success",
                        message: responseData.message
                    })
                },
                onError: (error) => {
                    setResponse({
                        show: true,
                        variant: "danger",
                        message: "Error"
                    })
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
                data={UserProfileFormData((operation === "update"), userData, roles)}
                submitCallback={submitHandler}
                submitButtonText={(operation === "update") ? updateButtonLabel : addButtonLabel}
            />
            {/*}*/}
        </>
    );
}
export default UserProfileForm;