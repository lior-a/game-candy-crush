import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="layout-wrapper">
            <Outlet />
        </div>
    )
}

export default Layout;