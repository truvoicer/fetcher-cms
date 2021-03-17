import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import {getApiUser} from "../../library/api/fetcher-api/fetcher-middleware";
import {checkAccessControl, getRouteItem, logout} from "../../library/session/authenticate";
import {Routes} from "../../config/routes";
import {
    setSessionAuthenticatedAction,
    setSessionAuthenticatingAction, setSessionLoginRedirectAction,
    setSessionUserAction
} from "../../library/redux/actions/session-actions";
import {
    SESSION_AUTHENTICATED,
    SESSION_AUTHENTICATING,
    SESSION_STATE_KEY
} from "../../library/redux/constants/session-constants";
import {connect} from "react-redux";

const ProtectedLayout = ({children, pageName, session}) => {
    const router = useRouter();
    useEffect(() => {
        getApiUser()
            .then((response) => {
                if (response.status !== 200) {
                    logout(router.asPath)
                    router.push('/auth/login')
                    return;
                }
                if (checkAccessControl(getRouteItem(Routes.items, pageName), response.data.data)) {
                    setSessionUserAction(response.data.data);
                    setSessionAuthenticatedAction(true);
                }
                setSessionAuthenticatingAction(false);
            })
            .catch((error) => {
                console.error(error)
                router.push('/auth/login')
            });
    }, []);

    return (
        <>
            {!session[SESSION_AUTHENTICATING] && session[SESSION_AUTHENTICATED]
                ?
                <>{children}</>
                :
                <>Loading...</>
            }
        </>
    );
};

function mapStateToProps(state) {
    return {
        session: state[SESSION_STATE_KEY]
    };
}

export default connect(
    mapStateToProps,
    null
)(ProtectedLayout);
