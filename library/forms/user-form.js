export const UserFormData = (username = null, email = null, update = false) => {
    let data = {
        fields: [
            {
                name: "username",
                label: "Username",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a username",
                value: username ? username : "",
                validation: {
                    rules: [
                        {
                            type: "alphanumeric"
                        },
                        {
                            type: "length",
                            min: 5,
                            max: 16
                        }
                    ]
                }
            },
            {
                name: "email",
                label: "Email",
                type: "email",
                fieldType: "text",
                placeHolder: "Enter your email",
                value: email ? email : "",
                validation: {
                    rules: [
                        {
                            type: "email"
                        },
                    ]
                }
            },
            {
                name: "roles",
                label: "User Roles",
                fieldType: "select",
                multi: true,
            },
        ]
    };

    if (!update) {
        data.fields.push(
            {
                name: "password",
                label: "Password",
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
            },
            {
                name: "confirm_password",
                label: "Confirm password",
                type: "password",
                fieldType: "text",
                placeHolder: "",
                validation: {
                    rules: [
                        {
                            type: "match",
                            matchField: "password",
                        },
                    ]
                }
            }
        );
    } else {
        data.fields.push(
            {
                name: "current_password",
                label: "Current Password",
                type: "password",
                fieldType: "text",
                field: "input",
                placeHolder: "",
            },
            {
                label: "Change Password?",
                name: "change_password",
                fieldType: "checkbox",
                value: "1",
                checkboxType: "true_false",
                subFields: [
                    {
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
                    },
                    {
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
                    },
                ]
            }
        )
    }
    return data;
}