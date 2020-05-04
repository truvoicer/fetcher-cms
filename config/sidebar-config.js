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
                    label: "Create User",
                    name: "create_user",
                    route: "/admin/users/create"
                }
            ]
        }
    ]
}