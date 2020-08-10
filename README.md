## Link Example
        {
            control: "link",
            text: "Requests",
            action: "update",
            href: "/admin/providers/%s/requests/",
            query: {
                dynamic: {
                    brackets: true,
                    data: {
                        id: "provider_id",  //id = column name, value = query val
                        service: {          //service = column name of sub object
                            service: "id"   //service = query value, id = column name of column in sub object
                        }
                    }
                }
            },
            size: "sm",
            classes: "btn btn-outline-primary btn-sm"
        },