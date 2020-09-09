export const ApiTokenFormData = (
    update = false,
    expiresAt = null,
) => {
    return {
        fields: [
            {
                name: "expires_at",
                label: "Expires At",
                fieldType: "date",
                format: "dd MMMM yyyy H:mm:s",
                value: expiresAt? expiresAt : "",
            },
        ]
    }
}