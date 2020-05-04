
import {withRouter} from "next/router";
import AdminLayout from '../../../layouts/AdminLayout'

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.props = props;
    }
    componentDidMount() {

        
    }
    render() {
        return (
            <AdminLayout>
                <>
                    <h1>Dashboard</h1>
                </>
            </AdminLayout>
        )
    }
}