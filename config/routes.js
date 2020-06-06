export const Routes =
{
    items: [
        {
            access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
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
            access_control: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
            heading: "Api Services",
            label: "Categories",
            name: "categories",
            route: "/admin/categories",
            parent: "dashboard",
            icon: "cil-tags",
            sidebar: true,
            subs: [
                {
                    access_control: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "Manage Categories",
                    name: "manage_categories",
                    route: "/admin/categories",
                    parent: "dashboard",
                    icon: "cil-wc",
                    sidebar: true
                }
            ]
        },
        {
            access_control: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
            label: "Providers",
            name: "providers",
            route: "/admin/providers",
            parent: "dashboard",
            icon: "cil-voice-over-record",
            sidebar: true,
            subs: [
                {
                    access_control: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "Manage Providers",
                    name: "manage_providers",
                    route: "/admin/providers",
                    parent: "dashboard",
                    icon: "cil-wc",
                    sidebar: true
                },
                {
                    access_control: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "Properties",
                    name: "provider_properties",
                    route: "/admin/providers/properties",
                    parent: "providers",
                    icon: "cil-wc",
                    sidebar: false
                },
                {
                    access_control: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "Service Requests",
                    name: "service_requests",
                    route: "/admin/providers/%d/requests/",
                    parent: "providers",
                    icon: "cil-wc",
                    sidebar: false,
                    subs : [
                        {
                            access_control: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                            label: "Request Parameters",
                            name: "requests_parameters",
                            route: "/admin/providers/requests/parameters/%d",
                            parent: "service_requests",
                            icon: "cil-wc",
                            sidebar: false,
                        },
                        {
                            access_control: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                            label: "Request Config",
                            name: "requests_config",
                            route: "/admin/providers/requests/config/%d",
                            parent: "service_requests",
                            icon: "cil-wc",
                            sidebar: false,
                        },
                        {
                            access_control: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                            label: "Response Keys",
                            name: "requests_response_keys",
                            route: "/admin/providers/requests/response-keys/%d",
                            parent: "service_requests",
                            icon: "cil-wc",
                            sidebar: false,
                        }
                    ]
                },
            ]
        },
        {
            access_control: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
            label: "Properties",
            name: "properties",
            route: "/admin/properties",
            parent: "dashboard",
            icon: "cil-library",
            sidebar: true,
            subs: [
                {
                    access_control: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "Manage Properties",
                    name: "manage_properties",
                    route: "/admin/properties",
                    parent: "dashboard",
                    icon: "cil-wc",
                    sidebar: true
                }
            ]
        },
        {
            access_control: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
            label: "Services",
            name: "services",
            route: "/admin/services",
            parent: "dashboard",
            icon: "cil-gem",
            sidebar: true,
            subs: [
                {
                    access_control: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "Manage Services",
                    name: "manage_services",
                    route: "/admin/services",
                    parent: "dashboard",
                    icon: "cil-wc",
                    sidebar: true
                },
                {
                    access_control: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "Response Keys",
                    name: "response_keys",
                    route: "/admin/services/%d/response-keys",
                    parent: "manage_services",
                    icon: "cil-wc",
                    sidebar: false
                }
            ]
        },
        {
            access_control: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
            heading: "User Admin",
            label: "Users",
            name: "users",
            route: "/admin/users/manage",
            parent: "dashboard",
            icon: "cil-wc",
            sidebar: true,
            subs: [
                {
                    access_control: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "Manage Users",
                    name: "manage_users",
                    route: "/admin/users/manage",
                    parent: "dashboard",
                    icon: "cil-wc",
                    sidebar: true
                }
            ]
        }
    ]
}