import { useEffect, useState } from 'react';
import { Heart, MousePointer, ShoppingBag } from 'lucide-react';
import { api } from '../api';
import ResultsGrid from '../components/ResultsGrid';

const ActivityPage = () => {
    const [interactions, setInteractions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchInteractions = async () => {
            try {
                const data = await api.get('/interactions');
                setInteractions(data?.items || []);
            } catch (err) {
                console.error('Failed to load activity:', err);
                setError(err.message || 'Failed to load activity history.');
            } finally {
                setLoading(false);
            }
        };

        fetchInteractions();
    }, []);

    const handleDelete = (id) => {
        setInteractions(prev => prev.filter(item => item.id !== id));
    };

    const cartItems = interactions.filter(item => item.action_type === 'cart');
    const likes = interactions.filter(item => item.action_type === 'like');
    const clicks = interactions.filter(item => item.action_type === 'click');

    return (
        <div className="mx-auto max-w-6xl space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-stone-950">Activity History</h1>
                <p className="mt-2 text-stone-500">Track your saved cart items, likes, and interaction history.</p>
            </div>

            {loading ? (
                <div className="rounded-3xl border border-stone-200 bg-white p-12 text-center text-stone-500">
                    Loading your history...
                </div>
            ) : error ? (
                <div className="rounded-3xl border border-stone-200 bg-white p-12 text-center text-red-600">
                    {error}
                </div>
            ) : interactions.length === 0 ? (
                <div className="mt-6 rounded-3xl border border-dashed border-stone-300 bg-stone-50/50 p-12 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-200">
                        <ShoppingBag className="h-6 w-6 text-stone-600" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-stone-900">No activity recorded yet</h3>
                    <p className="mt-2 text-sm text-stone-500">
                        Items you add to cart, like, or view will automatically show up here and personalize your recommendation engine.
                    </p>
                </div>
            ) : (
                <div className="space-y-10">
                    {cartItems.length > 0 && (
                        <section>
                            <div className="mb-4 flex items-center gap-2">
                                <ShoppingBag className="h-5 w-5 text-emerald-700 fill-emerald-700" />
                                <h2 className="text-xl font-semibold text-stone-950">Items in Cart ({cartItems.length})</h2>
                            </div>
                            <ResultsGrid items={cartItems} onSelect={setSelectedProduct} onDelete={handleDelete} />
                        </section>
                    )}

                    {likes.length > 0 && (
                        <section>
                            <div className="mb-4 flex items-center gap-2">
                                <Heart className="h-5 w-5 text-rose-600 fill-rose-600" />
                                <h2 className="text-xl font-semibold text-stone-950">Liked Items ({likes.length})</h2>
                            </div>
                            <ResultsGrid items={likes} onSelect={setSelectedProduct} onDelete={handleDelete} />
                        </section>
                    )}

                    {clicks.length > 0 && (
                        <section>
                            <div className="mb-4 flex items-center gap-2">
                                <MousePointer className="h-5 w-5 text-stone-700" />
                                <h2 className="text-xl font-semibold text-stone-950">Recent Views & Clicks ({clicks.length})</h2>
                            </div>
                            <ResultsGrid items={clicks} onSelect={setSelectedProduct} onDelete={handleDelete} />
                        </section>
                    )}
                </div>
            )}
        </div>
    );
};

export default ActivityPage;