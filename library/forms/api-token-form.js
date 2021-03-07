import {isNotEmpty} from "../utils";

export const ApiTokenFormData = (
    apiToken = null
) => {
    return {
        fields: [
            {
                rowIndex: 0,
                columnIndex: 0,
                name: "expires_at",
                label: "Expires At",
                description: "",
                labelPosition: "",
                placeHolder: "Expires At",
                fieldType: "date",
                format: "dd MMMM yyyy H:mm:s",
                value: !isNotEmpty(apiToken?.expires_at)? "" : apiToken.expires_at,
            },
        ]
    }
}