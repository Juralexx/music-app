import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './test/reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import Head from './Head';
import ThemeContextWrapper from './components/tools/theme/ThemeContextWrapper';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ThemeContextWrapper>
            <HelmetProvider>
                <Head />
            </HelmetProvider>
            <App />
        </ThemeContextWrapper>
    </React.StrictMode>
);

reportWebVitals();
