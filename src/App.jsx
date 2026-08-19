import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProtectedLayout from './pages/ProtectedLayout';
import SearchPage from './pages/SearchPage';
import HomePage from './pages/HomePage';
import ActivityPage from './pages/ActivityPage';

export default function App() {
    const [token, setToken] = useState(() => localStorage.getItem('klaro_token') || '');

    useEffect(() => {
        if (token) {
            localStorage.setItem('klaro_token', token);
        } else {
            localStorage.removeItem('klaro_token');
        }
    }, [token]);

    const handleLogout = () => setToken('');

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage onLogin={setToken} token={token} />} />
                <Route element={<ProtectedLayout token={token} onLogout={handleLogout} />}>
                    <Route index element={<HomePage />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="activity" element={<ActivityPage />} />
                </Route>
                <Route path="*" element={<Navigate to={token ? '/' : '/login'} replace />} />
            </Routes>
        </BrowserRouter>
    );
}