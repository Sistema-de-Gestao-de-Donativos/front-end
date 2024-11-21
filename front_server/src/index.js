import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { ModalProvider } from './pages/ModalContext';
import { FormProvider } from './pages/FormContext';
import NavBar from './components/NavBar';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Import HomePages
import HomePage from './pages/HomePage'; // no header
import HomePage2 from './pages/HomePage2'; // no header
import HomePage3 from './pages/HomePage3'; // header 1
import HomePage4 from './pages/HomePage4'; // header 2
import HomePage5 from './pages/HomePage5'; // header 3
import HomePage6 from './pages/HomePage6'; // header 4
import HomePage7 from './pages/HomePage7'; // no header
import HomePage8 from './pages/HomePage8'; // no header
import HomePage9 from './pages/HomePage9'; // no header
import HomePage10 from './pages/HomePage10'; // header 1

// Import other pages
import PesqCD from './pages/PesqCD'; // default header
import CadastraCD from './pages/CadastraCD'; // default header
import PesquisaAbrigoPage from './pages/PesquisaAbrigoPage'; // default header
import CadastraAbrigoPage from './pages/CadastraAbrigoPage'; // default header

// Import Headers
import Header from './components/Header'; // Default header
import Header1 from './components/Header1';
import Header2 from './components/Header2';
import Header3 from './components/Header3';
import Header4 from './components/Header4';

import LoginPage from './pages/LoginPage';

// Configuration for HomePages and Headers
const homePages = [
    { path: "/", element: <HomePage />, header: null },
    { path: "/home2", element: <HomePage2 />, header: null },
    { path: "/home3", element: <HomePage3 />, header: <Header1 /> },
    { path: "/home4", element: <HomePage4 />, header: <Header2 /> },
    { path: "/home5", element: <HomePage5 />, header: <Header3 /> },
    { path: "/home6", element: <HomePage6 />, header: <Header4 /> },
    { path: "/home7", element: <HomePage7 />, header: null },
    { path: "/home8", element: <HomePage8 />, header: null },
    { path: "/home9", element: <HomePage9 />, header: null },
    { path: "/home10", element: <HomePage10 />, header: <Header1 /> },
];

const otherRoutes = [
    { path: "/pesqcd", element: <PesqCD />, header: <Header /> },
    { path: "/cadastracd", element: <CadastraCD />, header: <Header /> },
    { path: "/pesquisaAbrigo", element: <PesquisaAbrigoPage />, header: <Header />},
    { path: "/cadastraAbrigo", element: <CadastraAbrigoPage />, header: <Header />},
    { path: "/login", element: <LoginPage />, header: null },
];

// App Layout Component to manage headers dynamically
const AppLayout = () => {
    const location = useLocation();

    // Find the current route configuration (if exists)
    const currentPage = [...homePages, ...otherRoutes].find(
        (route) => route.path === location.pathname
    );

    const HeaderComponent = currentPage?.header || null;

    return (
        <>
            <NavBar/>
            {HeaderComponent && <HeaderComponent.type />}
            <Routes>
                {/* Map all home page routes */}
                {homePages.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}

                {/* Map other routes */}
                {otherRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}

                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
};

// Main App Component
function App() {
    return (
        <GoogleOAuthProvider clientId= "689715815045-0esnj5b7t94kgtf26ea4gq7d78tk2nbm.apps.googleusercontent.com">
        <ModalProvider>
            <FormProvider>
                <BrowserRouter>
                    <AppLayout />
                </BrowserRouter>
            </FormProvider>
        </ModalProvider>
        </GoogleOAuthProvider>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
