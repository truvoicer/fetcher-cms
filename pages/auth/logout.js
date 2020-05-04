import axios from 'axios';

import Authenticate from "../../library/session/authenticate";

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.authenticate = new Authenticate();
        this.authenticate.logout();
    }
    componentDidMount() {
    }
}