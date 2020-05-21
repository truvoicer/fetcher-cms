import {Routes} from '../../../config/routes'
import {SiteConfig} from '../../../config/site-config'
import {getSessionObject} from '../../../library/session/authenticate'
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Router} from 'next/router'
import Link from "next/link";

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            session: {},
            subMenu: ""
        }
        this.menuClick = this.menuClick.bind(this)
        this.ListItems = this.ListItems.bind(this)
    }

    componentDidMount() {
        this.setState({
            session: getSessionObject()
        })
    }

    menuClick(e) {
        e.preventDefault();
        if (this.state.subMenu === e.target.id) {
            this.setState({
                subMenu: ""
            })
        } else {
            this.setState({
                subMenu: e.target.id
            })
        }
    }

    ListItems() {
        return Routes.items.map(function (item, index) {
            let subItems;
            if (typeof item.subs != "undefined") {
                subItems = item.subs.map((subItem, subIndex) => {
                    let itemKey = index + "." + subIndex;
                    return (
                        <Link href={subItem.route} as={subItem.route} key={itemKey}>
                            <a className={"collapse-item"} key={itemKey}>{subItem.label}</a>
                        </Link>
                    )
                })
            }
            return (
                <div key={index.toString()}>
                    {item.heading &&
                    <div className="sidebar-heading">
                        {item.heading}
                    </div>
                    }
                    <li className={"nav-item"} key={index.toString()}>
                        <Link href={item.route} as={item.route}>
                            <a className="nav-link collapsed"
                               href="#"
                               id={item.name}

                               onClick={this.menuClick}>
                                <i className={item.icon}></i>
                                <span>{item.label}</span>
                            </a>
                        </Link>
                        {subItems &&

                        <div className={this.state.subMenu === item.name ? "collapse show" : "collapse"}>
                            <div className="bg-white py-2 collapse-inner rounded"
                                 aria-labelledby="headingTwo"
                                 data-parent={item.name}>
                                {subItems}
                            </div>
                        </div>
                        }
                    </li>
                </div>
            )
        }.bind(this))
    }

    render() {
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <Link href={SiteConfig.adminHome} as={SiteConfig.adminHome}>
                    <a className="sidebar-brand d-flex align-items-center justify-content-center" key={50}>
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-laugh-wink"></i>
                        </div>
                        <div className="sidebar-brand-text mx-3">{SiteConfig.siteName}</div>
                    </a>
                </Link>

                <hr className="sidebar-divider my-0"/>

                <this.ListItems></this.ListItems>
            </ul>
        )
    }
}

export default Sidebar