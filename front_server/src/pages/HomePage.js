import React from 'react';

function HomePage() {
    return (
        <main>
            <div class='outer'>
                <div class="container">
                <a href='/cadastracd'><button class="btn-add">Cadastrar CD</button></a> 
                <a href='/pesquisacd'><button class="btn-search">Pesquisar CD</button></a> 
            </div>
        </div>
            
        </main>
    );
}

export default HomePage;