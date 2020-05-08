
import {withRouter} from "next/router";
import AdminLayout from '../../../layouts/AdminLayout'

export default class CreateProvider extends React.Component {
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
                    <h1>Create Providers</h1>
                </>
            </AdminLayout>
        )
    }
}