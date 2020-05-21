export const Routes =
{
    items: [
        {
            heading: "Admin",
            label: "Dashboard",
            name: "dashboard",
            route: "/admin/dashboard",
            icon: "fas fa-fw fa-cog",
            header: true
        },
        {
            heading: "Api Services",
            label: "Providers",
            name: "providers",
            route: "/admin/providers",
            icon: "fas fa-fw fa-folder",
            subs: [
                {
                    label: "Manage Providers",
                    name: "manage_providers",
                    route: "/admin/providers"
                }
            ]
        },
        {
            label: "Properties",
            name: "properties",
            route: "/admin/properties",
            icon: "fas fa-fw fa-cog",
            subs: [
                {
                    label: "Manage Properties",
                    name: "manage_properties",
                    route: "/admin/properties"
                }
            ]
        },
        {
            label: "Services",
            name: "services",
            route: "/admin/services",
            icon: "fas fa-fw fa-cog",
            subs: [
                {
                    label: "Manage Services",
                    name: "manage_services",
                    route: "/admin/services"
                }
            ]
        },
        {
            heading: "User Admin",
            label: "Users",
            name: "users",
            route: "/admin/users/manage",
            icon: "fas fa-fw fa-wrench",
            subs: [
                {
                    label: "Manage Users",
                    name: "manage_users",
                    route: "/admin/users/manage"
                }
            ]
        }
    ]
}