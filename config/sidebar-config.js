export const SidebarConfig =
{
    items: [
        {
            label: "Dashboard",
            name: "dashboard",
            route: "/admin/dashboard",
            icon: "fas fa-fw fa-cog",
        },
        {
            label: "Providers",
            name: "providers",
            route: "/admin/providers",
            icon: "fas fa-fw fa-folder",
            subs: [
                {
                    label: "Manage Providers",
                    name: "manage_providers",
                    route: "/admin/providers/manage"
                }
            ]
        },
        {
            label: "Properties",
            name: "properties",
            route: "/admin/properties",
            icon: "fas fa-fw fa-folder",
            subs: [
                {
                    label: "Manage Properties",
                    name: "manage_properties",
                    route: "/admin/properties/manage"
                }
            ]
        },
        {
            heading: "Admin",
            label: "Users",
            name: "users",
            route: "/admin/users",
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