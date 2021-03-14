import React, {useEffect, useState} from "react";
import {fetchRequest, responseHandler, sendData} from '../../../library/api/fetcher-api/fetcher-middleware'
import ApiConfig from "../../../config/api-config";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm";
import {UserFormData} from "../../../library/forms/user-form";

const sprintf = require("sprintf-js").sprintf;

const UserForm = (props) => {

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
        if (isSet(props.data.action) && props.data.action === "update") {
            fetchRequest({
                endpoint: ApiConfig.endpoints.admin,
                operation: `user/${props.data.itemId}`,
                onSuccess: (responseData) => {
                    setUser(responseData.data);
                    setSelectData({roles: getRoles(responseData.data.roles)});
                    setShowForm(true);
                }
            })
        }
    }, [props.data.itemId, props.data.action])

    const getRoles = (roles) => {
        return roles.map((item, index) => {
            return {
                value: item,
                label: item
            }
        })
    }

    const submitHandler = (values) => {
        if (props.data.action === "update") {
            values.id = props.data.itemId;
        }
        values.roles = values.roles.map((item) => {
            return item.value;
        });
        responseHandler(sendData(props.data.action, "admin/user", values), props.formResponse);
    }

    return (
        <>
            {props.data.action === "update" && showForm &&
            <DataForm
                data={UserFormData(true, user?.username, user?.email)}
                selectData={selectData}
                selectOptions={selectOptions}
                submitCallback={submitHandler}
                submitButtonText={updateUserButtonLabel}
            />
            }
            {props.data.action !== "update" &&
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