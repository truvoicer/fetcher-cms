This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Link Example
        {
            control: "link",
            text: "Requests",
            action: "update",
            href: "/admin/providers/%s/requests/",
            
            // For query urls e.g  (?/id/10/service/20/provider/30)
            query: {
                dynamic: {
                    brackets: true,
                        params: { // For query urls e.g (?/id/10/service/20/provider/30)
                            id: "id",  //id = query display text, value = column name of the row object
                            service: {          //service = row column name of child object
                                service: "id"   //service = query display text, id = column name of the row object
                            },
                            provider: {          //service = row column name of child object
                                provider: "id"   //service = query display text, id = column name of the row object
                            }
                        }
                }
            },
            
            // For placeholders in the href
            // e.g ("/admin/providers/%(provider.id)d/requests/%(service_request.id)d/parameters")
            hrefConfig: {
                replace: true,
                data: {     // sprintf object to replace placeholders
                    provider: {
                        dynamic: false, // object is set as is.
                        id: this.props.provider_id
                    },
                    service_request: {
                        dynamic: true, // uses dynamic value from column in row
                        column: "id", // row column field
                        key: "id"  // key for object
                    }
                }
            },
            size: "sm",
            classes: "btn btn-outline-primary btn-sm"
        },