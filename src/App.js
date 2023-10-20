import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Alerts from "pages/alerts/Alerts";
import Users from "pages/users/Users";

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

function App() {
    const store = useGlobalApp();

    useEffect(() => {
        // remove console.log in production's env
        switchConsoleLogs();
    }, []);

    return (
        <BrowserRouter>
            <GlobalProvider store={store}>
                <Navigation />
                <div className="md:ml-64">
                    <Routes>
                        <Route path="/" element={<Alerts />} />
                        <Route path="/cadastros" element={<Users />} />
                        <Route path="*" element={<Alerts />} />
                    </Routes>
                    <Footer />
                </div>
            </GlobalProvider>
        </BrowserRouter>
    );
}

export default App;
