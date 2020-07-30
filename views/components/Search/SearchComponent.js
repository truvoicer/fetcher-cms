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
            console.log(this.state)
            return false;
        }
    }

    getListData(data) {
        return data.items.map((item, index) => {
            switch (data.type) {
                case "providers":
                    return {
                        name: item.provider_name,
                        label: item.provider_label,
                        data: item
                    }
                case "service_requests":
                    return {
                        name: item.service_request_name,
                        label: item.service_request_label,
                        data: item
                    }
                case "categories":
                    return {
                        name: item.category_name,
                        label: item.category_label,
                        data: item
                    }
                case "services":
                    return {
                        name: item.service_name,
                        label: item.service_label,
                        data: item
                    }
                default:
                    return null;
            }
        });
    }

    getItemRouteUrl(item) {

        return item.route;
    }

    subItemsHtml(item, index) {
        console.log(item)
        return (
                <li key={index.toString()}>
                    <a href={this.getItemRouteUrl(item)}>{item.label}</a>
                </li>
        )
    }

    buildSubItems(routeItem) {
        if (isSet(routeItem.subs)) {
            return routeItem.subs.map((item, index) => {
                if (isSet(item.subs)) {
                    return this.buildSubItems(item)
                }
                return this.subItemsHtml(item, index)
            });
        }
    }

    listItemHandler(item, e) {
        e.preventDefault()
        console.log(item)
        this.setState({
            showListSubItems: true,
            subListItemName: item.name,
            listSubItems: this.buildSubItems(this.state.routeItem)
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
                                                (this.state.showListSubItems && this.state.subListItemName !== item.name? " hover" : "")
                                    }
                                        key={index.toString()}
                                        onClick={this.listItemHandler.bind(this, item)}
                                        // onMouseOver={this.listItemHandler.bind(this, item)}>
                                        >
                                        <a className={"admin-search--results--list--item--label"}
                                        >{item.label}</a>
                                        {this.state.showListSubItems && this.state.subListItemName === item.name &&

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
