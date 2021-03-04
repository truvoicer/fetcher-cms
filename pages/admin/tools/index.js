import SidebarLayout from '../../../views/layouts/SidebarLayout'
import React, {useEffect} from "react";
import {setBreadcrumbsPageNameAction} from "../../../library/redux/actions/breadcrumbs-actions";
import {UserProfilePageName} from "../profile/manage";

export const ToolsPagePageName = "tools";
const Tools = (props) => {

    useEffect(() => {
        setBreadcrumbsPageNameAction(ToolsPagePageName)
    }, []);

    return (
        <SidebarLayout pageName={ToolsPagePageName}>
            <>
                <div className="row">
                    <div className="col-sm-12">
                        <h1>Tools</h1>
                    </div>
                </div>
            </>
        </SidebarLayout>
    )
}
export default Tools;