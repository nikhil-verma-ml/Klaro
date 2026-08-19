import { useState } from 'react';
import { Heart, Shirt, ShoppingBag, Sparkles, Trash2 } from 'lucide-react';
import { api } from '../api';

const getMeta = (metadata, ...keys) => {
  for (const key of keys) {
    if (metadata[key] !== undefined && metadata[key] !== null && metadata[key] !== '') {
      return metadata[key];
    }
  }
  return '';
};

const ResultCard = ({ item, onSelect, onDelete, initialLiked = false }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [liking, setLiking] = useState(false);
  const [addedToCart, setAddedToCart] = useState(item.action_type === 'cart');
  const [carting, setCarting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const metadata = item.metadata || {};
  const title = getMeta(metadata, 'Product Name', 'productDisplayName', 'articleType') || item.name || 'Fashion item';
  const brand = getMeta(metadata, 'Brand', 'brandName');
  const category = getMeta(metadata, 'Master Category', 'masterCategory', 'Sub Category', 'subCategory') || item.category;
  const tone = getMeta(metadata, 'Base Colour', 'baseColour', 'Season', 'season') || 'Curated pick';
  const price = getMeta(metadata, 'Discounted Price', 'Price');

  const handleLike = async (e) => {
    e.stopPropagation();
    if (liking) return;
    setLiking(true);
    try {
      const itemId = item.filename || item.item_id || item.id || 'unknown';
      await api.post('/interactions', {
        item_id: String(itemId),
        action_type: 'like'
      });
      setLiked(true);
    } catch (err) {
      console.error('Failed to log like interaction:', err);
    } finally {
      setLiking(false);
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (carting) return;
    setCarting(true);
    try {
      const itemId = item.filename || item.item_id || item.id || 'unknown';
      await api.post('/interactions', {
        item_id: String(itemId),
        action_type: 'cart'
      });
      setAddedToCart(true);
    } catch (err) {
      console.error('Failed to log cart interaction:', err);
    } finally {
      setCarting(false);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (deleting || !item.id) return;
    setDeleting(true);
    try {
      await api.delete(`/interactions/${item.id}`);
      onDelete?.(item.id);
    } catch (err) {
      console.error('Failed to delete interaction record:', err);
    } finally {
      setDeleting(false);
    }
  };

  const handleCardClick = async () => {
    onSelect?.(item);
    try {
      const itemId = item.filename || item.item_id || item.id || 'unknown';
      await api.post('/interactions', {
        item_id: String(itemId),
        action_type: 'click'
      });
    } catch (err) {
      console.error('Failed to log click interaction:', err);
    }
  };

  return (
    <article
      className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-950/10"
    >
      <div className="relative aspect-[4/5] bg-stone-100">
        <button type="button" onClick={handleCardClick} className="block h-full w-full text-left" aria-label={`View details for ${title}`}>
          <img src={item.image_url} alt={title} className="h-full w-full object-cover" />
        </button>
        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-700 backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
          {Number(item.score || 0).toFixed(2)}
        </div>
        {item.id && onDelete && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-stone-600 shadow-sm transition hover:bg-red-50 hover:text-red-600 backdrop-blur"
            aria-label="Delete history item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="p-4">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <button type="button" onClick={handleCardClick} className="text-left">
              <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-stone-950 hover:underline">{title}</h3>
            </button>
            <p className="mt-1 text-xs font-medium text-stone-500">{brand || category}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={handleLike}
              disabled={liking}
              className={`grid h-8 w-8 place-items-center rounded-full transition ${
                liked ? 'bg-rose-50 text-rose-600' : 'bg-stone-100 text-stone-500 hover:bg-rose-50 hover:text-rose-600'
              }`}
              aria-label="Like item"
              title="Like item"
            >
              <Heart className={`h-3.5 w-3.5 ${liked ? 'fill-current' : ''}`} />
            </button>
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={carting}
              className={`grid h-8 w-8 place-items-center rounded-full transition ${
                addedToCart ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-stone-500 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
              aria-label="Add to cart"
              title="Add to cart"
            >
              <ShoppingBag className={`h-3.5 w-3.5 ${addedToCart ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-stone-50 px-3 py-2 text-xs font-medium text-stone-500">
          <span className="inline-flex items-center gap-1.5">
            <Shirt className="h-3.5 w-3.5" />
            {tone}
          </span>
          <span>{price ? `₹${Number(price).toLocaleString('en-IN')}` : item.filename || 'Item'}</span>
        </div>
      </div>
    </article>
  );
};

export default ResultCard;
