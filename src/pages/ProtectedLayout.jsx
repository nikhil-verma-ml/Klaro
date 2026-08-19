import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ProtectedLayout = ({ token, onLogout }) => {
    if (!token) return <Navigate to="/login" replace />;

    return (
        <div className="min-h-screen bg-[#f7f4ef] text-stone-950 font-sans">
            <Navbar onLogout={onLogout} />
            <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
                <Outlet />
            </main>
        </div>
    );
};

export default ProtectedLayout;
