import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { ModalProvider } from './pages/ModalContext';
import { FormProvider } from './pages/FormContext';
import NavBar from './components/NavBar';


import HomePage from './pages/MenuCD'; // no header
import HomePage3 from './pages/MenuVol'; // header 1
import HomePage4 from './pages/MenuAdmCD'; // header 2
import HomePage5 from './pages/MenuAdmAbr'; // header 3
import HomePage6 from './pages/MenuSuper'; // header 4

// Import other pages
import PesqCD from './pages/PesqCD'; // default header k
import CadastraCD from './pages/CadastraCD'; // default header k
import PesquisaAbrigoPage from './pages/PesquisaAbrigoPage'; // default header k
import CadastraAbrigoPage from './pages/CadastraAbrigoPage'; // default header k
import MeusPedidos from './pages/MeusPedidos'; //k
import NovoPedido from './pages/NovoPedido';// k
import Doacoes from './pages/Doacoes'; //k
import PesqDoacoes from './pages/PesqDoacoes'; //k
import Doador from './pages/Doador'; //k

import HomePage7 from './pages/CadUser'; // no header k
import HomePage8 from './pages/CadAdm'; // no header k
import HomePage9 from './pages/ConsultaUsersCDAbr'; // no header k
import HomePage10 from './pages/ConsultaUsers'; // header 1
import HomePage2 from './pages/ConsultaProduto'; // no header



// Import Headers
import Header from './components/Header'; // Default header
import Header1 from './components/Header1';
import Header2 from './components/Header2';
import Header3 from './components/Header3';
import Header4 from './components/Header4';


// Configuration for HomePages and Headers
const homePages = [
    { path: "/menucadcd", element: <HomePage />, header: null },
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

    { path: "/consultaEstoque", element: <ConsultaEstoque />, header: <Header />},

    { path: "/meuspedidos", element: <MeusPedidos />, header: null },
    { path: "/novopedido", element: <NovoPedido />, header: null },
    { path: "/doacoes", element: <Doacoes />, header: null },
    { path: "/doador", element: <Doador />, header: null },
    { path: "/pesqdoacao", element: <PesqDoacoes />, header: null },
    { path: "/caduser", element: <HomePage7 />, header: null },
    { path: "/cadadm", element: <HomePage8 />, header: null },
    { path: "/pesqusercdabr", element: <HomePage9 />, header: null },
    { path: "/pesquser", element: <HomePage10 />, header: null },
    { path: "/pesqprod", element: <HomePage2 />, header: null },

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