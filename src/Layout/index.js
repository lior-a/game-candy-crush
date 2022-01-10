import { useLocation , Outlet, Link } from "react-router-dom";

const Layout = () => {
    const currentPathName = useLocation().pathname;

    const shouldShowLink = currentPathName !== '/';
    return (
        <div className="layout-wrapper">
            <div className="game-header">
                <h1 className="title">Match Making Game</h1>
                {shouldShowLink && <Link to="/" className="back-button button-53 no-rotate">
                    {'<<'} Back
                </Link>}
            </div>
            <Outlet />
        </div>
    )
}

export default Layout;