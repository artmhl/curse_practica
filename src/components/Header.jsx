import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

/**
 * Шапка сайту.
 * Показує назву магазину, лічильник кошика та обраного.
 */
export default function Header() {
  const { cartCount, favorites } = useShop();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Логотип */}
        <Link
          to="/"
          className="text-xl font-bold text-indigo-600 tracking-tight hover:text-indigo-700 transition-colors"
        >
          🛍️ ShopReact
        </Link>

        {/* Іконки кошика та обраного */}
        <div className="flex items-center gap-4">
          {/* Обране */}
          <div className="relative flex items-center gap-1 text-gray-600">
            <Heart size={22} />
            {favorites.size > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {favorites.size}
              </span>
            )}
          </div>

          {/* Кошик */}
          <div className="relative flex items-center gap-1 text-gray-600">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
