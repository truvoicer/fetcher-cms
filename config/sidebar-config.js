export const SidebarConfig =
{
    items: [
        {
            label: "Dashboard",
            name: "dashboard",
            route: "/admin/dashboard",
        },
        {
            label: "Providers",
            name: "providers",
            route: "/admin/providers",
            subs: [
                {
                    label: "Manage Providers",
                    name: "manage_providers",
                    route: "/admin/providers/manage"
                },
                {
                    label: "Create Provider",
                    name: "create_provider",
                    route: "/admin/providers/create"
                }
            ]
        },
        {
            label: "Users",
            name: "users",
            route: "/admin/users",
            subs: [
                {
                    label: "Manage Users",
                    name: "manage_users",
                    route: "/admin/users/manage"
                },
                {
                    label: "Create User",
                    name: "create_user",
                    route: "/admin/users/create"
                }
            ]
        }
    ]
}