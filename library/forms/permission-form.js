import {isNotEmpty} from "../utils";

export const PermissionFormData = (
    update = false,
    permission = null,
) => {
    return {
        fields: [
            {
                rowIndex: 0,
                columnIndex: 0,
                name: "name",
                description: "",
                label: "Name",
                labelPosition: "",
                placeHolder: "Enter a permission name",
                fieldType: "text",
                type: "text",
                value: !isNotEmpty(permission?.name)? "" : permission.name,
            },
        ]
    }
}