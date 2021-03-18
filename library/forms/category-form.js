import {isNotEmpty} from "../utils";

export const CategoryFormData = (
    update = false,
    category = null,
) => {
    return {
        fields: [
            {
                rowIndex: 0,
                columnIndex: 0,
                name: "category_name",
                description: "",
                label: "Category Name",
                labelPosition: "",
                placeHolder: "Category Name",
                fieldType: "text",
                type: "text",
                value: !isNotEmpty(category?.category_name)? "" : category.category_name,
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
                name: "category_label",
                description: "",
                label: "Category Label",
                labelPosition: "",
                placeHolder: "Category Label",
                fieldType: "text",
                type: "text",
                value: !isNotEmpty(category?.category_label)? "" : category.category_label,
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