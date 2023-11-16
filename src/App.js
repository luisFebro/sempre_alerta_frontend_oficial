import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

// Pages
import Alerts from "pages/alerts/Alerts";
import Users from "pages/users/Users";
import Access from "pages/access/Access";

// Layouts
import Navigation from "components/_layout/navigation/Navigation";
import Footer from "components/_layout/Footer";

// global context data
import useGlobalApp from "global-data/useGlobalApp";
import { GlobalProvider } from "context";

import "utils/globalHelpers";

// CSS implementation
import "styles/scss/App.scss";
import "styles/tailwind/tailwind_react_template_legacy.css";
import "styles/tailwind/output.css";
import "styles/libs/animate.selected.min.css";
import { useEffect } from "react";
import switchConsoleLogs from "utils/security/switchConsoleLogs";
import { useLoggedIn } from "auth/access/authenticate";
import { HOST_URL } from "config/root";

function App() {
    const store = useGlobalApp();

    useEffect(() => {
        // remove console.log in production's env
        switchConsoleLogs();
    }, []);

    useLoggedIn();

    // all main checking methods (loadInit, checkValidSession) is inside Navigation component

    return (
        <BrowserRouter>
            <GlobalProvider store={store}>
                <Routes>
                    <Route path="/" element={<Access />} />
                    <Route
                        path="/alertas"
                        element={
                            <div className="md:ml-64">
                                <Navigation />
                                <Alerts />
                                <Footer />
                            </div>
                        }
                    />
                    <Route
                        path="/cadastros"
                        element={
                            <div className="md:ml-64">
                                <Navigation />
                                <Users />
                                <Footer />
                            </div>
                        }
                    />
                    <Route path="*" element={<Access />} />
                </Routes>
            </GlobalProvider>
        </BrowserRouter>
    );
}

export default App;
