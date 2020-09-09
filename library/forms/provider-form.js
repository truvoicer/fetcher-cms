export const ProviderFormData = (
    update = false,
    provider_label = null,
    provider_name = null,
    provider_user_id = null,
    provider_api_base_url = null,
    provider_access_key = null,
    provider_secret_key = null
) => {
    return {
        fields: [
            {
                name: "provider_label",
                label: "Provider Label",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a provider label",
                value: provider_label ? provider_label : "",
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
                name: "provider_name",
                label: "Provider Name",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a provider name",
                value: provider_name ? provider_name : "",
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
                name: "provider_user_id",
                label: "Provider User Id",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a provider user id",
                value: provider_user_id ? provider_user_id : "",
            },
            {
                name: "provider_api_base_url",
                label: "Provider Api Base Url",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a provider api base url",
                value: provider_api_base_url ? provider_api_base_url : "",
            },
            {
                name: "provider_access_key",
                label: "Provider Access Key",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a provider access key",
                value: provider_access_key ? provider_access_key : "",
            },
            {
                name: "provider_secret_key",
                label: "Provider Secret Key",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a provider secret key",
                value: provider_secret_key ? provider_secret_key : "",
            },
            {
                name: "category",
                label: "Provider Categories",
                fieldType: "select",
                multi: true
            },
        ]
    };
}