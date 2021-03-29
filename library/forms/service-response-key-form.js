export const ServiceResponseKeyFormData = (
    serviceResponseKey = null
) => {
    return {
        fields: [
            {
                rowIndex: 0,
                columnIndex: 0,
                name: "key_name",
                label: "Key Name",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a key name",
                value: serviceResponseKey?.key_name ? serviceResponseKey.key_name : "",
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