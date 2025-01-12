import React from 'react';
import './Layout.css';

function Layout({ children }) {
    return (
        <div className="layout">
            {/* <Header /> */}
            <main className="main-content">
                {children}
            </main>
            {/* <Footer /> */}
        </div>
    );
}

export default Layout;
