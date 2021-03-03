import Admin from '../../../views/layouts/Admin'
import React from "react";
import InfoCard from "../../../views/components/Widgets/InfoCard";
import ApiConfig from "../../../config/api-config";
import {setBreadcrumbsPageNameAction} from "../../../library/redux/actions/breadcrumbs-actions";

const Dashboard = (props) => {
    Dashboard.PageName = "dashboard";
    setBreadcrumbsPageNameAction(Dashboard.PageName)

    return (
        <Admin pageName={Dashboard.PageName}>
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
        </Admin>
    )
}
export default Dashboard;