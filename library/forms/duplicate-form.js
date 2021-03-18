export const DuplicateFormData = () => {
    return {
        fields: [
            {
                rowIndex: 0,
                columnIndex: 0,
                name: "item_label",
                label: "Item Label",
                placeHolder: "Enter an item label",
                fieldType: "text",
                type: "text",
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
                rowIndex: 1,
                columnIndex: 0,
                name: "item_name",
                label: "Item Name",
                placeHolder: "Enter an item name",
                fieldType: "text",
                type: "text",
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