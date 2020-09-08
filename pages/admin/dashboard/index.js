import Admin from '../../../views/layouts/Admin'
import React from "react";

const Dashboard = (props) => {
    Dashboard.PageName = "dashboard";

    const getBreadcrumbsConfig = () => {
        return {
            pageName: Dashboard.PageName
        }
    }
    return (
        <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={Dashboard.PageName}>
            <>
                <h1>Dashboard</h1>
            </>
        </Admin>
    )
}
export default Dashboard;