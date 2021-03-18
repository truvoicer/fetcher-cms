import {isNotEmpty} from "../utils";

export const ProviderPropertyFormData = (
    update = false,
    propertyValue = null,
) => {
    return {
        fields: [
            {
                rowIndex: 0,
                columnIndex: 0,
                name: "property_value",
                label: "Property Value",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a property value",
                value: !isNotEmpty(propertyValue?.property_value)? "" : propertyValue.property_value,
            },
        ]
    }
}