import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import PesqCD from './pages/PesqCD';
import CadastraCD from './pages/CadastraCD';
import PesquisaAbrigoPage from './pages/PesquisaAbrigoPage';
import CadastraAbrigoPage from './pages/CadastraAbrigoPage';
import { FormProvider } from './pages/FormContext';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ModalProvider } from './pages/ModalContext';

// Create a component to manage the header display logic
const AppLayout = () => {
    const location = useLocation();

    // Check if the current path requires a Header
    const showHeader = location.pathname === '/pesqcd' || location.pathname === '/cadastracd' 
                    || location.pathname === '/pesquisaAbrigo' || location.pathname === '/cadastraAbrigo' ;

    return (
        <>
            {showHeader && <Header />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pesqcd" element={<PesqCD />} />
                <Route path="/cadastracd" element={<CadastraCD />} />
                <Route path="/pesquisaAbrigo" element={<PesquisaAbrigoPage />} />
                <Route path="/cadastraAbrigo" element={<CadastraAbrigoPage />} />
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
