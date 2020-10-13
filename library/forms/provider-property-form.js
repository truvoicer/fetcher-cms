export const ProviderPropertyFormData = (
    update = false,
    propertyValue = null,
) => {
    return {
        fields: [
            {
                name: "property_value",
                label: "Property Value",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a property value",
                value: propertyValue? propertyValue : ""
            },
        ]
    }
}