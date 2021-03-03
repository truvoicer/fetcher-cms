import {Routes} from '../../../config/routes'
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import {logout} from "../../../library/session/authenticate";
import React from "react";
import {SESSION_STATE_KEY, SESSION_USER} from "../../../library/redux/constants/session-constants";
import {connect} from "react-redux";

const AdminHeader = ({session}) => {
    const logoutHandler = () => {
        logout()
    }
    const showUserDropdown = (e) => {
        e.preventDefault();
        let ele = document.getElementById("userDropdownMenu")
        if (ele.classList.contains("show")) {
            ele.classList.remove("show")
        } else {
            ele.classList.add("show");
        }
    }

    const ListItems = () => {
        return Routes.items.map(function (item, index) {
            if (item.header) {
                return (
                    <li className="c-header-nav-item px-3" key={index.toString()}>
                        <Link href={item.route} as={item.route} key={index.toString()}>
                            <a className="c-header-nav-link">{item.label}</a>
                        </Link>
                    </li>
                )
            } else {
                return null;
            }

        })
    }

        return (
            <header className="c-header c-header-light c-header-fixed c-header-with-subheader">
                <ul className="c-header-nav d-md-down-none">
                    <ListItems/>
                </ul>
                <ul className="c-header-nav ml-auto mr-4">
                    <li className="c-header-nav-item dropdown">
                        <a className="c-header-nav-link"
                           data-toggle="dropdown"
                           href="#"
                           role="button"
                           aria-haspopup="true"
                           aria-expanded="false"
                            onClick={showUserDropdown}>
                            {session[SESSION_USER]?.email || ""}
                        </a>
                        <div id={"userDropdownMenu"} className="dropdown-menu dropdown-menu-right pt-0">
                            <div className="dropdown-header bg-light py-2"><strong>Account</strong></div>
                            <a className="dropdown-item" href="#" onClick={logoutHandler}>
                                <svg className="c-icon mr-2">
                                    <use xlinkHref={"/images/icons/sprites/free.svg#cil-account-logout"}/>
                                </svg>
                                Logout
                            </a>
                        </div>
                    </li>
                </ul>
                <Breadcrumbs />
            </header>
        )
}
function mapStateToProps(state) {
    return {
        session: state[SESSION_STATE_KEY]
    };
}

export default connect(
    mapStateToProps,
    null
)(AdminHeader);