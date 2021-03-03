import {isNotEmpty, isSet, uCaseFirst} from "../utils";

export const MappingsFormData = ({
                                     mappings = null,
                                     providerOptions = [],
                                     categoryOptions = []
                                 }) => {
    let providerValue = [];
    let categoryValue = [];
    if (isNotEmpty(mappings?.providers)) {
        providerValue = mappings?.providers.map((provider, index) => {
            return {
                value: provider.id,
                label: provider.provider_label
            }
        })
    }
    if (isNotEmpty(mappings?.categories)) {
        categoryValue = mappings?.categories.map((category, index) => {
            return {
                value: category.id,
                label: category.category_label
            }
        })
    }
    return {
        fields: [
            {
                rowIndex: 0,
                columnIndex: 0,
                name: "providers",
                description: "",
                label: "Providers",
                labelPosition: "",
                placeHolder: "",
                fieldType: "select",
                multi: true,
                options: providerOptions,
                data: [],
                value: providerValue,
            },
            {
                rowIndex: 1,
                columnIndex: 0,
                name: "categories",
                description: "",
                label: "Categories",
                labelPosition: "",
                placeHolder: "",
                fieldType: "select",
                multi: true,
                options: categoryOptions,
                data: [],
                value: categoryValue,
            },
        ]
    }
}