
import {withRouter} from "next/router";
import Admin from '../../../views/layouts/Admin'

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.props = props;
    }
    componentDidMount() {

        
    }
    render() {
        return (
            <Admin>
                <>
                    <h1>Dashboard</h1>
                </>
            </Admin>
        )
    }
}