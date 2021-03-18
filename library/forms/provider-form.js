import {isNotEmpty} from "../utils";
import {buildCategoriesSelectOptions} from "../api/helpers/api-helpers";

export const ProviderFormData = (
    update = false,
    provider = null,
    categories = [],
) => {
    let categoryValue = [];
    if (isNotEmpty(provider?.category)) {
        categoryValue = buildCategoriesSelectOptions(provider.category)
    }
    return {
        fields: [
            {
                rowIndex: 0,
                columnIndex: 0,
                name: "provider_label",
                description: "",
                label: "Provider Label",
                labelPosition: "",
                placeHolder: "Enter a provider label",
                fieldType: "text",
                type: "text",
                value: !isNotEmpty(provider?.provider_label)? "" : provider.provider_label,
                validation: {
                    rules: [
                        {
                            type: "alphanumeric"
                        },
                        {
                            type: "length",
                            min: 2,
                            max: 50
                        }
                    ]
                }
            },
            {
                rowIndex: 1,
                columnIndex: 0,
                name: "provider_name",
                description: "",
                label: "Provider Name",
                labelPosition: "",
                placeHolder: "Enter a provider name",
                fieldType: "text",
                type: "text",
                value: !isNotEmpty(provider?.provider_name)? "" : provider.provider_name,
                validation: {
                    rules: [
                        {
                            type: "alphanumeric"
                        },
                        {
                            type: "length",
                            min: 2,
                            max: 50
                        }
                    ]
                }
            },
            {
                rowIndex: 2,
                columnIndex: 0,
                name: "provider_user_id",
                label: "Provider User Id",
                labelPosition: "",
                placeHolder: "Enter a provider user id",
                fieldType: "text",
                type: "text",
                value: !isNotEmpty(provider?.provider_user_id)? "" : provider.provider_user_id,
            },
            {
                rowIndex: 3,
                columnIndex: 0,
                name: "provider_api_base_url",
                label: "Provider Api Base Url",
                labelPosition: "",
                placeHolder: "Enter a provider api base url",
                fieldType: "text",
                type: "text",
                value: !isNotEmpty(provider?.provider_api_base_url)? "" : provider.provider_api_base_url,
            },
            {
                rowIndex: 4,
                columnIndex: 0,
                name: "provider_access_key",
                label: "Provider Access Key",
                labelPosition: "",
                placeHolder: "Enter a provider access key",
                fieldType: "text",
                type: "text",
                value: !isNotEmpty(provider?.provider_access_key)? "" : provider.provider_access_key,
            },
            {
                rowIndex: 5,
                columnIndex: 0,
                name: "provider_secret_key",
                label: "Provider Secret Key",
                labelPosition: "",
                placeHolder: "Enter a provider secret key",
                fieldType: "text",
                type: "text",
                value: !isNotEmpty(provider?.provider_secret_key)? "" : provider.provider_secret_key,
            },
            {
                rowIndex: 6,
                columnIndex: 0,
                name: "category",
                label: "Categories",
                fieldType: "select",
                multi: true,
                options: categories,
                value: categoryValue,
            },
        ]
    };
}