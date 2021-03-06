import {isNotEmpty, uCaseFirst} from "../utils";

export const UserEntityPermissionsFormData = ({
                                                  permissions = null,
                                                  permissionsOptions = [],
                                                  entity = null,
                                                    entityValue = null,
                                                  entityOptions = [],
                                              }) => {
    return {
        fields: [
            {
                rowIndex: 0,
                columnIndex: 0,
                name: entity,
                description: "",
                label: uCaseFirst(entity),
                labelPosition: "",
                placeHolder: "",
                fieldType: "select",
                multi: false,
                options: entityOptions,
                data: [],
                value: isNotEmpty(entityValue) ? entityValue : {},
            },            {
                rowIndex: 1,
                columnIndex: 0,
                name: "permissions",
                description: "",
                label: "Permissions",
                labelPosition: "",
                placeHolder: "",
                fieldType: "select",
                multi: true,
                options: permissionsOptions,
                data: [],
                value: Array.isArray(permissions) ? permissions : [],
            },
        ]
    }
}