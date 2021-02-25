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
                            max: 30
                        }
                    ]
                }
            },
        ]
    }
}