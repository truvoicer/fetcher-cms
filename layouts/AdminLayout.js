import AdminHeader from '../components/Headers/AdminHeader'
import AdminSidebar from '../components/Sidebars/AdminSidebar'
import AdminFooter from '../components/Footers/AdminFooter'
import Breadcrumbs from "../components/Headers/Breadcrumbs";

class AdminLayout extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
    }


    render() {
        return (
            <div id="wrapper">
                <AdminSidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <AdminHeader />
                        <div className="container-fluid">
                            <Breadcrumbs />
                            {this.props.children}
                        </div>
                    </div>
                    <AdminFooter />
                </div>
            </div>
        )
    }
}
export default AdminLayout;