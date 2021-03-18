export const MergeResponseKeysFormData = (serviceRequests = []) => {
    return {
        fields: [
            {
                rowIndex: 0,
                columnIndex: 0,
                name: "source_service_request",
                label: "Select Response Key",
                fieldType: "select",
                multi: false,
                options: serviceRequests,
            },
        ]
    };
}