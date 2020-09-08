import {SiteConfig} from "../../../config/site-config";
import React from "react";

const AdminFooter = (props) => {

    return (
        <footer className="c-footer">
          <div>{SiteConfig.siteName} © 2020</div>
        </footer>
    )
}
export default AdminFooter