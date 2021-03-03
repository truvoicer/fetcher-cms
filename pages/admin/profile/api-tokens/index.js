import React, {useEffect, useState} from "react";
import Admin from "../../../../views/layouts/Admin";
import Col from "react-bootstrap/Col";
import {formatDate, isObjectEmpty, isSet} from "../../../../library/utils";
import ApiTokensTable from "../../../../views/components/Tables/ApiTokensTable";
import {
    SESSION_AUTHENTICATED,
    SESSION_AUTHENTICATING,
    SESSION_STATE_KEY,
    SESSION_USER
} from "../../../../library/redux/constants/session-constants";
import {connect} from "react-redux";
import {
    setBreadcrumbsDataAction,
    setBreadcrumbsPageNameAction
} from "../../../../library/redux/actions/breadcrumbs-actions";


export const UserApiTokensPageName = "api_tokens";
const ApiTokens = ({session}) => {
    useEffect(() => {
        if (!session[SESSION_AUTHENTICATING] && session[SESSION_AUTHENTICATED] && !isObjectEmpty(session[SESSION_USER])) {
            setBreadcrumbsPageNameAction(UserApiTokensPageName);
            setBreadcrumbsDataAction({
                user: {
                    id: session[SESSION_USER].id,
                    name: session[SESSION_USER].username
                }
            });
        }
    }, [session, session[SESSION_AUTHENTICATING], session[SESSION_AUTHENTICATED]])
    return (

        <Admin pageName={UserApiTokensPageName}>
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
