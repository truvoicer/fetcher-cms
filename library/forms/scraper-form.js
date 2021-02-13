import {isNotEmpty, isSet, uCaseFirst} from "../utils";

export const ScraperFormData = (
    update = false,
    scraper = null,
    provider = null,
    servicesOptions = [],
    providerOptions = []
) => {
    let providerValue = {};
    if (isNotEmpty(scraper?.provider)) {
        providerValue = {value: scraper.provider.id, label: scraper.provider.provider_label}
    } else if (isNotEmpty(provider)) {
        providerValue = {value: provider.id, label: provider.provider_label}
    }
    return {
        fields: [
            {
                rowIndex: 0,
                columnIndex: 0,
                name: "provider",
                description: "",
                label: "Provider",
                labelPosition: "",
                placeHolder: "",
                fieldType: "select",
                multi: false,
                options: providerOptions,
                data: [],
                value: providerValue,
            },
            {
                rowIndex: 0,
                columnIndex: 1,
                name: "service",
                description: "",
                label: "Service",
                labelPosition: "",
                placeHolder: "",
                fieldType: "select",
                multi: false,
                options: servicesOptions,
                data: [],
                value: !isNotEmpty(scraper?.service)? {} : {value: scraper.service.id, label: scraper.service.service_name},
            },
            {
                rowIndex: 1,
                columnIndex: 0,
                name: "scraper_label",
                description: "",
                label: "Scraper Label",
                labelPosition: "",
                placeHolder: "Enter a scraper label",
                fieldType: "text",
                type: "text",
                value: !isNotEmpty(scraper?.scraper_label)? "" : scraper.scraper_label,
            },
            {
                rowIndex: 1,
                columnIndex: 1,
                name: "priority",
                description: "",
                label: "Priority",
                labelPosition: "",
                placeHolder: "",
                fieldType: "text",
                type: "number",
                value: !isNotEmpty(scraper?.priority)? "" : scraper.priority,
            },
            {
                rowIndex: 2,
                columnIndex: 0,
                name: "arguments",
                description: "",
                label: "Arguments",
                labelPosition: "",
                placeHolder: "Enter arguments",
                fieldType: "text",
                type: "text",
                // value: !isNotEmpty(scraper)? "" : scraper.arguments
            },
            {
                rowIndex: 3,
                columnIndex: 0,
                name: "disabled",
                description: "",
                showLabel: false,
                label: "Disabled?",
                labelPosition: "",
                placeHolder: "",
                fieldType: "checkbox",
                checkboxType: "true_false",
                value: isSet(scraper?.disabled)? scraper?.disabled : false,
                options: [],
            },
            {
                rowIndex: 3,
                columnIndex: 1,
                name: "locked",
                description: "",
                showLabel: false,
                label: "Locked?",
                labelPosition: "",
                placeHolder: "",
                fieldType: "checkbox",
                checkboxType: "true_false",
                value: isSet(scraper?.locked)? scraper?.locked : false,
                options: [],
            },
            {
                rowIndex: 3,
                columnIndex: 2,
                name: "execute_immediately",
                description: "",
                showLabel: false,
                label: "Execute Immediately?",
                labelPosition: "",
                placeHolder: "",
                fieldType: "checkbox",
                checkboxType: "true_false",
                value: isSet(scraper?.execute_immediately)? scraper?.execute_immediately : false,
                options: [],
            },
        ]
    }
}