import React, {useEffect, useState} from "react";
import {fetchRequest} from "../../../library/api/fetcher-api/fetcher-middleware";

const InfoCard = (props) => {

    const [listData, setListData] = useState([]);

    useEffect(() => {
        fetchRequest({
            endpoint: props.endpoint,
            onSuccess: (responseData) => {
                getDataResponseHandler(200, responseData.message, responseData)
            }
        })
    }, [props.endpoint])

    const getDataResponseHandler = (status, message, data = null) => {
        if (status === 200) {
            setListData(data.data)
        } else {
           console.error(data)
        }
    }
    return (
            <div className={"card text-white info-card " + (props.classes? props.classes : "bg-gradient-primary")}>
                <div className="card-body card-body pb-0 d-flex justify-content-between align-items-start">
                    <div>
                        <div className="text-value-lg">{listData.length}</div>
                        <div>{props.header}</div>
                    </div>
                    <div className="btn-group">
                        <button className="btn btn-transparent dropdown-toggle p-0" type="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <svg className="c-icon">
                                <use xlinkHref={"/images/icons/sprites/free.svg#cil-settings"}/>
                            </svg>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right"><a className="dropdown-item"
                                                                              href="#">Action</a><a
                            className="dropdown-item" href="#">Another action</a><a
                            className="dropdown-item" href="#">Something else here</a></div>
                    </div>
                </div>
            </div>
    );
}
export default InfoCard;