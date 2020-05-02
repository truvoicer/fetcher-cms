import AdminHeader from '../components/Headers/Header'
import AdminSidebar from '../components/Sidebars/Sidebar'
import AdminFooter from '../components/Footers/Footer'
import ContentHeader from "../components/Headers/ContentHeader";
const { logout, isAuthenticated } = require("../library/api/authenticate")

export default class AdminLayout extends React.Component{
    constructor({children}) {
        super(children)
        this.children = children;
    }

    render() {
        return <div class="wrapper">
            <AdminHeader/>
            <AdminSidebar/>
            <div className="content-wrapper">
                <ContentHeader/>
                <section className="content">
                    <div className="container-fluid">
                        {this.children}
                    </div>
                </section>
            </div>
            <AdminFooter/>
        </div>
    }
}