import {Routes} from '../../../config/routes'
import {SiteConfig} from '../../../config/site-config'
import {checkAccessControl, getRouteItem} from '../../../library/session/authenticate'
import Link from "next/link";
import React, {useEffect, useState} from "react";
import SearchComponent from "../Search/SearchComponent";
import {
    SESSION_AUTHENTICATED,
    SESSION_AUTHENTICATING,
    SESSION_STATE_KEY, SESSION_USER
} from "../../../library/redux/constants/session-constants";
import {connect} from "react-redux";
import {isNotEmpty, isObjectEmpty} from "../../../library/utils";

const Sidebar = ({session, pageName}) => {
    const [showSidebar, setShowSidebar] = useState(false);

    const menuClick = (e) => {
        if (e.target.classList.contains("c-linkable")) {
            return null;
        }
        e.preventDefault();
        let parent = e.target.parentNode;
        if (parent.classList.contains("c-show")) {
            parent.classList.remove("c-show");
        } else {
            parent.classList.add("c-show");
        }
    }

    const GetSidebarNav = () => {
        return (
            <ul className="c-sidebar-nav">
                <ListItems/>
            </ul>
        )
    }

    useEffect(() => {
        if (!session[SESSION_AUTHENTICATING] && session[SESSION_AUTHENTICATED] && !isObjectEmpty(session[SESSION_USER])) {
            setShowSidebar(true);
        }
    }, [session, session[SESSION_AUTHENTICATING], session[SESSION_AUTHENTICATED]])

    const getCurrentRoute = getRouteItem(Routes.items, pageName)
    const getParentRoute = getRouteItem(Routes.items, getCurrentRoute.parent)

    const ListItems = () => {
        return Routes.items.map(function (item, index) {
            if (checkAccessControl(getRouteItem(Routes.items, item.name), session[SESSION_USER])) {
                let i = 0;
                let expand = false;
                if (isNotEmpty(getParentRoute?.name) && item.name === getParentRoute.name) {
                    expand = true;
                }
                return (
                    <div key={index.toString()}>
                        {item.heading &&
                        <li className="c-sidebar-nav-title" key={"sidebar_heading_" + i.toString()}>{item.heading}</li>
                        }
                        {item.sidebar &&
                        <li className={item.subs ? `c-sidebar-nav-dropdown ${expand? "c-show" : ""}` : "c-sidebar-nav-item"}>
                            <Link href={item.route} as={item.route}>
                                <a className={item.subs
                                    ? "c-sidebar-nav-dropdown-toggle"
                                    : "c-sidebar-nav-link c-linkable"
                                }
                                   id={item.name}
                                   onClick={menuClick}>
                                    <svg className="c-sidebar-nav-icon">
                                        <use xlinkHref={"/images/icons/sprites/free.svg#" + item.icon}/>
                                    </svg>
                                    {item.label}
                                </a>
                            </Link>
                            {item.subs &&
                            <ul className="c-sidebar-nav-dropdown-items">
                                <li className="c-sidebar-nav-item">
                                    {item.subs.map((subItem, subIndex) => (
                                        subItem.sidebar &&
                                        <Link href={subItem.route} as={subItem.route}
                                              key={"sublistlink" + subIndex.toString()}>
                                            <a className="c-sidebar-nav-link">
                                                <svg className="c-sidebar-nav-icon">
                                                    <use xlinkHref={"/images/icons/sprites/free.svg#" + subItem.icon}/>
                                                </svg>
                                                {subItem.label}
                                            </a>
                                        </Link>

                                    ))}
                                </li>
                            </ul>
                            }
                        </li>
                        }
                    </div>
                )
            }
        })
    }
    return (
        <div className="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show" id="sidebar">
            <div className="c-sidebar-brand d-lg-down-none">
                {SiteConfig.siteName}
            </div>
            {showSidebar &&
            <>
                <SearchComponent/>
                <GetSidebarNav/>
            </>
            }
        </div>
    )

}

function mapStateToProps(state) {
    return {
        session: state[SESSION_STATE_KEY],
    };
}

export default connect(
    mapStateToProps,
    null
)(Sidebar);