##  Response Keys Logic
#### Api Array Values
######Get a specific field in an array based on a value match:

* [url=width>640]    
url = field value to return    
width = field key to compare    
640 = field value to compare


######Get a processed array based on keys
* [image_width=width]  
image_width is a custom key name (label), width is the key of object to be returned

* [item_url=url]    
item_url is a custom key name (label), url is the key of object to be returned


######Get a custom array sub object
* [category_id=category.id]    
[category_name=category.name]   
[image_url=image.href]    

        {
            category_id: "sffsd3434",
            category_name: "Sports",
            image_url: "http://image.com/dsfsdf.jpeg"
        }
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