import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import PesqCD from './pages/PesqCD';
import CadastraCD from './pages/CadastraCD';
import { FormProvider } from './pages/FormContext';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ModalProvider } from './pages/ModalContext';

// Create a component to manage the header display logic
const AppLayout = () => {
    const location = useLocation();

    // Check if the current path requires a Header
    const showHeader = location.pathname === '/pesqcd' || location.pathname === '/cadastracd';

    return (
        <>
            {showHeader && <Header />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pesqcd" element={<PesqCD />} />
                <Route path="/cadastracd" element={<CadastraCD />} />
            </Routes>
        </>
    );
};

// Main App component
function App() {
    return (
        <ModalProvider>
            <FormProvider>
                <BrowserRouter>
                    <AppLayout />
                </BrowserRouter>
            </FormProvider>
        </ModalProvider>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
