import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NavigationDesktop from "./NavigationDesktop";
import NavigationMobile from "./NavigationMobile";

function Navigation() {
    const { logout } = useAuth();
    const history = useHistory();

    const handleLogout = async () => {
        await logout();
        history.push("/logowanie");
    };

    return (
        <React.Fragment>
            <NavigationDesktop handleLogout={handleLogout} />
            <NavigationMobile handleLogout={handleLogout} />
        </React.Fragment>
    );
}

export default Navigation;
