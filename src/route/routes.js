//react router的6.2.1版本，Switch改为Routes，Redirect改为Navigate
import { useRoutes, Navigate } from "react-router-dom";
import Login from "../views/login/login";
import Home from "../views/home";

export default function () {
    //使用useRoutes配置route
    //useRoutes的更高层应该由BrowserRouter或者HashRouter包裹，不应该在自身组件中
    let routes = useRoutes([
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/home',
            element: <Home />
        },
    ]);

    return (
        <>
            {/* 直接作为组件引用，无需视作插槽变量 */}
            {routes}
        </>
    );
};