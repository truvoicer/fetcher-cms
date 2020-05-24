export const Routes =
{
    items: [
        {
            heading: "Admin",
            label: "Dashboard",
            name: "dashboard",
            route: "/admin/dashboard",
            icon: "cil-3d",
            header: true
        },
        {
            heading: "Api Services",
            label: "Categories",
            name: "manage_categories",
            route: "/admin/categories",
            icon: "cil-tags",
            subs: [
                {
                    label: "Manage Categories",
                    name: "manage_categories",
                    route: "/admin/categories",
                    icon: "cil-wc"
                }
            ]
        },
        {
            label: "Providers",
            name: "providers",
            route: "/admin/providers",
            icon: "cil-voice-over-record",
            subs: [
                {
                    label: "Manage Providers",
                    name: "manage_providers",
                    route: "/admin/providers",
                    icon: "cil-wc"
                },
                {
                    label: "Providers Properties",
                    name: "provider_properties",
                    route: "/admin/providers/properties",
                    icon: "cil-wc"
                },
            ]
        },
        {
            label: "Properties",
            name: "properties",
            route: "/admin/properties",
            icon: "cil-library",
            subs: [
                {
                    label: "Manage Properties",
                    name: "manage_properties",
                    route: "/admin/properties",
                    icon: "cil-wc"
                }
            ]
        },
        {
            label: "Services",
            name: "services",
            route: "/admin/services",
            icon: "cil-gem",
            subs: [
                {
                    label: "Manage Services",
                    name: "manage_services",
                    route: "/admin/services",
                    icon: "cil-wc"
                }
            ]
        },
        {
            heading: "User Admin",
            label: "Users",
            name: "users",
            route: "/admin/users/manage",
            icon: "cil-wc",
            subs: [
                {
                    label: "Manage Users",
                    name: "manage_users",
                    route: "/admin/users/manage",
                    icon: "cil-wc"
                }
            ]
        }
    ]
}