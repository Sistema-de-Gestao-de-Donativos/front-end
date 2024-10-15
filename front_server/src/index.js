import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/HomePage';
import HomePage2 from './pages/HomePage2';
import HomePage3 from './pages/HomePage3';
import HomePage4 from './pages/HomePage4';
import HomePage5 from './pages/HomePage5';
import HomePage6 from './pages/HomePage6';
import HomePage7 from './pages/HomePage7';
import HomePage8 from './pages/HomePage8';
import Header from './components/Header';
import Header2 from './components/Header2';
import Header3 from './components/Header3';
import Header4 from './components/Header4';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DEFAULT_BREAKPOINTS } from 'react-bootstrap/esm/ThemeProvider';

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);

function App() {
    
    const menus = ["HomePage2", "HomePage3", "HomePage4", "HomePage5"];

    const userType = 'adminCd';

    let tipoComponent;
    let headerComponent;
    let menu;

    switch (userType) {
        case 'superAdmin':
            tipoComponent = <HomePage5 />;
            headerComponent = <Header4 />;
            menu = "HomePage5";
            break;
        case 'adminCd':
            tipoComponent = <HomePage3 />;
            headerComponent = <Header2 />;
            menu = "HomePage3";
            break;
        case 'adminAbrigo':
            tipoComponent = <HomePage4 />;
            headerComponent = <Header3 />;
            menu = "HomePage4";
            break;
        case 'voluntario':
            tipoComponent = <HomePage2 />;
            headerComponent = <Header />;
            menu = "HomePage2";
            break;
        default:
            tipoComponent = <HomePage2 />;
            headerComponent = <Header />;
            menu = "HomePage2";
            break;
    }

    tipoComponent = <HomePage8 />;
    headerComponent = <Header />;
    menu = "HomePage8";

    return (
        <BrowserRouter>
            {menus.includes(menu) ? (
                <Routes>
                <Route exact path="/" element={tipoComponent} />
                </Routes>
            ) : (
                <>
                    {headerComponent}
                    <Routes>
                        <Route exact path="/" element={tipoComponent} />
                    </Routes>
                </>
            )}
        </BrowserRouter>
    );
}

export default App;
