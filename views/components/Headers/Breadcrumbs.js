import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Routes} from '../../../config/routes'
import {BreadcrumbsContext} from "../Context/BreadcrumbsContext";

class Breadcrumbs extends React.Component {

    constructor(props) {
        super(props)
        this.parents = [];
        this.buildBreadcrumbsItems = this.buildBreadcrumbsItems.bind(this);
        this.getRouteItem = this.getRouteItem.bind(this);
        this.getRouteList = this.getRouteList.bind(this);
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
    getRouteList() {
        let pageList = [];
        let currentPage = this.getRouteItem(Routes.items, this.context.pageName);
        if (typeof currentPage !== "undefined") {
            currentPage.active = true;
            pageList.push(currentPage);
            while (currentPage.parent !== "self") {
                currentPage = this.getRouteItem(Routes.items, currentPage.parent);
                pageList.push(currentPage);
            }
            return pageList;
        }
        return [];
    }

    buildBreadcrumbsItems() {
        if (typeof this.context !== "undefined") {
            let list = this.getRouteList();
            return list.slice(0).reverse().map((item, index) => {
                return (
                    <>
                        {item.active
                            ? <Breadcrumb.Item active href={item.route}>{item.label}</Breadcrumb.Item>
                            : <Breadcrumb.Item href={item.route}>{item.label}</Breadcrumb.Item>
                        }

                    </>
                )
            })
        }
        return null
    }

    render() {
        return (
            <div className="c-subheader px-3">
                <ol className="breadcrumb border-0 m-0">
                    <this.buildBreadcrumbsItems/>
                </ol>
            </div>
        )
    }
}

Breadcrumbs.contextType = BreadcrumbsContext;
export default Breadcrumbs