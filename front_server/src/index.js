import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import PesqCD from './pages/PesqCD'
import CadastraCD from './pages/CadastraCD';
import { FormProvider } from './pages/FormContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { ModalProvider } from './pages/ModalContext';

import PesquisaAbrigoPage from './pages/PesquisaAbrigoPage';
import CadastraAbrigoPage from './pages/CadastraAbrigoPage';

// configurar as rotas das telas aqui!
function App() {
    return (
        <ModalProvider>
            <FormProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/pesqcd" element={<PesqCD />} />
                        <Route path="/cadastracd" element={<CadastraCD />} />
                        <Route path="/pesquisaAbrigo" element={<PesquisaAbrigoPage />} />
                        <Route path="/cadastraAbrigo" element={<CadastraAbrigoPage />} />
                    </Routes>
                </BrowserRouter>
            </FormProvider>
        </ModalProvider>

    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
