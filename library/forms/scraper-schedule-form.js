import {isNotEmpty, isSet, uCaseFirst} from "../utils";

export const ScraperScheduleFormData = (
    update = false,
    scraperSchedule = null,
    scraper = null,
    scraperList = []
) => {
    // console.log(scraperSchedule?.every_minute)
    return {
        fields: [
            {
                rowIndex: 0,
                columnIndex: 0,
                name: "scraper",
                description: "",
                label: "Scraper",
                labelPosition: "",
                placeHolder: "",
                fieldType: "select",
                multi: false,
                options: scraperList,
                value: !isNotEmpty(scraper)? {} : {value: scraper.id, label: scraper.scraper_label},
            },
            {
                rowIndex: 0,
                columnIndex: 1,
                name: "forever",
                description: "",
                showLabel: false,
                label: "Run Forever?",
                labelPosition: "",
                placeHolder: "",
                fieldType: "checkbox",
                checkboxType: "true_false",
                value: isSet(scraperSchedule?.forever)? scraperSchedule?.forever : true,
                options: [],
            },
            {
                rowIndex: 1,
                columnIndex: 0,
                name: "use_cron_expression",
                description: "",
                showLabel: false,
                label: "Use Cron Expression?",
                labelPosition: "",
                placeHolder: "",
                fieldType: "checkbox",
                checkboxType: "true_false",
                value: isSet(scraperSchedule?.use_cron_expression)? scraperSchedule?.use_cron_expression : true,
                options: [],
            },
            {
                rowIndex: 1,
                columnIndex: 1,
                name: "cron_expression",
                description: "",
                label: "Cron Expression",
                labelPosition: "",
                placeHolder: "",
                fieldType: "text",
                type: "text",
                value: !isNotEmpty(scraperSchedule?.cron_expression)? null : scraperSchedule.cron_expression,
                options: [],
            },
            {
                rowIndex: 2,
                columnIndex: 0,
                name: "start_date",
                description: "",
                label: "Start Date?",
                labelPosition: "",
                placeHolder: "Start date",
                fieldType: "date",
                format: "dd MMMM yyyy",
                value: !isNotEmpty(scraperSchedule?.start_date)? null : scraperSchedule.start_date,
            },
            {
                rowIndex: 2,
                columnIndex: 1,
                name: "end_date",
                description: "",
                label: "End Date?",
                labelPosition: "",
                placeHolder: "End Date",
                fieldType: "date",
                format: "dd MMMM yyyy",
                value: !isNotEmpty(scraperSchedule?.end_date)? null : scraperSchedule.end_date,
            },
            {
                rowIndex: 3,
                columnIndex: 0,
                name: "every_minute",
                description: "",
                showLabel: false,
                label: "Every Minute?",
                labelPosition: "",
                placeHolder: "",
                fieldType: "checkbox",
                checkboxType: "true_false",
                value: isSet(scraperSchedule?.every_minute)? scraperSchedule?.every_minute : true,
                options: [],
            },
            {
                rowIndex: 3,
                columnIndex: 1,
                name: "minute",
                description: "",
                label: "Minute",
                labelPosition: "",
                placeHolder: "",
                fieldType: "text",
                type: "number",
                min: 0,
                max: 60,
                value: !isNotEmpty(scraperSchedule?.minute)? "" : scraperSchedule.minute,
            },
            {
                rowIndex: 4,
                columnIndex: 0,
                name: "every_hour",
                description: "",
                showLabel: false,
                label: "Every Hour?",
                labelPosition: "",
                placeHolder: "",
                fieldType: "checkbox",
                checkboxType: "true_false",
                value: isSet(scraperSchedule?.every_hour)? scraperSchedule?.every_hour : true,
                options: [],
            },
            {
                rowIndex: 4,
                columnIndex: 1,
                name: "hour",
                description: "",
                label: "Hour",
                labelPosition: "",
                placeHolder: "",
                fieldType: "text",
                type: "number",
                min: 0,
                max: 24,
                value: !isNotEmpty(scraperSchedule?.hour)? "" : scraperSchedule.hour,
            },
            {
                rowIndex: 5,
                columnIndex: 0,
                name: "every_day",
                description: "",
                showLabel: false,
                label: "Every Day?",
                labelPosition: "",
                placeHolder: "",
                fieldType: "checkbox",
                checkboxType: "true_false",
                value: isSet(scraperSchedule?.every_day)? scraperSchedule?.every_day : true,
                options: [],
                data: [],
            },
            {
                rowIndex: 5,
                columnIndex: 1,
                name: "day",
                description: "",
                label: "Day",
                labelPosition: "",
                placeHolder: "",
                fieldType: "text",
                type: "number",
                min: 0,
                max: 31,
                value: !isNotEmpty(scraperSchedule?.day)? "" : scraperSchedule.day,
            },
            {
                rowIndex: 6,
                columnIndex: 0,
                name: "every_month",
                description: "",
                showLabel: false,
                label: "Every Month?",
                labelPosition: "",
                placeHolder: "",
                fieldType: "checkbox",
                checkboxType: "true_false",
                value: isSet(scraperSchedule?.every_month)? scraperSchedule?.every_month : true,
                options: [],
                data: [],
            },
            {
                rowIndex: 6,
                columnIndex: 1,
                name: "month",
                description: "",
                label: "Month",
                labelPosition: "",
                placeHolder: "",
                fieldType: "select",
                multi: false,
                options: [
                    {value: "january", label: "January"},
                    {value: "february", label: "February"},
                    {value: "march", label: "March"},
                    {value: "april", label: "April"},
                    {value: "may", label: "May"},
                    {value: "june", label: "June"},
                    {value: "july", label: "July"},
                    {value: "august", label: "August"},
                    {value: "september", label: "September"},
                    {value: "october", label: "October"},
                    {value: "november", label: "November"},
                    {value: "december", label: "December"},
                ],
                data: [],
                value: !isNotEmpty(scraperSchedule?.month)? {} : {value: scraperSchedule.month, label: uCaseFirst(scraperSchedule.month)},
            },
            {
                rowIndex: 7,
                columnIndex: 0,
                name: "every_weekday",
                description: "",
                showLabel: false,
                label: "Every Week Day?",
                labelPosition: "",
                placeHolder: "",
                fieldType: "checkbox",
                checkboxType: "true_false",
                value: isSet(scraperSchedule?.every_weekday)? scraperSchedule?.every_weekday : true,
                options: [],
                data: [],
            },
            {
                rowIndex: 7,
                columnIndex: 1,
                name: "weekday",
                description: "",
                label: "Week Day",
                labelPosition: "",
                placeHolder: "",
                fieldType: "select",
                multi: false,
                options: [
                    {value: "monday", label: "Monday"},
                    {value: "tuesday", label: "Tuesday"},
                    {value: "wednesday", label: "Wednesday"},
                    {value: "thursday", label: "Thursday"},
                    {value: "friday", label: "Friday"},
                    {value: "saturday", label: "Saturday"},
                    {value: "sunday", label: "Sunday"},
                ],
                data: [],
                value: !isNotEmpty(scraperSchedule?.weekday)? {} : {value: scraperSchedule.weekday, label: uCaseFirst(scraperSchedule.weekday)},
            },
        ]
    }
}