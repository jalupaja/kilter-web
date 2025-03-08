import { lazy, LocationProvider, ErrorBoundary, Router, Route } from 'preact-iso';
import './app.css';
import ThemeProvider from './themeprovider.tsx';

import Home from './routes/home.tsx';
const Boulder = lazy(() => import('./routes/boulder.tsx'));
const NotFound = lazy(() => import('./routes/_404.tsx'));

export const App = () => (
    <ThemeProvider>
        <LocationProvider>
            <ErrorBoundary>
                <Router>
                    <Route path="/" component={Home} />
                    <Route path="/boulder/:id" component={Boulder} />
                    <Route default component={NotFound} />
                </Router>
            </ErrorBoundary>
        </LocationProvider>
    </ThemeProvider>
);
