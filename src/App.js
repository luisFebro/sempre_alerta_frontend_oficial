import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
// Pages
import Dashboard from "pages/Dashboard";
import Users from "pages/Users";

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
                <Sidebar />
                <div className="md:ml-64">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/cadastros" element={<Users />} />
                        <Route path="*" element={<Dashboard />} />
                    </Routes>
                    <Footer />
                </div>
            </GlobalProvider>
        </BrowserRouter>
    );
}

export default App;

/*
<Route exact path="/settings" component={Settings} />
                        <Route exact path="/tables" component={Tables} />
                        <Route exact path="/maps" component={Maps} />

*/
