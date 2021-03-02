import React, {useEffect, useState} from "react";
import Admin from "../../../../views/layouts/Admin";
import Col from "react-bootstrap/Col";
import {formatDate, isObjectEmpty, isSet} from "../../../../library/utils";
import ApiTokensTable from "../../../../views/components/Tables/ApiTokensTable";
import {SESSION_STATE_KEY, SESSION_USER} from "../../../../library/redux/constants/session-constants";
import {connect} from "react-redux";


export const UserApiTokensPageName = "api_tokens";
const ApiTokens = ({session}) => {

    const getBreadcrumbsConfig = () => {
        return {
            pageName: UserApiTokensPageName,
            data: {
                user: {
                    id: session[SESSION_USER].id,
                    name: session[SESSION_USER].username
                }
            }
        }
    }

    return (

        <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={UserApiTokensPageName}>
            <>
                <Col sm={12} md={12} lg={12}>
                    {!isObjectEmpty(session[SESSION_USER]) &&
                        <ApiTokensTable
                            userId={session[SESSION_USER].id}
                        />
                    }
                </Col>
            </>
        </Admin>
    )
}

function mapStateToProps(state) {
    return {
        session: state[SESSION_STATE_KEY]
    };
}

export default connect(
    mapStateToProps,
    null
)(ApiTokens);
