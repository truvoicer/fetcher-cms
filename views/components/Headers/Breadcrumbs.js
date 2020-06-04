import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Routes} from '../../../config/routes'
import {BreadcrumbsContext} from "../Context/BreadcrumbsContext";

const vsprintf = require("sprintf-js").vsprintf;

class Breadcrumbs extends React.Component {

    constructor(props) {
        super(props)
        this.parents = [];
        this.getRouteItem = this.getRouteItem.bind(this);
        this.getRouteList = this.getRouteList.bind(this);
        this.setPageHref = this.setPageHref.bind(this);
    }

    componentDidMount() {

    }

    getRouteItem(items, pageName) {
        // console.log(items)
        let page;
        for (let i = 0; i < items.length; i++) {
            if (items[i].name === pageName) {
                return items[i];
            }
            if (typeof items[i].subs !== "undefined") {
                let sub = this.getRouteItem(items[i].subs, pageName);
                if (typeof sub === "object") {
                    return sub;
                }
            }
        }
    }

    setPageHref(page) {
        if (typeof this.context.data === "undefined") {
            return page;
        }
        if (typeof this.context.data[page.name] === "undefined") {
            return page;
        }
        page.route = vsprintf(page.route, this.context.data[page.name].id);
        page.itemName = this.context.data[page.name].name;
        return page;
    }

    getRouteList() {
        let pageList = [];
        let currentPage = this.getRouteItem(Routes.items, this.context.pageName);
        if (typeof currentPage !== "undefined") {
            currentPage.active = true;
            pageList.push(this.setPageHref(currentPage));
            while (currentPage.parent !== "self") {
                currentPage = this.getRouteItem(Routes.items, currentPage.parent);
                pageList.push(this.setPageHref(currentPage));
            }
            return pageList;
        }
        return [];
    }

    render() {
        return (
            <div className="c-subheader px-3">
                <ol className="breadcrumb border-0 m-0">
                    {this.getRouteList().slice(0).reverse().map((item, index) => (

                        item.active
                            ? <Breadcrumb.Item key={index.toString()} active href={item.route}>{item.label}
                                {item.itemName
                                    ? " (" + item.itemName + ")"
                                    : ""}</Breadcrumb.Item>
                            : <Breadcrumb.Item key={index.toString()} href={item.route}>{item.label}
                                {item.itemName
                                    ? " (" + item.itemName + ")"
                                    : ""}</Breadcrumb.Item>
                    ))}
                </ol>
            </div>
        )
    }
}

Breadcrumbs.contextType = BreadcrumbsContext;
export default Breadcrumbs