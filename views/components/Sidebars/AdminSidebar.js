import {Routes} from '../../../config/routes'
import {SiteConfig} from '../../../config/site-config'
import {getSessionObject} from '../../../library/session/authenticate'
import Link from "next/link";
import React from "react";

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sidebarNav: []
        }
        this.menuClick = this.menuClick.bind(this)
        this.getSidebarNav = this.getSidebarNav.bind(this)
        this.ListItems = this.ListItems.bind(this)
    }

    componentDidMount() {
    }

    menuClick(e) {
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

    getSidebarNav() {
        return (
            <ul className="c-sidebar-nav">
                <this.ListItems/>
            </ul>
        )
    }

    ListItems() {
        return Routes.items.map(function (item, index) {
            let subItems;
            if (typeof item.subs != "undefined") {
                subItems = item.subs.map((subItem, subIndex) => {
                    let itemKey = index + "." + subIndex;
                    return (
                        <Link href={subItem.route} as={subItem.route} key={itemKey}>
                            <a className="c-sidebar-nav-link">
                                <svg className="c-sidebar-nav-icon">
                                    <use xlinkHref={"/images/icons/sprites/free.svg#" + subItem.icon}/>
                                </svg>
                                {subItem.label}
                            </a>
                        </Link>
                    )
                })
            }
            return (
                <>
                    {item.heading &&
                    <li className="c-sidebar-nav-title">{item.heading}</li>
                    }
                    <li className={subItems ? "c-sidebar-nav-dropdown" : "c-sidebar-nav-item"}>
                        <Link href={item.route} as={item.route}>
                            <a className={subItems
                                ? "c-sidebar-nav-dropdown-toggle"
                                : "c-sidebar-nav-link c-linkable"
                            }
                               id={item.name}
                               onClick={this.menuClick}>
                                <svg className="c-sidebar-nav-icon">
                                    <use xlinkHref={"/images/icons/sprites/free.svg#" + item.icon}/>
                                </svg>
                                {item.label}
                            </a>
                        </Link>
                        {subItems &&
                        <ul className="c-sidebar-nav-dropdown-items">
                            <li className="c-sidebar-nav-item">
                                {subItems}
                            </li>
                        </ul>
                        }
                    </li>
                </>
            )
        }.bind(this))
    }

    render() {
        return (
            <div className="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show" id="sidebar">
                <div className="c-sidebar-brand d-lg-down-none">
                    {SiteConfig.siteName}
                </div>
                <this.getSidebarNav/>
            </div>
        )
    }
}

export default Sidebar