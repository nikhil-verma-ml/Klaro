import { useState } from 'react';
import { Camera, ImagePlus, Search, ShoppingBag, Tag, X } from 'lucide-react';
import { api } from '../api';
import ResultsGrid from '../components/ResultsGrid';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [results, setResults] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getMeta = (metadata, ...keys) => {
        for (const key of keys) {
            if (metadata?.[key] !== undefined && metadata?.[key] !== null && metadata?.[key] !== '') {
                return metadata[key];
            }
        }
        return '';
    };

    const formatPrice = (value) => {
        const numberValue = Number(value);
        if (!Number.isFinite(numberValue)) return '';
        return `₹${numberValue.toLocaleString('en-IN')}`;
    };

    const handleFileChange = (event) => {
        const selected = event.target.files[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        if (!query.trim() && !file) return;
        setLoading(true);
        setError('');

        try {
            let data;
            if (file && query.trim()) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('text', query.trim());
                data = await api.upload('/recommend/combined', formData);
            } else if (file) {
                const formData = new FormData();
                formData.append('file', file);
                data = await api.upload('/recommend/image', formData);
            } else {
                data = await api.post('/recommend/text', { text: query.trim() });
            }
            setResults(data?.results || []);
        } catch (err) {
            console.error('Search failed:', err);
            setError(err.message || 'Search failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-10">
            <section className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
                <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="relative min-h-[260px]">
                        <img
                            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
                            alt="Street style outfit"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/45 to-transparent" />
                    </div>
                    <div className="p-6 sm:p-9">
                        <div className="mb-7">
                            <p className="inline-flex items-center gap-2 rounded-full bg-[#e8f1ee] px-4 py-2 text-sm font-medium text-emerald-950">
                                <Camera className="h-4 w-4" />
                                Multimodal search
                            </p>
                            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
                                Find your aesthetic.
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
                                Describe a style, attach a reference image, or combine both for richer recommendations.
                            </p>
                        </div>

                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="flex flex-col gap-3 rounded-3xl border border-stone-200 bg-stone-50 p-3 transition focus-within:border-stone-900 focus-within:bg-white focus-within:ring-4 focus-within:ring-stone-900/10 sm:flex-row sm:items-center">
                                <label className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-4 text-sm font-semibold text-stone-700 shadow-sm transition hover:bg-stone-100">
                                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                    <ImagePlus className="h-5 w-5" />
                                    Image
                                </label>

                                <input
                                    type="text"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="Minimal trench coat, bold partywear, summer linen..."
                                    className="min-h-12 flex-1 bg-transparent px-2 text-sm text-stone-950 outline-none placeholder:text-stone-400"
                                />

                                <button
                                    type="submit"
                                    disabled={loading || (!query.trim() && !file)}
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-stone-950 px-6 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Search className="h-4 w-4" />
                                    {loading ? 'Searching' : 'Search'}
                                </button>
                            </div>

                            {preview && (
                                <div className="flex w-fit items-center gap-3 rounded-2xl border border-stone-200 bg-white p-2 pr-3">
                                    <img src={preview} alt="Upload preview" className="h-14 w-14 rounded-xl object-cover" />
                                    <span className="text-sm font-medium text-stone-600">Reference attached</span>
                                    <button
                                        type="button"
                                        onClick={() => { setFile(null); setPreview(null); }}
                                        className="grid h-8 w-8 place-items-center rounded-full text-stone-500 transition hover:bg-stone-100 hover:text-stone-950"
                                        aria-label="Remove image"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}

                            {error && <p className="text-sm font-medium text-red-700">{error}</p>}
                        </form>
                    </div>
                </div>
            </section>

            {results.length > 0 && (
                <section>
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-stone-950">Curated results</h2>
                        <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-stone-500 shadow-sm">{results.length} items found</span>
                    </div>
                    <ResultsGrid items={results} onSelect={setSelectedProduct} />
                </section>
            )}

            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-stone-950/55 p-0 backdrop-blur-sm sm:items-center sm:p-6">
                    <div className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:rounded-[2rem]">
                        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4 sm:px-6">
                            <div className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600">
                                <ShoppingBag className="h-4 w-4" />
                                Product details
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedProduct(null)}
                                className="grid h-10 w-10 place-items-center rounded-2xl text-stone-500 transition hover:bg-stone-100 hover:text-stone-950"
                                aria-label="Close product details"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="grid max-h-[calc(92vh-73px)] overflow-y-auto lg:grid-cols-[0.95fr_1.05fr]">
                            <div className="bg-stone-100 p-4 sm:p-6">
                                <img
                                    src={selectedProduct.image_url}
                                    alt={getMeta(selectedProduct.metadata, 'Product Name', 'productDisplayName') || 'Fashion product'}
                                    className="mx-auto aspect-[4/5] max-h-[70vh] w-full rounded-3xl object-cover shadow-sm"
                                />
                            </div>

                            <div className="p-6 sm:p-8">
                                {(() => {
                                    const metadata = selectedProduct.metadata || {};
                                    const title = getMeta(metadata, 'Product Name', 'productDisplayName', 'articleType') || 'Fashion item';
                                    const brand = getMeta(metadata, 'Brand', 'brandName');
                                    const price = getMeta(metadata, 'Price');
                                    const discountedPrice = getMeta(metadata, 'Discounted Price');
                                    const details = [
                                        ['Product ID', getMeta(metadata, 'Product ID', 'id')],
                                        ['Brand', brand],
                                        ['Base Colour', getMeta(metadata, 'Base Colour', 'baseColour')],
                                        ['Season', getMeta(metadata, 'Season', 'season')],
                                        ['Master Category', getMeta(metadata, 'Master Category', 'masterCategory')],
                                        ['Sub Category', getMeta(metadata, 'Sub Category', 'subCategory')],
                                        ['Age Group', getMeta(metadata, 'Age Group')],
                                        ['Filename', selectedProduct.filename],
                                    ].filter(([, value]) => value !== undefined && value !== null && value !== '');

                                    return (
                                        <>
                                            <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">{brand || 'Klaro pick'}</p>
                                            <h3 className="mt-3 text-3xl font-semibold leading-tight text-stone-950">{title}</h3>

                                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                                {discountedPrice && (
                                                    <span className="rounded-2xl bg-stone-950 px-4 py-2 text-lg font-semibold text-white">
                                                        {formatPrice(discountedPrice)}
                                                    </span>
                                                )}
                                                {price && price !== discountedPrice && (
                                                    <span className="text-sm font-medium text-stone-500 line-through">{formatPrice(price)}</span>
                                                )}
                                                <span className="inline-flex items-center gap-2 rounded-2xl bg-[#e8f1ee] px-4 py-2 text-sm font-semibold text-emerald-950">
                                                    <Tag className="h-4 w-4" />
                                                    Match {Number(selectedProduct.score || 0).toFixed(2)}
                                                </span>
                                            </div>

                                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                                {details.map(([label, value]) => (
                                                    <div key={label} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                                                        <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">{label}</p>
                                                        <p className="mt-1 text-sm font-semibold text-stone-900">{value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
