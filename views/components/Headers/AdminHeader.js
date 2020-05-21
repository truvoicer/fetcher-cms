import {NavbarConfig} from '../../../config/navbar-config'
import {getSessionObject} from '../../../library/session/authenticate';
import Link from "next/link";
import {useContext} from "react";
import {UserContext} from "../Context/UserContext";

class AdminHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            session: getSessionObject(),
            userDropdownClass: ""
        }
        this.getUsername = this.getUsername.bind(this);
    }

    componentDidMount() {
    }

    showUserDropdown(e) {
        e.preventDefault();
        let ele = document.getElementById("userDropdownList")
        if (ele.classList.contains("show")) {
            ele.classList.remove("show")
        } else {
            ele.classList.add("show");
        }
    }

    ListItems() {
        return NavbarConfig.items.map(function (item, index) {
            return (
                <Link href={item.route} as={item.route}  key={index.toString()}>
                    <a className="dropdown-item">
                        <i className={item.icon}></i>
                        {item.label}
                    </a>
                </Link>
            )
        }.bind(this))
    }

    getUsername() {
        if (this.context.authenticated) {
            return this.context.user.username;
        }
    }
    render() {
        return (
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                </button>

                <form
                    className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                               aria-label="Search" aria-describedby="basic-addon2"/>
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <i className="fas fa-search fa-sm"></i>
                            </button>
                        </div>
                    </div>
                </form>

                <ul className="navbar-nav ml-auto">

                    <li className="nav-item dropdown no-arrow d-sm-none">
                        <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-search fa-fw"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                             aria-labelledby="searchDropdown">
                            <form className="form-inline mr-auto w-100 navbar-search">
                                <div className="input-group">
                                    <input type="text" className="form-control bg-light border-0 small"
                                           placeholder="Search for..." aria-label="Search"
                                           aria-describedby="basic-addon2"/>
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>
                    <div className="topbar-divider d-none d-sm-block"></div>
                    <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown"
                           onClick={this.showUserDropdown}>
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{this.getUsername()}</span>
                            <img className="img-profile rounded-circle"
                                 src="https://source.unsplash.com/QAB-WJcbgJk/60x60"/>
                        </a>
                        <div id={"userDropdownList"} className={"dropdown-menu dropdown-menu-right shadow animated--grow-in"}
                             aria-labelledby="userDropdown">
                            <this.ListItems/>
                        </div>
                    </li>

                </ul>

            </nav>
        )
    }
}
AdminHeader.contextType = UserContext;
export default AdminHeader;