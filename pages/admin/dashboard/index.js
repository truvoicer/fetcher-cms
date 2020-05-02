
import {withRouter} from "next/router";
import AdminLayout from '../../../layouts/AdminLayout'

const { getApiUser, isAuthenticated } = require("../../../library/api/authenticate")

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        if(!isAuthenticated()) {
            window.location.replace("/auth/login")
        }
        const apiuser = getApiUser();
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