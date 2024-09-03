import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);

// configurar as rotas das telas aqui!
function App() {
    return(
        <BrowserRouter>
            <Header />
                <Routes>
                    <Route exact path="/" element={<HomePage/>} />
                </Routes>
            <Footer />
      </BrowserRouter>
    );
}

export default App;
