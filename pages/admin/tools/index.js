import Admin from '../../../views/layouts/Admin'
import React from "react";

export const ToolsPagePageName = "tools";
const Tools = (props) => {
    const getBreadcrumbsConfig = () => {
        return {
            pageName: ToolsPagePageName
        }
    }
    return (
        <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={ToolsPagePageName}>
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