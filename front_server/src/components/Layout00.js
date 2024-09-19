import React from 'react';
import Header from './Header'; // Adjust the import path as needed


const Layout = ({ children }) => {
    console.log('Rendering Layout with children:', children);
    return (
        <div>
            <Header />
            <main>{children}</main>
        </div>
        
    );
};

export default Layout;
