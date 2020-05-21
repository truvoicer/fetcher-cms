import {authenticateUser, getApiUser, setSession} from "../library/session/authenticate";
import Router from "next/router";
import React from "react";
import {responseHandler} from "../library/api/middleware";
// import {UserContext} from "./components/Context/UserContext";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id={"app"}>
                {this.props.children}
            </div>
        )
    }
}
export default App;