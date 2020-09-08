export const CategoryFormData = (categoryName = null, categoryLabel = null) => {
    return {
        fields: [
            {
                name: "category_name",
                label: "Category Name",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter category name",
                value: categoryName? categoryName : "",
                validation: {
                    rules: [
                        {
                            type: "alphanumeric"
                        },
                        {
                            type: "length",
                            min: 5,
                            max: 16
                        }
                    ]
                }
            },
            {
                name: "category_label",
                label: "Category Label",
                type: "text",
                fieldType: "text",
                placeHolder: "Enter a category label",
                value: categoryLabel? categoryLabel : "",
                validation: {
                    rules: [
                        {
                            type: "alphanumeric"
                        },
                        {
                            type: "length",
                            min: 5,
                            max: 16
                        }
                    ]
                }
            },
        ]
    }
}