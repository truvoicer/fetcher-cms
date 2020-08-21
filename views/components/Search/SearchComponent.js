import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import ApiConfig from "../../../config/api-config"

const sprintf = require("sprintf-js").sprintf;
import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import {isSet} from "../../../library/utils";
import {getRouteItem} from "../../../library/session/authenticate";
import {Routes} from "../../../config/routes";
import ManageProviders from "../../../pages/admin/providers";
import ProviderRequests from "../../../pages/admin/providers/[provider_id]/requests";
import Categories from "../../../pages/admin/categories";
import ManageServices from "../../../pages/admin/services";

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: "search",
            query: "",
            showSearchResults: false,
            searchResults: [],
            routeItem: {},
            showListSubItems: false,
            subListItemName: "",
            listSubItems: []
        }
        this.formChangeHandler = this.formChangeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        this.searchRequestCallback = this.searchRequestCallback.bind(this)
    }

    componentDidMount() {

    }

    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

        if (isSet(e.target.value) && e.target.value !== "") {
            responseHandler(fetchData(sprintf(ApiConfig.endpoints.search, e.target.value), false), this.searchRequestCallback);
            return true;
        } else {
            this.setState({
                showSearchResults: false
            })
        }
    }

    submitHandler(e) {
        e.preventDefault();
        if (!isSet(this.state.query) || this.state.query === "") {
            return false;
        }
        responseHandler(fetchData(sprintf(ApiConfig.endpoints.search, this.state.query), false), this.searchRequestCallback);
    }

    searchRequestCallback(status, message, data = null) {
        // console.log(status, message, data)
        if (status === 200 &&
            isSet(data.data.items) &&
            data.data.items.length > 0) {
            this.setState({
                showSearchResults: true,
                searchResults: this.getListData(data.data),
                routeItem: getRouteItem(Routes.items, data.data.type)
            })
            // console.log(this.state)
            return false;
        }
    }

    buildDataObject(data, type) {
        let dataObject = {};
        dataObject[type] = {};
        Object.keys(data).map((key) => {
            if (Array.isArray(data[key]) || typeof data[key] === "object" && data[key] !== null) {
                dataObject[key] = data[key];
            } else {
                dataObject[type][key] = data[key]
            }
        })
        // console.log(dataObject)
        return dataObject;
    }

    getItemKey(name, id) {
        return sprintf("key-%s-%s", name, id.toString())
    }

    getListData(data) {
        return data.items.map((item, index) => {
            switch (data.type) {
                case "provider":
                    return {
                        key: this.getItemKey(item.provider_name, item.id),
                        name: item.provider_name,
                        label: item.provider_label,
                        data: this.buildDataObject(item, data.type)
                    }
                case "service_requests":
                    return {
                        key: this.getItemKey(item.service_request_name, item.id),
                        name: item.service_request_name,
                        label: sprintf("(%s): %s", item.provider.provider_label, item.service_request_label),
                        data: this.buildDataObject(item, data.type)
                    }
                case "categories":
                    return {
                        key: this.getItemKey(item.category_name, item.id),
                        name: item.category_name,
                        label: item.category_label,
                        data: this.buildDataObject(item, data.type)
                    }
                case "services":
                    return {
                        key: this.getItemKey(item.service_name, item.id),
                        name: item.service_name,
                        label: item.service_label,
                        data: this.buildDataObject(item, data.type)
                    }
                default:
                    return null;
            }
        });
    }

    getItemRouteUrl(data, item) {
        // console.log(data.data)
        return sprintf(item.route, data.data);
    }

    subItemsHtml(data, item, index) {
        // console.log(item.label, data, item)
        return (
                <li key={index.toString()}>
                    <a href={this.getItemRouteUrl(data, item)}>{item.label}</a>
                </li>
        )
    }

    buildSubItems(routeItem, data) {
        if (isSet(routeItem.subs)) {
            return routeItem.subs.map((item, index) => {
                if(routeItem.name === item.parent) {
                    return this.subItemsHtml(data, item, index)
                }
            });
        }
    }

    listItemHandler(item, e) {
        e.preventDefault()

        this.setState({
            showListSubItems: true,
            subListItemKey: item.key,
            listSubItems: this.buildSubItems(this.state.routeItem, item)
        })
    }

    render() {
        return (
            <div className={"admin-search"}>
                <Form onSubmit={this.submitHandler}>
                    <Form.Group controlId="formSearchInput">
                        <Form.Control type="text"
                                      placeholder="Enter search query."
                                      onChange={this.formChangeHandler}
                                      name="query"
                                      value={this.state.query}/>
                        {this.state.showSearchResults &&
                        <div className={"admin-search--results"}>
                            <ul className={"admin-search--results--list"}>
                                {this.state.searchResults.map((item, index) => (
                                    <li className={"admin-search--results--list--item" +
                                                (!this.state.showListSubItems? " hover" : "") +
                                                (this.state.showListSubItems && this.state.subListItemKey !== item.key? " hover" : "")
                                    }
                                        key={index.toString()}
                                    >
                                        <a className={"admin-search--results--list--item--label"}
                                           onClick={this.listItemHandler.bind(this, item)}>{item.label}</a>
                                        {this.state.showListSubItems && this.state.subListItemKey === item.key &&

                                        <ul className={"admin-search--results--list--subs"}>
                                            {this.state.listSubItems}
                                        </ul>
                                        }
                                    </li>
                                ))}
                            </ul>
                        </div>
                        }
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default SearchComponent;
