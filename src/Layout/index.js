import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <div className="layout-wrapper">
            <div className="game-header">
                <h1>Match Making Game</h1>
                <Link to="/">
                    {'<<'} Back
                </Link>
            </div>
            <Outlet />
        </div>
    )
}

export default Layout;