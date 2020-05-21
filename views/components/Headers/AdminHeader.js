import {Routes} from '../../../config/routes'
import {getSessionObject} from '../../../library/session/authenticate';
import Link from "next/link";
import {useContext} from "react";
import {UserContext} from "../Context/UserContext";

class AdminHeader extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    showUserDropdown(e) {
        e.preventDefault();
        let ele = document.getElementById("userDropdownMenu")
        if (ele.classList.contains("show")) {
            ele.classList.remove("show")
        } else {
            ele.classList.add("show");
        }
    }

    ListItems() {
        return Routes.items.map(function (item, index) {
            if (item.header) {
                return (
                    <li className="c-header-nav-item px-3">
                        <Link href={item.route} as={item.route} key={index.toString()}>
                            <a className="c-header-nav-link">{item.label}</a>
                        </Link>
                    </li>
                )
            } else {
                return null;
            }

        }.bind(this))
    }
    render() {
        return (
            <header className="c-header c-header-light c-header-fixed c-header-with-subheader">
                <ul className="c-header-nav d-md-down-none">
                    <this.ListItems/>
                </ul>
                <ul className="c-header-nav ml-auto mr-4">
                    <li className="c-header-nav-item dropdown">
                        <a className="c-header-nav-link"
                           data-toggle="dropdown"
                           href="#"
                           role="button"
                           aria-haspopup="true"
                           aria-expanded="false"
                            onClick={this.showUserDropdown}>
                            {this.context.user.username}
                        </a>
                        <div id={"userDropdownMenu"} className="dropdown-menu dropdown-menu-right pt-0">
                            <div className="dropdown-header bg-light py-2"><strong>Account</strong></div>
                            <a className="dropdown-item" href="#">
                                <svg className="c-icon mr-2">
                                    {/*<use xlink:href="vendors/@coreui/icons/svg/free.svg#cil-account-logout"></use>*/}
                                </svg>
                                Logout
                            </a>
                        </div>
                    </li>
                </ul>
                <div className="c-subheader px-3">
                    <ol className="breadcrumb border-0 m-0">
                        <li className="breadcrumb-item">Home</li>
                        <li className="breadcrumb-item"><a href="#">Admin</a></li>
                        <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                </div>
            </header>
        )
    }
}

AdminHeader.contextType = UserContext;
export default AdminHeader;