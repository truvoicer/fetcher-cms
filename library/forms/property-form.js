import {isNotEmpty} from "../utils";

export const PropertyFormData = (
    update = false,
    property = null,
) => {
    return {
        fields: [
            {
                rowIndex: 0,
                columnIndex: 0,
                name: "property_label",
                label: "Property Label",
                type: "text",
                fieldType: "text",
                placeHolder: "Enter a property label",
                value: !isNotEmpty(property?.property_label)? "" : property.property_label,
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
                rowIndex: 1,
                columnIndex: 0,
                name: "property_name",
                label: "Property Name",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter property name",
                value: !isNotEmpty(property?.property_name)? "" : property.property_name,
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