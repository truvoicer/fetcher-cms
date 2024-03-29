import React, {useEffect, useState} from "react";
import SidebarLayout from "../../../../../../views/layouts/SidebarLayout";
import Col from "react-bootstrap/Col";
import {isNotEmpty, isObjectEmpty, isSet} from "../../../../../../library/utils";
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
import UserEntitiesTable from "../../../../../../views/components/Tables/UserEntitiesTable";
import {fetchRequest} from "../../../../../../library/api/fetcher-api/fetcher-middleware";
import ApiConfig from "../../../../../../config/api-config";

export const SettingsUserPermissionsPageName = "settings_user_permissions";
const SettingsUserPermissions = ({session, userId}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!session[SESSION_AUTHENTICATING] && session[SESSION_AUTHENTICATED] && !isObjectEmpty(session[SESSION_USER])) {
            setBreadcrumbsPageNameAction(SettingsUserPermissionsPageName)
            setBreadcrumbsDataAction({
                user: {
                    id: session[SESSION_USER].id,
                    name: session[SESSION_USER].username
                }
            })
        }
    }, [session, session[SESSION_AUTHENTICATING], session[SESSION_AUTHENTICATED]])

    useEffect(() => {
        if (isSet(userId)) {
            fetchRequest({
                endpoint: ApiConfig.endpoints.admin,
                operation: `user/${userId}`,
                onSuccess: (responseData) => {
                    setUser(responseData.data);
                }
            })
        }
    }, [userId]);

    return (

        <SidebarLayout pageName={SettingsUserPermissionsPageName}>
            <>
                <Col sm={12} md={12} lg={12}>
                    {isNotEmpty(user) &&
                        <UserEntitiesTable
                            user={user}
                            isSession={false}
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
)(SettingsUserPermissions);
