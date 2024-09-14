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
                    </Routes>
                </BrowserRouter>
            </FormProvider>
        </ModalProvider>

    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
