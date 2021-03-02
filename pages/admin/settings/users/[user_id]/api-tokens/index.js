import React, {useEffect, useState} from "react";
import Admin from "../../../../../../views/layouts/Admin";
import Col from "react-bootstrap/Col";
import {formatDate, isObjectEmpty, isSet} from "../../../../../../library/utils";
import ApiTokensTable from "../../../../../../views/components/Tables/ApiTokensTable";
import {SESSION_STATE_KEY, SESSION_USER} from "../../../../../../library/redux/constants/session-constants";
import {connect} from "react-redux";


export const SettingsApiTokensPageName = "settings_api_tokens";
const SettingsUserApiTokens = ({session}) => {
    const getBreadcrumbsConfig = () => {
        return {
            pageName: SettingsApiTokensPageName,
            data: {
                user: {
                    id: session[SESSION_USER].id,
                    name: session[SESSION_USER].username
                }
            }
        }
    }

    return (

        <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={SettingsApiTokensPageName}>
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

export async function getStaticProps({params}) {
    return {
        props: {
            userId: params.user_id,
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    }
}

function mapStateToProps(state) {
    return {
        session: state[SESSION_STATE_KEY]
    };
}

export default connect(
    mapStateToProps,
    null
)(SettingsUserApiTokens);
