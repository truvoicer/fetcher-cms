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
            access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
            heading: "Api Services",
            label: "Categories",
            name: "categories",
            route: "/admin/categories",
            parent: "dashboard",
            icon: "cil-tags",
            sidebar: true,
            subs: [
                {
                    access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "Manage Categories",
                    name: "manage_categories",
                    route: "/admin/categories",
                    parent: "categories",
                    icon: "cil-wc",
                    sidebar: true
                }
            ]
        },
        {
            access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
            label: "Scrapers",
            name: "scrapers",
            route: "/admin/scrapers2",
            parent: "dashboard",
            icon: "cil-voice-over-record",
            sidebar: true,
            subs: [
                {
                    access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "Manage Scrapers",
                    name: "manage_scrapers",
                    route: "/admin/scrapers",
                    parent: "scrapers",
                    icon: "cil-wc",
                    sidebar: true
                },
            ]
        },
        {
            access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
            label: "Providers",
            name: "provider",
            route: "/admin/providers",
            parent: "dashboard",
            icon: "cil-voice-over-record",
            sidebar: true,
            subs: [
                {
                    access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "Manage Providers",
                    name: "manage_providers",
                    route: "/admin/providers",
                    parent: "provider",
                    icon: "cil-wc",
                    sidebar: true
                },
                {
                    access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "Properties",
                    name: "provider_properties",
                    route: "/admin/providers/properties",
                    parent: "provider",
                    icon: "cil-wc",
                    sidebar: false
                },
                {
                    access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "Service Requests",
                    name: "service_requests",
                    route: "/admin/providers/%(provider.id)d/requests",
                    parent: "provider",
                    icon: "cil-wc",
                    sidebar: false,
                    subs : [
                        {
                            access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                            label: "Request Parameters",
                            name: "requests_parameters",
                            route: "/admin/providers/%(provider.id)d/requests/%(service_requests.id)d/parameters",
                            parent: "service_requests",
                            icon: "cil-wc",
                            sidebar: false,
                        },
                        {
                            access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                            label: "Request Config",
                            name: "requests_config",
                            route: "/admin/providers/%(provider.id)d/requests/%(service_requests.id)d/config",
                            parent: "service_requests",
                            icon: "cil-wc",
                            sidebar: false,
                        },
                        {
                            access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                            label: "Response Keys",
                            name: "requests_response_keys",
                            route: "/admin/providers/%(provider.id)d/requests/%(service_requests.id)d/response-keys",
                            parent: "service_requests",
                            icon: "cil-wc",
                            sidebar: false,
                        },
                        {
                            access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                            label: "Request Test",
                            name: "request_test",
                            route: "/admin/providers/%(provider.id)d/requests/%(service_requests.id)d/request-test",
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
                    parent: "properties",
                    icon: "cil-wc",
                    sidebar: true
                }
            ]
        },
        {
            access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
            label: "Services",
            name: "services",
            route: "/admin/services",
            parent: "dashboard",
            icon: "cil-gem",
            sidebar: true,
            subs: [
                {
                    access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "Manage Services",
                    name: "manage_services",
                    route: "/admin/services",
                    parent: "services",
                    icon: "cil-wc",
                    sidebar: true
                },
                {
                    access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "Response Keys",
                    name: "response_keys",
                    route: "/admin/services/%(services.id)d/response-keys",
                    parent: "services",
                    icon: "cil-wc",
                    sidebar: false
                }
            ]
        },
        {
            access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
            label: "Tools",
            name: "tools",
            route: "/admin/tools",
            parent: "dashboard",
            icon: "cil-gem",
            sidebar: true,
            subs: [
                {
                    access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "FileSystem",
                    name: "filesystem",
                    route: "/admin/tools/filesystem",
                    parent: "tools",
                    icon: "cil-wc",
                    sidebar: true
                },
                {
                    access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "Importer",
                    name: "importer",
                    route: "/admin/tools/importer",
                    parent: "tools",
                    icon: "cil-wc",
                    sidebar: true
                },
                {
                    access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "Exporter",
                    name: "exporter",
                    route: "/admin/tools/exporter",
                    parent: "tools",
                    icon: "cil-wc",
                    sidebar: true
                }
            ]
        },
        {
            access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
            heading: "User Admin",
            label: "User Admin",
            name: "user_admin",
            route: "/admin/profile/manage",
            parent: "dashboard",
            icon: "cil-wc",
            sidebar: true,
            subs: [
                {
                    access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "Profile",
                    name: "user_profile",
                    route: "/admin/profile/manage",
                    parent: "user_admin",
                    icon: "cil-wc",
                    sidebar: true
                },
                {
                    access_control: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "Api Tokens",
                    name: "api_tokens",
                    route: "/admin/profile/api-tokens",
                    parent: "user_admin",
                    icon: "cil-wc",
                    sidebar: true
                },
            ]
        },
        {
            access_control: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
            heading: "Site Settings",
            label: "Admin",
            name: "settings",
            route: "/admin/settings/manage",
            parent: "dashboard",
            icon: "cil-wc",
            sidebar: true,
            subs: [
                {
                    access_control: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "Manage Users",
                    name: "manage_users",
                    route: "/admin/settings/users/manage",
                    parent: "settings",
                    icon: "cil-wc",
                    sidebar: true
                },
                {
                    access_control: ["ROLE_SUPER_ADMIN"],
                    label: "Manage Permissions",
                    name: "manage_permissions",
                    route: "/admin/settings/permissions",
                    parent: "settings",
                    icon: "cil-wc",
                    sidebar: true
                },
                {
                    access_control: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "Api Tokens",
                    name: "settings_api_tokens",
                    route: "/admin/settings/users/%(user.id)d/api-tokens",
                    parent: "settings",
                    icon: "cil-wc",
                    sidebar: false
                },
                {
                    access_control: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
                    label: "User Entity Permissions",
                    name: "settings_user_permissions",
                    route: "/admin/settings/users/%(user.id)d/permissions",
                    parent: "settings",
                    icon: "cil-wc",
                    sidebar: false
                },
            ]
        }
    ]
}