import { NavLink } from 'react-router-dom';
import { Heart, LogOut, Search, Sparkles } from 'lucide-react';

const Navbar = ({ onLogout }) => {
    return (
        <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/85 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
                <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-stone-950 text-white">
                        <Sparkles className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-semibold tracking-tight text-stone-950">Klaro</span>
                </div>

                <nav className="flex items-center gap-2 sm:gap-3">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `rounded-2xl px-3 py-2 text-sm font-semibold transition ${isActive ? 'bg-stone-950 text-white' : 'text-stone-500 hover:bg-stone-100 hover:text-stone-950'}`
                        }
                    >
                        Discover
                    </NavLink>
                    <NavLink
                        to="/search"
                        className={({ isActive }) =>
                            `inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold transition ${isActive ? 'bg-stone-950 text-white' : 'text-stone-500 hover:bg-stone-100 hover:text-stone-950'}`
                        }
                    >
                        <Search className="h-4 w-4" />
                        <span className="hidden sm:inline">Search</span>
                    </NavLink>
                    <NavLink
                        to="/activity"
                        className={({ isActive }) =>
                            `inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold transition ${isActive ? 'bg-stone-950 text-white' : 'text-stone-500 hover:bg-stone-100 hover:text-stone-950'}`
                        }
                    >
                        <Heart className="h-4 w-4" />
                        <span className="hidden sm:inline">Activity</span>
                    </NavLink>
                    <button
                        onClick={onLogout}
                        className="grid h-10 w-10 place-items-center rounded-2xl text-stone-500 transition hover:bg-stone-100 hover:text-stone-950"
                        aria-label="Logout"
                    >
                        <LogOut className="h-4 w-4" />
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
