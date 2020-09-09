export const PropertyFormData = (
    update = false,
    propertyName = null,
    propertyLabel = null
) => {
    return {
        fields: [
            {
                name: "property_label",
                label: "Property Label",
                type: "text",
                fieldType: "text",
                placeHolder: "Enter a property label",
                value: propertyLabel? propertyLabel : "",
                validation: {
                    rules: [
                        {
                            type: "alphanumeric"
                        },
                        {
                            type: "length",
                            min: 3,
                            max: 16
                        }
                    ]
                }
            },
            {
                name: "property_name",
                label: "Property Name",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter property name",
                value: propertyName? propertyName : "",
                validation: {
                    rules: [
                        {
                            type: "alphanumeric"
                        },
                        {
                            type: "length",
                            min: 3,
                            max: 16
                        }
                    ]
                }
            },
        ]
    }
}