export const ServiceResponseKeyFormData = (
    update = false,
    keyName = null,
    keyValue = null
) => {
    return {
        fields: [
            {
                name: "key_name",
                label: "Key Name",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a key name",
                value: keyName? keyName : "",
                validation: {
                    rules: [
                        {
                            type: "alphanumeric"
                        },
                        {
                            type: "length",
                            min: 1,
                            max: 16
                        }
                    ]
                }
            },
            {
                name: "key_value",
                label: "Key Value",
                type: "text",
                fieldType: "text",
                placeHolder: "Enter a key value",
                value: keyValue? keyValue : "",
                matches: {
                  field: "key_name",
                },
                validation: {
                    rules: [
                        {
                            type: "alphanumeric"
                        },
                        {
                            type: "length",
                            min: 1,
                            max: 16
                        }
                    ]
                }
            },
        ]
    }
}