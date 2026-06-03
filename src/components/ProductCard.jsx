import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Info } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import Button from './Button';

/**
 * Картка товару для каталогу.
 *
 * Props:
 *  - product: об'єкт товару з FakeStoreAPI
 */
export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, isFavorite } = useShop();

  const favorited = isFavorite(product.id);

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-200 group">
      {/* Зображення */}
      <div
        className="relative h-52 p-6 flex items-center justify-center bg-gray-50 cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
        role="button"
        aria-label={`Переглянути ${product.title}`}
      >
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />

        {/* Кнопка «В обране» поверх зображення */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // не переходити на сторінку
            toggleFavorite(product.id);
          }}
          aria-label={favorited ? 'Прибрати з обраного' : 'Додати до обраного'}
          className={`
            absolute top-3 right-3 p-1.5 rounded-full shadow transition-colors duration-150
            ${favorited
              ? 'bg-pink-50 text-pink-500'
              : 'bg-white text-gray-300 hover:text-pink-400'}
          `}
        >
          <Heart size={18} fill={favorited ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Інформація */}
      <div className="flex flex-col flex-1 gap-2 p-4">
        {/* Категорія */}
        <span className="text-xs text-indigo-500 font-medium uppercase tracking-wide">
          {product.category}
        </span>

        {/* Назва */}
        <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
          {product.title}
        </h2>

        {/* Рейтинг */}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span className="text-yellow-400">★</span>
          <span>{product.rating?.rate ?? '—'}</span>
          <span className="text-gray-300">({product.rating?.count ?? 0})</span>
        </div>

        {/* Ціна + кнопки */}
        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>

          <div className="flex gap-2">
            {/* Детальніше */}
            <Button
              variant="ghost"
              className="!px-2 !py-1.5 text-xs"
              onClick={() => navigate(`/product/${product.id}`)}
              aria-label="Детальніше"
            >
              <Info size={15} />
              Детальніше
            </Button>

            {/* До кошика */}
            <Button
              variant="primary"
              className="!px-3 !py-1.5 text-xs"
              onClick={() => addToCart(product)}
              aria-label="Додати до кошика"
            >
              <ShoppingCart size={15} />
              Купити
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
