import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import {getApiUser} from "../../library/api/fetcher-api/fetcher-middleware";
import {checkAccessControl, getRouteItem} from "../../library/session/authenticate";
import {Routes} from "../../config/routes";
import {
    setSessionAuthenticatedAction,
    setSessionAuthenticatingAction,
    setSessionUserAction
} from "../../library/redux/actions/session-actions";

const ProtectedLayout = ({children, pageName}) => {
    const router = useRouter();
    useEffect(() => {
        getApiUser()
            .then((response) => {
                if (response.status !== 200) {
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
            {children}
        </>
    );
};

export default ProtectedLayout;
