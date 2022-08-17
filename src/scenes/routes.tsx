import {Navigate, RouteObject, useRoutes} from "react-router-dom";
import NoAuthLayout from "common/components/Layouts/NoAuthLayout";
import {dynamicComponent} from "@monime-lab/uix-csplit";

const UserAlias = dynamicComponent(() => import('./user/alias'));
const UserVerify = dynamicComponent(() => import('./user/verify'));
const UserProfile = dynamicComponent(() => import('./user/profile'));
const Space = dynamicComponent(() => import('./space'));

const routes: RouteObject = {
    path: '/create',
    element: <NoAuthLayout/>,
    children: [
        {
            path: '/create',
            element: <Navigate to={"/create/user/alias"} replace/>
        },
        {
            path: '/create/user/alias',
            element: <UserAlias/>
        },
        {
            path: '/create/user/verify',
            element: <UserVerify/>
        },
        {
            path: '/create/user/profile',
            element: <UserProfile/>
        },
        {
            path: '/create/space',
            element: <Space/>
        },
    ]
}

export default function AppRoutes() {
    return useRoutes([routes]);
}