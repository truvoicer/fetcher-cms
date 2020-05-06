import {SidebarConfig} from '../../config/sidebar-config'
import {SiteConfig} from '../../config/site-config'
import {getSessionObject} from '../../library/session/authenticate'
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Router} from 'next/router'
import Link from "next/link";

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            session: {}
        }
    }

    componentDidMount() {
        this.setState({
            session: getSessionObject()
        })
    }

    ListItems() {
        return SidebarConfig.items.map(function (item, index) {
            let subItems;
            if (typeof item.subs != "undefined") {
                subItems = item.subs.map((subItem, subIndex) => {
                    return (
                        <Link href={subItem.route} as={subItem.route}>
                            <a className={"collapse-item"}>{subItem.label}</a>
                        </Link>
                    )
                })
            }
            return (
                <li className={"nav-item"}>
                    <Link href={item.route} as={item.route}>
                        <a className={"nav-link collapsed"}>{item.label}</a>
                    </Link>
                    {subItems &&
                    <div className={"bg-white py-2 collapse-inner rounded"}>
                        {subItems}
                    </div>
                    }
                </li>
            )
        })
    }

    render() {
        return (
            <Nav defaultActiveKey="/admin/dashboard" className="flex-column"
                 bsPrefix="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">

                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/admin/dashboard">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">{SiteConfig.siteName}</div>
                </a>

                <div className="sidebar-heading">
                    {this.state.session.username}
                </div>
                <ul>
                    <this.ListItems></this.ListItems>
                </ul>
            </Nav>
        )
    }
}

export default Sidebar