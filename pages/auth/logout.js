import axios from 'axios';

import Authenticate from "../../library/api/authenticate";

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.authenticate = new Authenticate();
        this.authenticate.logout();
    }
    componentDidMount() {
    }
}