export const userRolesOptions = [
    {
        value: "ROLE_SUPER_ADMIN",
        label: "ROLE_SUPER_ADMIN"
    },
    {
        value: "ROLE_ADMIN",
        label: "ROLE_ADMIN"
    },
    {
        value: "ROLE_USER",
        label: "ROLE_USER"
    },
];

export const getRoles = (roles) => {
    return roles.map((item, index) => {
        return {
            value: item,
            label: item
        }
    })
}