import {Routes} from '../../../config/routes'
import {SiteConfig} from '../../../config/site-config'
import {checkAccessControl, getRouteItem, getSessionObject} from '../../../library/session/authenticate'
import Link from "next/link";
import React, {useContext} from "react";
import {UserContext} from "../Context/UserContext";
import SearchComponent from "../Search/SearchComponent";

const Sidebar = (props) => {
    const userContext = useContext(UserContext);

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

    const ListItems = () => {
        return Routes.items.map(function (item, index) {
            if(checkAccessControl(getRouteItem(Routes.items, item.name), userContext.user)) {
                let i = 0;
                return (
                    <div key={index.toString()}>
                        {item.heading &&
                        <li className="c-sidebar-nav-title" key={"sidebar_heading_" + i.toString()}>{item.heading}</li>
                        }
                        {item.sidebar &&
                        <li className={item.subs ? "c-sidebar-nav-dropdown" : "c-sidebar-nav-item"}>
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

            <SearchComponent />
            <GetSidebarNav/>
        </div>
    )

}
export default Sidebar