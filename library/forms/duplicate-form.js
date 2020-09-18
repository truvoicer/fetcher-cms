export const DuplicateFormData = (
    update = false,
    itemLabel = null,
    itemName = null
) => {
    return {
        fields: [
            {
                name: "item_label",
                label: "Item Label",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter an item label",
                value: "",
                validation: {
                    rules: [
                        {
                            type: "alphanumeric"
                        },
                        {
                            type: "length",
                            min: 3,
                            max: 50
                        }
                    ]
                }
            },
            {
                name: "item_name",
                label: "Item Name",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter an item name",
                value: "",
                validation: {
                    rules: [
                        {
                            type: "alphanumeric"
                        },
                        {
                            type: "length",
                            min: 3,
                            max: 50
                        }
                    ]
                }
            },
        ]
    }
}