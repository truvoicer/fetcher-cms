export const ScraperFormData = (
    update = false,
    scraperLabel = null
) => {
    return {
        fields: [
            {
                name: "scraper_label",
                label: "Scraper Label",
                type: "text",
                fieldType: "text",
                placeHolder: "Enter a scraper label",
                value: scraperLabel? scraperLabel : "",
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
                name: "provider",
                label: "Providers",
                fieldType: "select",
                multi: false
            },
            {
                name: "services",
                label: "Service",
                fieldType: "select",
                multi: false
            },
        ]
    }
}