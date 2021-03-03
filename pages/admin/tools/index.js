import Admin from '../../../views/layouts/Admin'
import React from "react";
import {setBreadcrumbsPageNameAction} from "../../../library/redux/actions/breadcrumbs-actions";

export const ToolsPagePageName = "tools";
const Tools = (props) => {
    setBreadcrumbsPageNameAction(ToolsPagePageName)

    return (
        <Admin pageName={ToolsPagePageName}>
            <>
                <div className="row">
                    <div className="col-sm-12">
                        <h1>Tools</h1>
                    </div>
                </div>
            </>
        </Admin>
    )
}
export default Tools;