import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Sparkles } from 'lucide-react';
import { api } from '../api';

const LoginPage = ({ onLogin, token }) => {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (token) navigate('/', { replace: true });
    }, [token, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        if (!email.trim() || !password.trim()) return setError('Email and password are required.');
        setLoading(true);

        try {
            if (isSignup) {
                await api.post('/auth/signup', { email, password });
            }
            const data = await api.post('/auth/login', { email, password });
            onLogin(data.access_token);
        } catch (err) {
            setError(err.message || 'Authentication failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f4ef] font-sans text-stone-950">
            <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
                <section className="relative hidden overflow-hidden lg:block">
                    <img
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80"
                        alt="Curated fashion rail"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-950/75 via-stone-950/30 to-transparent" />
                    <div className="relative flex h-full flex-col justify-between p-12 text-white">
                        <div className="flex items-center gap-3">
                            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                                <Sparkles className="h-5 w-5" />
                            </div>
                            <span className="text-2xl font-semibold">Klaro</span>
                        </div>
                        <div className="max-w-xl pb-10">
                            <p className="mb-5 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                                AI style discovery
                            </p>
                            <h1 className="text-5xl font-semibold leading-tight">
                                Find fashion that understands the look in your head.
                            </h1>
                            <p className="mt-5 max-w-lg text-base leading-7 text-white/80">
                                Search with words, upload a reference image, and let Klaro build recommendations around your taste.
                            </p>
                        </div>
                    </div>
                </section>

                <main className="flex items-center justify-center px-5 py-10 sm:px-8">
                    <div className="w-full max-w-md">
                        <div className="mb-8 lg:hidden">
                            <div className="mb-5 inline-grid h-12 w-12 place-items-center rounded-2xl bg-stone-950 text-white">
                                <Sparkles className="h-5 w-5" />
                            </div>
                            <h1 className="text-4xl font-semibold">Klaro</h1>
                            <p className="mt-2 text-sm text-stone-600">AI style discovery for your wardrobe moodboard.</p>
                        </div>

                        <div className="rounded-[2rem] border border-stone-200 bg-white/90 p-7 shadow-[0_24px_80px_rgba(68,55,45,0.14)] backdrop-blur sm:p-8">
                            <div className="mb-7">
                                <p className="text-sm font-medium text-stone-500">{isSignup ? 'Create your account' : 'Welcome back'}</p>
                                <h2 className="mt-2 text-3xl font-semibold text-stone-950">
                                    {isSignup ? 'Start curating.' : 'Sign in to Klaro.'}
                                </h2>
                            </div>

                            {error && (
                                <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <label className="block">
                                    <span className="mb-2 block text-sm font-medium text-stone-700">Email</span>
                                    <span className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 transition focus-within:border-stone-900 focus-within:bg-white focus-within:ring-4 focus-within:ring-stone-900/10">
                                        <Mail className="h-5 w-5 text-stone-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            className="w-full bg-transparent text-sm text-stone-950 outline-none placeholder:text-stone-400"
                                        />
                                    </span>
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-medium text-stone-700">Password</span>
                                    <span className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 transition focus-within:border-stone-900 focus-within:bg-white focus-within:ring-4 focus-within:ring-stone-900/10">
                                        <Lock className="h-5 w-5 text-stone-400" />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            className="w-full bg-transparent text-sm text-stone-950 outline-none placeholder:text-stone-400"
                                        />
                                    </span>
                                </label>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-2xl bg-stone-950 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-stone-950/15 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? 'Working...' : isSignup ? 'Create account' : 'Sign in'}
                                </button>
                            </form>

                            <div className="mt-7 text-center text-sm text-stone-500">
                                {isSignup ? 'Already have an account?' : 'New to Klaro?'}{' '}
                                <button
                                    type="button"
                                    onClick={() => { setIsSignup(!isSignup); setError(''); }}
                                    className="font-semibold text-stone-950 underline decoration-stone-300 underline-offset-4 transition hover:decoration-stone-950"
                                >
                                    {isSignup ? 'Sign in' : 'Create account'}
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default LoginPage;
