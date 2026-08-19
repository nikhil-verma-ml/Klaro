import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Footprints, Grid, Heart, Layers, Search, Shirt, ShoppingBag, Sparkles, Tag, TrendingUp, Watch, X } from 'lucide-react';
import { api } from '../api';
import ResultsGrid from '../components/ResultsGrid';

const CATEGORIES = [
  { id: 'tshirt', label: 'T-Shirts', query: 't-shirt', icon: Shirt },
  { id: 'shirt', label: 'Shirts', query: 'shirt', icon: Layers },
  { id: 'hoodies', label: 'Hoodies', query: 'hoodie sweatshirt', icon: Sparkles },
  { id: 'jeans', label: 'Jeans', query: 'jeans denim trousers', icon: Tag },
  { id: 'shoes', label: 'Shoes', query: 'shoes sneakers footwear', icon: Footprints },
  { id: 'accessories', label: 'Accessories', query: 'watch belt bag accessories', icon: Watch },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryResults, setCategoryResults] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCategoryClick = async (category) => {
    if (selectedCategory === category.id) {
      setSelectedCategory(null);
      setCategoryResults([]);
      return;
    }
    setSelectedCategory(category.id);
    setLoadingCategory(true);
    try {
      const data = await api.post('/recommend/text', { text: category.query });
      setCategoryResults(data?.results || []);
    } catch (err) {
      console.error('Failed to fetch category products:', err);
      setCategoryResults([]);
    } finally {
      setLoadingCategory(false);
    }
  };

  const handleViewAll = () => {
    setSelectedCategory(null);
    setCategoryResults([]);
  };

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

  return (
    <div className="space-y-10">
      <section className="grid items-stretch gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-[2rem] bg-stone-950 text-white shadow-2xl shadow-stone-950/10">
          <div className="grid min-h-[430px] lg:grid-cols-[1fr_0.88fr]">
            <div className="flex flex-col justify-between p-8 sm:p-10">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80">
                <Sparkles className="h-4 w-4" />
                Personalized by your interactions
              </div>
              <div>
                <h1 className="max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
                  Discover pieces that match your exact style direction.
                </h1>
                <p className="mt-5 max-w-lg text-base leading-7 text-white/70">
                  Klaro combines image search, text prompts, and your likes to surface fashion recommendations from the backend engine.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate('/search')}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-100"
                  >
                    <Search className="h-4 w-4" />
                    Start search
                  </button>
                  <button
                    onClick={() => navigate('/activity')}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <Heart className="h-4 w-4" />
                    Activity
                  </button>
                </div>
              </div>
            </div>
            <div className="relative min-h-[260px]">
              <img
                src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80"
                alt="Fashion editorial styling"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-[#e8f1ee] text-emerald-900">
              <Search className="h-5 w-5" />
            </div>
            <h2 className="text-base font-semibold text-stone-950">Text search</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">Describe the outfit mood or item you want.</p>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-[#e8f1ee] text-emerald-900">
              <Camera className="h-5 w-5" />
            </div>
            <h2 className="text-base font-semibold text-stone-950">Image search</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">Upload a reference and find similar pieces.</p>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-[#e8f1ee] text-emerald-900">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h2 className="text-base font-semibold text-stone-950">Preference boost</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">Likes and views refine future results.</p>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY SECTION */}
      <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-stone-500">Explore Collections</p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-950">Shop by Category</h2>
          </div>
          <button
            onClick={handleViewAll}
            className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition-all ${
              selectedCategory === null
                ? 'bg-stone-100 text-stone-950'
                : 'bg-stone-950 text-white hover:bg-stone-800'
            }`}
          >
            <Grid className="h-4 w-4" />
            View All
          </button>
        </div>

        {/* CATEGORIES GRID */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className={`group flex flex-col items-center justify-center gap-3 rounded-3xl p-5 text-center transition-all duration-300 ${
                  isActive
                    ? 'bg-stone-950 text-white shadow-xl shadow-stone-950/15 scale-105'
                    : 'border border-stone-200 bg-stone-50 text-stone-900 hover:border-stone-400 hover:bg-white hover:shadow-md'
                }`}
              >
                <div
                  className={`grid h-12 w-12 place-items-center rounded-2xl transition-colors ${
                    isActive
                      ? 'bg-white/15 text-white'
                      : 'bg-[#e8f1ee] text-emerald-950 group-hover:bg-stone-950 group-hover:text-white'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-semibold">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* CATEGORY RESULTS DISPLAY */}
        {selectedCategory && (
          <div className="mt-8 border-t border-stone-100 pt-8 transition-all duration-300">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-stone-950">
                {CATEGORIES.find((c) => c.id === selectedCategory)?.label} Collection
              </h3>
              <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600">
                {loadingCategory ? 'Loading...' : `${categoryResults.length} items`}
              </span>
            </div>

            {loadingCategory ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-72 animate-pulse rounded-3xl bg-stone-100" />
                ))}
              </div>
            ) : categoryResults.length > 0 ? (
              <ResultsGrid items={categoryResults} onSelect={setSelectedProduct} />
            ) : (
              <p className="py-8 text-center text-sm font-medium text-stone-500">
                No items found for this category.
              </p>
            )}
          </div>
        )}
      </section>

      <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-stone-500">Recommended workflow</p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-950">Search, save signals, repeat.</h2>
          </div>
          <button
            onClick={() => navigate('/search')}
            className="inline-flex w-fit items-center gap-2 rounded-2xl bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
          >
            <Search className="h-4 w-4" />
            Open search
          </button>
        </div>
      </section>

      {/* PRODUCT DETAILS MODAL */}
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

export default HomePage;
