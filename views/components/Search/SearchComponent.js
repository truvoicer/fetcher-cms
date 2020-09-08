import React, {Component, useState} from 'react';
import Form from "react-bootstrap/Form";
import ApiConfig from "../../../config/api-config"
import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import {isSet} from "../../../library/utils";
import {getRouteItem} from "../../../library/session/authenticate";
import {Routes} from "../../../config/routes";
const sprintf = require("sprintf-js").sprintf;

const SearchComponent = (props) => {

    const [query, setQuery] = useState("");
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [routeItem, setRouteItem] = useState({});
    const [showListSubItems, setShowListSubItems] = useState(false);
    const [subListItemKey, setSubListItemKey] = useState("");
    const [listSubItems, setListSubItems] = useState([]);


    const formChangeHandler = (e) => {
        setQuery(e.target.value)

        if (isSet(e.target.value) && e.target.value !== "") {
            responseHandler(fetchData(sprintf(ApiConfig.endpoints.search, e.target.value), false), searchRequestCallback);
            return true;
        } else {
            setShowSearchResults(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (!isSet(query) || query === "") {
            return false;
        }
        responseHandler(fetchData(sprintf(ApiConfig.endpoints.search, query), false), searchRequestCallback);
    }

    const searchRequestCallback = (status, message, data = null) => {
        // console.log(status, message, data)
        if (status === 200 &&
            isSet(data.data.items) &&
            data.data.items.length > 0) {

            setShowSearchResults(true);
            setSearchResults(getListData(data.data));
            setRouteItem(getRouteItem(Routes.items, data.data.type));
            return false;
        }
    }

    const buildDataObject = (data, type) => {
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

    const getItemKey = (name, id) => {
        return sprintf("key-%s-%s", name, id.toString())
    }

    const getListData = (data) => {
        return data.items.map((item, index) => {
            switch (data.type) {
                case "provider":
                    return {
                        key: getItemKey(item.provider_name, item.id),
                        name: item.provider_name,
                        label: item.provider_label,
                        data: buildDataObject(item, data.type)
                    }
                case "service_requests":
                    return {
                        key: getItemKey(item.service_request_name, item.id),
                        name: item.service_request_name,
                        label: sprintf("(%s): %s", item.provider.provider_label, item.service_request_label),
                        data: buildDataObject(item, data.type)
                    }
                case "categories":
                    return {
                        key: getItemKey(item.category_name, item.id),
                        name: item.category_name,
                        label: item.category_label,
                        data: buildDataObject(item, data.type)
                    }
                case "services":
                    return {
                        key: getItemKey(item.service_name, item.id),
                        name: item.service_name,
                        label: item.service_label,
                        data: buildDataObject(item, data.type)
                    }
                default:
                    return null;
            }
        });
    }

    const getItemRouteUrl = (data, item) => {
        // console.log(data.data)
        return sprintf(item.route, data.data);
    }

    const subItemsHtml = (data, item, index) => {
        // console.log(item.label, data, item)
        return (
                <li key={index.toString()}>
                    <a href={getItemRouteUrl(data, item)}>{item.label}</a>
                </li>
        )
    }

    const buildSubItems = (routeItem, data) => {
        if (isSet(routeItem.subs)) {
            return routeItem.subs.map((item, index) => {
                if(routeItem.name === item.parent) {
                    return subItemsHtml(data, item, index)
                }
            });
        }
    }

    const listItemHandler = (item, e) => {
        e.preventDefault()
        setShowListSubItems(true);
        setSubListItemKey(item.key);
        setListSubItems(buildSubItems(routeItem, item));
    }

        return (
            <div className={"admin-search"}>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="formSearchInput">
                        <Form.Control type="text"
                                      placeholder="Enter search query."
                                      onChange={formChangeHandler}
                                      name="query"
                                      value={query}/>
                        {showSearchResults &&
                        <div className={"admin-search--results"}>
                            <ul className={"admin-search--results--list"}>
                                {searchResults.map((item, index) => (
                                    <li className={"admin-search--results--list--item" +
                                                (!showListSubItems? " hover" : "") +
                                                (showListSubItems && subListItemKey !== item.key? " hover" : "")
                                    }
                                        key={index.toString()}
                                    >
                                        <a className={"admin-search--results--list--item--label"}
                                           onClick={listItemHandler.bind(this, item)}>{item.label}</a>
                                        {showListSubItems && subListItemKey === item.key &&

                                        <ul className={"admin-search--results--list--subs"}>
                                            {listSubItems}
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

export default SearchComponent;
