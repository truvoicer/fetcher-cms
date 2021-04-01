import {isNotEmpty} from "../utils";
import {userRolesOptions} from "../../config/user-roles";

export const UserProfileFormData = (
    operation = false,
    user = null,
) => {

    const passwordField = () => {
        return {
            // dependsOn: {
            //     field: "change_password",
            //     value: true
            // },
            name: "new_password",
            label: "New Password",
            type: "password",
            fieldType: "text",
            placeHolder: "",
            validation: {
                rules: [
                    {
                        type: "password",
                        allowedChars: ["alphanumeric", "symbols"]
                    },
                    {
                        type: "length",
                        min: 5,
                        max: 16
                    }
                ]
            }
        }
    }
    const confirmPasswordField = () => {
        return {
            // dependsOn: {
            //     field: "change_password",
            //     value: true
            // },
            name: "confirm_password",
            label: "Confirm password",
            type: "password",
            fieldType: "text",
            placeHolder: "",
            validation: {
                rules: [
                    {
                        type: "match",
                        matchField: "new_password",
                    },
                ]
            }
        }
    }
    const rolesField = (userRoles, userRolesOptions) => {
        return {
            rowIndex: 2,
            columnIndex: 0,
            name: "roles",
            label: "Roles",
            fieldType: "select",
            multi: true,
            options: userRolesOptions,
            value: userRoles,
        }
    }

    let userRoles = [];
    if (isNotEmpty(user?.roles)) {
        userRoles = user.roles.map((item, index) => {
            return {
                value: item,
                label: item
            }
        })
    }

    let extraFields = [];
    switch (operation) {
        case "new_user":
            extraFields.push(rolesField(userRoles, userRolesOptions))
            extraFields.push(passwordField())
            extraFields.push(confirmPasswordField())
            break;
        case "update_user":
        case "update_user_profile":
            extraFields.push({
                rowIndex: 3,
                columnIndex: 0,
                label: "Change Password?",
                name: "change_password",
                description: "",
                showLabel: false,
                labelPosition: "",
                placeHolder: "",
                fieldType: "checkbox",
                checkboxType: "true_false",
                value: false,
                options: [],
                subFields: [
                    passwordField(),
                    confirmPasswordField()
                ]
            })
            if (operation === "update_user") {
                extraFields.push(rolesField(userRoles, userRolesOptions))
            }
            break;
    }
    return {
        fields: [
            {
                rowIndex: 0,
                columnIndex: 0,
                name: "username",
                description: "",
                label: "Username",
                labelPosition: "",
                placeHolder: "Enter a username",
                fieldType: "text",
                type: "text",
                value: !isNotEmpty(user?.username) ? "" : user.username,
            },
            {
                rowIndex: 1,
                columnIndex: 0,
                name: "email",
                description: "",
                label: "Email",
                labelPosition: "",
                placeHolder: "Enter a email",
                fieldType: "text",
                type: "email",
                value: !isNotEmpty(user?.email) ? "" : user.email,
            },
            ...extraFields
        ]
    }
}