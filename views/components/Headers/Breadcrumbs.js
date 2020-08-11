import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Routes} from '../../../config/routes'
import {BreadcrumbsContext} from "../Context/BreadcrumbsContext";
import {getRouteItem} from "../../../library/session/authenticate";
import {isSet} from "../../../library/utils";
import React from "react";
import ProviderRequests from "../../../pages/admin/providers/[provider_id]/requests";

const vsprintf = require("sprintf-js").vsprintf;

class Breadcrumbs extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showDropdown: false,
            activeDropdown: "",
            dropDownItems: []
        }
        this.parents = [];
        this.getRouteList = this.getRouteList.bind(this);
        this.setPageHref = this.setPageHref.bind(this);
        this.itemClickHandler = this.itemClickHandler.bind(this);
    }

    componentDidMount() {

    }

    setPageHref(page) {
        if (typeof this.context.data === "undefined") {
            return page;
        }
        if (typeof this.context.data[page.name] === "undefined") {
            return page;
        }
        page.route = vsprintf(page.route, this.context.data);
        page.itemName = this.context.data[page.name].name;
        return page;
    }

    getRouteList() {
        let pageList = [];
        let currentPage = getRouteItem(Routes.items, this.context.pageName);
        if (typeof currentPage !== "undefined") {
            currentPage.active = true;
            pageList.push(this.setPageHref(currentPage));
            while (currentPage.parent !== "self") {
                currentPage = getRouteItem(Routes.items, currentPage.parent);
                pageList.push(this.setPageHref(currentPage));
            }
            return pageList;
        }
        return [];
    }
    getDropdownItem(item) {
        return {
            label: item.label,
            name: item.name,
            href: vsprintf(item.route, this.context.data)
        }
    }
    itemClickHandler(item, e) {
        if (item.name === ProviderRequests.pageName) {
            e.preventDefault();
        } else {
            return true;
        }
        if (this.state.showDropdown) {
            this.setState({
                showDropdown: false
            });
            return false;
        }
        let currentPage = getRouteItem(Routes.items, this.context.pageName);
        let getParent = getRouteItem(Routes.items, currentPage.parent)
        if (!isSet(getParent.subs)) {
            return false;
        }
        let dropDownItems = getParent.subs.map((item, index) => {
            return this.getDropdownItem(item)
        });
        dropDownItems.push(this.getDropdownItem(getParent))

        this.setState({
            showDropdown: true,
            activeDropdown: item.name,
            dropDownItems: dropDownItems
        })
    }

    render() {
        return (
            <div className="c-subheader px-3">
                <ol className="breadcrumb border-0 m-0">
                    {this.getRouteList().slice(0).reverse().map((item, index) => (
                        <li key={index.toString()}
                            className={"breadcrumb-item" + (item.active ? " active" : "")}
                            aria-current="page">
                            {item.active ?
                                <>
                                    {item.label} {item.itemName ? " (" + item.itemName + ")" : ""}
                                </>
                                :
                                <div className={"dropdown"}>
                                    <a href={item.route}
                                       onClick={this.itemClickHandler.bind(this, item)}
                                       className={item.name === ProviderRequests.pageName? "dropdown-toggle" : ""}>
                                        {item.label} {item.itemName ? " (" + item.itemName + ")" : ""}
                                    </a>
                                    <div
                                        className={"dropdown-menu" + (this.state.showDropdown && this.state.activeDropdown === item.name ? " show" : "")}
                                        aria-labelledby="dropdownMenuLink">
                                        {this.state.dropDownItems.map((item, index) => (
                                            <a className="dropdown-item" key={index.toString()}
                                               href={item.href}>{item.label}</a>
                                        ))}
                                    </div>
                                </div>
                            }
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

Breadcrumbs.contextType = BreadcrumbsContext;
export default Breadcrumbs