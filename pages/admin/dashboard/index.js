import SidebarLayout from '../../../views/layouts/SidebarLayout'
import React, {useEffect} from "react";
import InfoCard from "../../../views/components/Widgets/InfoCard";
import ApiConfig from "../../../config/api-config";
import {setBreadcrumbsPageNameAction} from "../../../library/redux/actions/breadcrumbs-actions";

const Dashboard = (props) => {
    Dashboard.PageName = "dashboard";
    useEffect(() => {
        setBreadcrumbsPageNameAction(Dashboard.PageName)
    }, []);
    return (
        <SidebarLayout pageName={Dashboard.PageName}>
            <>
                <div className="row">
                    <div className="col-sm-6 col-lg-3">
                        <InfoCard
                            header={"Active Providers"}
                            classes={"bg-gradient-primary"}
                            endpoint={ApiConfig.endpoints.providerList}
                        />
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <InfoCard
                            header={"Active Categories"}
                            classes={"bg-gradient-danger"}
                            endpoint={ApiConfig.endpoints.categoryList}
                        />
                    </div>
                </div>
            </>
        </SidebarLayout>
    )
}
export default Dashboard;