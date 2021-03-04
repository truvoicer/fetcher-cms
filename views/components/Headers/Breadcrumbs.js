import {Routes} from '../../../config/routes'
import {BreadcrumbsContext} from "../Context/BreadcrumbsContext";
import {getRouteItem} from "../../../library/session/authenticate";
import {isSet} from "../../../library/utils";
import React, {useContext, useEffect, useState} from "react";
import ProviderRequests, {ProviderRequestsPageName} from "../../../pages/admin/providers/[provider_id]/requests";
import {SESSION_STATE_KEY} from "../../../library/redux/constants/session-constants";
import {connect} from "react-redux";
import {
    BREADCRUMBS_DATA,
    BREADCRUMBS_PAGE_NAME,
    BREADCRUMBS_STATE_KEY
} from "../../../library/redux/constants/breadcrumbs-constants";

const vsprintf = require("sprintf-js").vsprintf;

const Breadcrumbs = ({breadcrumbs}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState("");
    const [dropDownItems, setDropDownItems] = useState([]);

    const setPageHref = (page) => {
        if (typeof breadcrumbs[BREADCRUMBS_DATA] === "undefined") {
            return page;
        }
        if (typeof breadcrumbs[BREADCRUMBS_DATA][page.name] === "undefined") {
            return page;
        }
        page.route = vsprintf(page.route, breadcrumbs[BREADCRUMBS_DATA]);
        page.itemName = breadcrumbs[BREADCRUMBS_DATA][page.name].name;
        return page;
    }

    const getRouteList = () => {
        let pageList = [];
        let currentPage = getRouteItem(Routes.items, breadcrumbs[BREADCRUMBS_PAGE_NAME]);
        if (typeof currentPage !== "undefined") {
            currentPage.active = true;
            pageList.push(setPageHref(currentPage));
            while (currentPage.parent !== "self") {
                currentPage = getRouteItem(Routes.items, currentPage.parent);
                pageList.push(setPageHref(currentPage));
            }
            return pageList;
        }
        return [];
    }
    const getDropdownItem = (item) => {
        return {
            label: item.label,
            name: item.name,
            href: vsprintf(item.route, breadcrumbs[BREADCRUMBS_DATA])
        }
    }
    const itemClickHandler = (item, e) => {
        if (item.name === ProviderRequestsPageName) {
            e.preventDefault();
        } else {
            return true;
        }
        if (showDropdown) {
            setShowDropdown(false)
            return false;
        }
        let currentPage = getRouteItem(Routes.items, breadcrumbs[BREADCRUMBS_PAGE_NAME]);
        let getParent = getRouteItem(Routes.items, currentPage.parent)
        if (!isSet(getParent.subs)) {
            return false;
        }
        let dropDownItems = getParent.subs.map((item, index) => {
            return getDropdownItem(item)
        });
        dropDownItems.push(getDropdownItem(getParent))

        setShowDropdown(true);
        setActiveDropdown(item.name);
        setDropDownItems(dropDownItems);
    }

    return (
        <div className="c-subheader px-3">
            <ol className="breadcrumb border-0 m-0">
                {getRouteList().slice(0).reverse().map((item, index) => (
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
                                   onClick={itemClickHandler.bind(this, item)}
                                   className={item.name === ProviderRequestsPageName ? "dropdown-toggle" : ""}>
                                    {item.label} {item.itemName ? " (" + item.itemName + ")" : ""}
                                </a>
                                <div
                                    className={"dropdown-menu" + (showDropdown && activeDropdown === item.name ? " show" : "")}
                                    aria-labelledby="dropdownMenuLink">
                                    {dropDownItems.map((item, index) => (
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
function mapStateToProps(state) {
    return {
        breadcrumbs: state[BREADCRUMBS_STATE_KEY]
    };
}

export default connect(
    mapStateToProps,
    null
)(Breadcrumbs);