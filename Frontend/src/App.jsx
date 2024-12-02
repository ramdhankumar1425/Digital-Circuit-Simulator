import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CircuitProvider } from "./context/CircuitContext.jsx";
import { Analytics } from "@vercel/analytics/react";
// import pages and components
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Simulator from "./pages/Simulator";
import TTGenerator from "./pages/TTGenerator";
import BooleanExpGenerator from "./pages/BooleanExpGenerator";
import ContactUs from "./pages/ContactUs";
import { Login, Signup } from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage.jsx";
import Loading from "./components/Loading.jsx";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/">
                        <Route index element={<HomePage />} />
                        <Route path="/simulator" element={<Simulator />} />
                        <Route
                            path="/simulator/:circuitId"
                            element={<Simulator />}
                        />
                        <Route
                            path="/truth-table-generator"
                            element={<TTGenerator />}
                        />
                        <Route
                            path="/boolean-expression-generator"
                            element={<BooleanExpGenerator />}
                        />
                        <Route path="/contact" element={<ContactUs />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Route>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

const Layout = ({ children }) => {
    return (
        <>
            <AuthProvider>
                <CircuitProvider>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                        transition:Bounce
                    />
                    <Header />
                    <main>{children}</main>
                    <Footer />
                    {/* For loading animations */}
                    <Loading />
                </CircuitProvider>
            </AuthProvider>

            {/* Vercel Analytics */}
            <Analytics />
        </>
    );
};

export default App;
