import React, {useEffect} from "react";
import SidebarLayout from "../../../../../../views/layouts/SidebarLayout";
import Col from "react-bootstrap/Col";
import {isObjectEmpty} from "../../../../../../library/utils";
import ApiTokensTable from "../../../../../../views/components/Tables/ApiTokensTable";
import {
    SESSION_AUTHENTICATED,
    SESSION_AUTHENTICATING,
    SESSION_STATE_KEY,
    SESSION_USER
} from "../../../../../../library/redux/constants/session-constants";
import {connect} from "react-redux";
import {
    setBreadcrumbsDataAction,
    setBreadcrumbsPageNameAction
} from "../../../../../../library/redux/actions/breadcrumbs-actions";


export const SettingsApiTokensPageName = "settings_api_tokens";
const SettingsUserApiTokens = ({session, userId}) => {

    useEffect(() => {
        if (!session[SESSION_AUTHENTICATING] && session[SESSION_AUTHENTICATED] && !isObjectEmpty(session[SESSION_USER])) {
            setBreadcrumbsPageNameAction(SettingsApiTokensPageName)
            setBreadcrumbsDataAction({
                user: {
                    id: session[SESSION_USER].id,
                    name: session[SESSION_USER].username
                }
            })
        }
    }, [session, session[SESSION_AUTHENTICATING], session[SESSION_AUTHENTICATED]])
    return (

        <SidebarLayout pageName={SettingsApiTokensPageName}>
            <>
                <Col sm={12} md={12} lg={12}>
                    {!isObjectEmpty(session[SESSION_USER]) &&
                        <ApiTokensTable
                            userId={userId}
                            admin
                        />
                    }
                </Col>
            </>
        </SidebarLayout>
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
