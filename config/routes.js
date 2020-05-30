export const Routes =
{
    items: [
        {
            heading: "Admin",
            label: "Dashboard",
            name: "dashboard",
            route: "/admin/dashboard",
            parent: "self",
            icon: "cil-3d",
            header: true,
            sidebar: true
        },
        {
            heading: "Api Services",
            label: "Categories",
            name: "categories",
            route: "/admin/categories",
            parent: "dashboard",
            icon: "cil-tags",
            sidebar: true,
            subs: [
                {
                    label: "Manage Categories",
                    name: "manage_categories",
                    route: "/admin/categories",
                    parent: "manage_categories",
                    icon: "cil-wc",
                    sidebar: true
                }
            ]
        },
        {
            label: "Providers",
            name: "providers",
            route: "/admin/providers",
            parent: "dashboard",
            icon: "cil-voice-over-record",
            sidebar: true,
            subs: [
                {
                    label: "Manage Providers",
                    name: "manage_providers",
                    route: "/admin/providers",
                    parent: "providers",
                    icon: "cil-wc",
                    sidebar: true
                },
                {
                    label: "Providers Properties",
                    name: "provider_properties",
                    route: "/admin/providers/properties",
                    parent: "providers",
                    icon: "cil-wc",
                    sidebar: true
                },
                {
                    label: "Provider Property",
                    name: "provider_property",
                    route: "/admin/providers/properties/[%d]",
                    parent: "provider_properties",
                    icon: "cil-wc",
                    sidebar: false
                },
                {
                    label: "Service Requests",
                    name: "service_requests",
                    route: "/admin/providers/requests/[$d]",
                    parent: "providers",
                    icon: "cil-wc",
                    sidebar: false,
                    subs : [
                        {
                            label: "Request Parameters",
                            name: "requests_parameters",
                            route: "/admin/providers/requests/parameters/[$d]",
                            parent: "service_requests",
                            icon: "cil-wc",
                            sidebar: false,
                        }
                    ]
                },
            ]
        },
        {
            label: "Properties",
            name: "properties",
            route: "/admin/properties",
            parent: "dashboard",
            icon: "cil-library",
            sidebar: true,
            subs: [
                {
                    label: "Manage Properties",
                    name: "manage_properties",
                    route: "/admin/properties",
                    parent: "properties",
                    icon: "cil-wc",
                    sidebar: true
                }
            ]
        },
        {
            label: "Services",
            name: "services",
            route: "/admin/services",
            parent: "dashboard",
            icon: "cil-gem",
            sidebar: true,
            subs: [
                {
                    label: "Manage Services",
                    name: "manage_services",
                    route: "/admin/services",
                    parent: "services",
                    icon: "cil-wc",
                    sidebar: true
                },
                {
                    label: "Response Keys",
                    name: "response_keys",
                    route: "/admin/services/response-keys/[%d]",
                    parent: "services",
                    icon: "cil-wc",
                    sidebar: false
                }
            ]
        },
        {
            heading: "User Admin",
            label: "Users",
            name: "users",
            route: "/admin/users/manage",
            parent: "dashboard",
            icon: "cil-wc",
            sidebar: true,
            subs: [
                {
                    label: "Manage Users",
                    name: "manage_users",
                    route: "/admin/users/manage",
                    parent: "users",
                    icon: "cil-wc",
                    sidebar: true
                }
            ]
        }
    ]
}