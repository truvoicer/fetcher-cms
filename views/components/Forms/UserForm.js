import React, {useEffect, useState} from "react";
import {fetchRequest, postRequest} from '../../../library/api/fetcher-api/fetcher-middleware'
import ApiConfig from "../../../config/api-config";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm";
import {UserFormData} from "../../../library/forms/user-form";

const UserForm = ({data, formResponse}) => {

    const [user, setUser] = useState({});
    const [showForm, setShowForm] = useState(false);

    const [selectData, setSelectData] = useState({
        roles: []
    });

    const [selectOptions, setSelectOptions] = useState({
        roles: [
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
        ],
    });

    const addUserButtonLabel = "Add User";
    const updateUserButtonLabel = "Update User";

    useEffect(() => {
        if (isSet(data.action) && data.action === "update") {
            fetchRequest({
                endpoint: ApiConfig.endpoints.admin,
                operation: `user/${data.itemId}`,
                onSuccess: (responseData) => {
                    setUser(responseData.data);
                    setSelectData({roles: getRoles(responseData.data.roles)});
                    setShowForm(true);
                }
            })
        }
    }, [data.itemId, data.action])

    const getRoles = (roles) => {
        return roles.map((item, index) => {
            return {
                value: item,
                label: item
            }
        })
    }

    const submitHandler = (values) => {
        let requestData = {...values};
        if (data.action === "update") {
            requestData.id = data.itemId;
        }
        requestData.roles = values.roles.map((item) => {
            return item.value;
        });
        postRequest({
            endpoint: `${ApiConfig.endpoints.admin}/user`,
            operation: (data.action === "update")? `${data.itemId}/update` : "create",
            requestData: requestData,
            onSuccess: (responseData) => {
                formResponse(200, responseData.message, responseData.data)
            }
        })
    }

    return (
        <>
            {data.action === "update" && showForm &&
            <DataForm
                data={UserFormData(true, user?.username, user?.email)}
                selectData={selectData}
                selectOptions={selectOptions}
                submitCallback={submitHandler}
                submitButtonText={updateUserButtonLabel}
            />
            }
            {data.action !== "update" &&
            <DataForm
                data={UserFormData()}
                selectData={selectData}
                selectOptions={selectOptions}
                submitCallback={submitHandler}
                submitButtonText={addUserButtonLabel}
            />
            }
        </>
    );
}
export default UserForm;