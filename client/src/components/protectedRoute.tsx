import { Route } from "preact-router";
import { useEffect, useState } from "preact/hooks";
import { CheckPassword } from "@/api/login";
import { ProtectedRouteProps } from "@/types";
import Login from "@/routes/login";

const ProtectedRoute = ({path, component}:ProtectedRouteProps) => {

    const [isAuth, setAuth] = useState(false);
    const checkPassword = CheckPassword();

    useEffect(() => {
        if (checkPassword.isFetched) {
            setAuth(checkPassword.data === 200);
        }
    }, [checkPassword]);


    if (!isAuth)
        return <Route component={Login} />

    return <Route path={path} component={component} />
}

export default ProtectedRoute;