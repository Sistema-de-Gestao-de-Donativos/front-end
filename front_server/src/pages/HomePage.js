import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <main>
            <div class='outer'>
                <div class="container">
                <Link to='/cadastracd'><button class="btn-add">Cadastrar CD</button></Link> 
                <Link to='/pesqcd'><button class="btn-search">Pesquisar CD</button></Link> 
            </div>
        </div>
            
        </main>
    );
}

export default HomePage;