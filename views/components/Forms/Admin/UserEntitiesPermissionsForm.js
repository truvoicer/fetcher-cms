import React, {useEffect, useState} from "react";
import {isNotEmpty, isObjectEmpty, isSet} from "../../../../library/utils";
import {fetchData, fetchRequest, postRequest} from "../../../../library/api/fetcher-api/fetcher-middleware";
import ApiConfig from "../../../../config/api-config";
import DataForm from "../DataForm/DataForm";
import {UserEntityPermissionsFormData} from "../../../../library/forms/user-entity-permissions-form";
import {Spinner} from "react-bootstrap";

const UserEntitiesPermissionsForm = ({data, config, formResponse}) => {
    const [showForm, setShowForm] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [entityOptions, setEntityOptions] = useState({});
    const [permissionsOptions, setPermissionsOptions] = useState([]);
    const [response, setResponse] = useState({
        show: false,
        variant: "",
        message: ""
    });
    const updateButtonLabel = "Save";

    const entityInit = (entityData) => {
        fetchData(`/permission/${entityData.entity}/list`).then((response) => {
            setEntityOptionsData(entityData, response?.data?.data)
        })
    }

    const setEntityOptionsData = (entityData, listData = null) => {
        if (!Array.isArray(listData)) {
            return
        }
        setEntityOptions(entityOptions => {
            let cloneData = {...entityOptions};
            cloneData[entityData.entity] = listData.map(item => {
                return {
                    value: item.id,
                    label: item[entityData.entity_label_data_key]
                }
            })
            return cloneData;
        })
        setShowForm(true);
    }

    useEffect(() => {
        fetchData(`${ApiConfig.endpoints.permission}/list`).then((response) => {
            setPermissionsOptions(getPermissionsSelect(response.data.data))
        })
    }, [])

    const fetchEntityPermissionData = () => {
        fetchRequest({
            endpoint: ApiConfig.endpoints.permission,
            operation: `user/${config.userId}/entity/${config?.entityData?.entity}/${data.data[config.entityData.entity].id}`,
            onSuccess: (responseData) => {
                setPermissions(getPermissionsSelect(responseData.data.permission))
            }
        })
    }
    useEffect(() => {
        if (!isNotEmpty(config?.entityData?.entity)) {
            console.error("Entity invalid");
            return;
        }
        if (
            isNotEmpty(config?.userId) &&
            isNotEmpty(config?.entityData?.entity)
        ) {
            entityInit(config.entityData)
            switch (config?.operation) {
                case "update":
                    if (isNotEmpty(data.data[config?.entityData?.entity]?.id)) {
                        fetchEntityPermissionData()
                    }
                    break;
            }
        }
    }, [data, config])


    const getPermissionsSelect = (data) => {
        return data.map((item, index) => {
            return {
                value: item.id,
                label: item.label
            }
        })
    }

    const submitHandler = (values) => {
        let id;
        switch (config.operation) {
            case "new":
                id = values[config?.entityData?.entity].value;
                break;
            case "update":
                id = data.data[config?.entityData?.entity].id;
                break;
            default:
                return
        }
        postRequest({
            endpoint: ApiConfig.endpoints.permission,
            operation: `user/${config.userId}/entity/save`,
            requestData: {
                entity: config?.entityData?.entity,
                id: id,
                permissions: values.permissions.map(permission => permission.value),
            },
            onSuccess: (responseData) => {
                if (Array.isArray(responseData?.data?.permission)) {
                    setPermissions(getPermissionsSelect(responseData.data.permission))
                    setResponse({
                        show: true,
                        variant: "success",
                        message: responseData.message
                    })
                    formResponse(200, responseData.message, [])
                } else {
                    setResponse({
                        show: true,
                        variant: "error",
                        message: "Error retrieving permissions"
                    })
                    formResponse(400, "Error retrieving permissions", [])
                }
            },
            onError: (error) => {
                console.error(error)
                setResponse({
                    show: true,
                    variant: "error",
                    message: "Error saving permissions"
                })
                formResponse(400, "Error saving permissions", [])
            }
        })
    }
    const getEntityOptions = (entity) => {
        if (!isNotEmpty(entityOptions[entity])) {
            return [];
        }
        if (!Array.isArray(entityOptions[entity])) {
            return [];
        }
        return entityOptions[entity];
    }
    const getEntityValue = (entityData) => {
        if (!isNotEmpty(entityData?.entity_label_data_key) || !isNotEmpty(entityData?.entity)) {
            return null;
        }
        if (
            !isNotEmpty(data?.data[entityData.entity]?.id) ||
            !isNotEmpty(data?.data[entityData.entity][entityData.entity_label_data_key])
        ) {
            return null;
        }
        return {
            value: data?.data[entityData.entity]?.id,
            label: data?.data[entityData.entity][entityData.entity_label_data_key]
        }
    }
    return (
        <>
            {response.show &&
            <div className={`alert alert-${response.variant}`} role="alert">
                {response.message}
            </div>
            }
            {showForm
                ?
                <>
                    <DataForm
                        formType={"single"}
                        data={UserEntityPermissionsFormData({
                            permissions: permissions,
                            permissionsOptions: permissionsOptions,
                            entity: config.entityData.entity,
                            entityValue: getEntityValue(config.entityData),
                            entityOptions: getEntityOptions(config.entityData.entity)
                        })}
                        submitCallback={submitHandler}
                        submitButtonText={updateButtonLabel}
                    />
                </>
                :
                <Spinner animation={"border"}/>
            }
        </>
    );
}
export default UserEntitiesPermissionsForm;