import React, {useEffect, useState} from "react";
import {sendData, fetchData, responseHandler} from '../../../library/api/middleware'
import ApiConfig from "../../../config/api-config";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm";
import {UserFormData} from "../../../library/forms/user-form";

const sprintf = require("sprintf-js").sprintf;

const UserForm = (props) => {

    const [user, setUser] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [formError, setFormError] = useState({
        showError: false,
        message: ""
    });

    const [selectData, setSelectData] = useState({
        roles: {
            select_name: "roles",
            options: [
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
            selected: []
        }
    });

    const addUserButtonLabel = "Add User";
    const updateUserButtonLabel = "Update User";

    useEffect(() => {
        if (isSet(props.data.action) && props.data.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.getUser, props.data.itemId)).then((response) => {
                setUser(response.data.data);
                setSelectedRoles(getRoles(response.data.data.roles));
                setShowForm(true);
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

    const selectChangeHandler = (e) => {
        setSelectedRoles(e);
    }

    const submitHandler = (values) => {
        console.log(values)
        e.preventDefault();
        // let selectedRoles = this.state.selectedRoles.map((item) => {
        //     return item.value;
        // })
        // userData.roles = JSON.stringify(selectedRoles);
        // values.id = props.data.itemId;
        // responseHandler(sendData(props.data.action, "admin/user", values), props.formResponse);
    }

    return (
        <>
            {props.data.action === "update" && showForm &&
            <DataForm
                data={UserFormData(user?.username, user?.email, true)}
                selectData={selectData}
                submitCallback={submitHandler}
                submitButtonText={updateUserButtonLabel}
            />
            }
            {props.data.action !== "update" &&
            <DataForm
                data={UserFormData()}
                selectData={selectData}
                submitCallback={submitHandler}
                submitButtonText={addUserButtonLabel}
            />
            }
        </>
    );
}
export default UserForm;