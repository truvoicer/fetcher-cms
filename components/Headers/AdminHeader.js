import {NavbarConfig} from '../../config/navbar-config'
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Nav from "react-bootstrap/Nav";

import { getSessionObject } from '../../library/session/authenticate';
import {SidebarConfig} from "../../config/sidebar-config";
import NavDropdown from "react-bootstrap/NavDropdown";
import {SiteConfig} from "../../config/site-config";

class AdminHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      session: getSessionObject()
    }
  }

  componentDidMount() {

  }

    ListItems() {
        return SidebarConfig.items.map(function (item, index) {
            if (typeof item.subs == "undefined") {
                return (
                        <Nav.Link href={item.route}>{item.label}</Nav.Link>
                )
            } else {
                const subitems = item.subs.map((subItem, subIndex) => {
                    return (<NavDropdown.Item key={index + "." + subIndex}
                                              href={subItem.route}>{subItem.label}</NavDropdown.Item>)
                })
                return (
                    <NavDropdown title={item.label} href={item.route} id="nav-dropdown">
                        {subitems}
                    </NavDropdown>
                )
            }


        }.bind(this))
    }
  render() {
    return (
        <Navbar variant="dark" >
            <this.ListItems></this.ListItems>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-light">Search</Button>
            </Form>
        </Navbar>
    )
  }
}
export default AdminHeader;