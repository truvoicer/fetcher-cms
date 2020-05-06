import {SidebarConfig} from '../../config/sidebar-config'
import {SiteConfig} from '../../config/site-config'
import {getSessionObject} from '../../library/session/authenticate'
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Router} from 'next/router'

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            session: getSessionObject()
        }
    }

    ListItems() {
        return SidebarConfig.items.map(function (item, index) {
            if (typeof item.subs == "undefined") {
                return (
                    <Nav.Item eventkey={index} key={index}>
                        <Nav.Link href={item.route}>{item.label}</Nav.Link>
                    </Nav.Item>
                )
            } else {
                const subitems = item.subs.map((subItem, subIndex) => {
                    return (<NavDropdown.Item key={index + "." + subIndex}
                                              href={subItem.route}>{subItem.label}</NavDropdown.Item>)
                })
                return (
                    <NavDropdown title={item.label} href={item.route} id="nav-dropdown" drop="right">
                        {subitems}
                    </NavDropdown>
                )
            }


        }.bind(this))
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

                <this.ListItems></this.ListItems>
            </Nav>
        )
    }
}

export default Sidebar