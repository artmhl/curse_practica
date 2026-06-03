import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';

// Skeleton-картка для стану завантаження
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-52 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-1/3 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="h-8 bg-gray-200 rounded mt-4" />
      </div>
    </div>
  );
}

/**
 * Головна сторінка — каталог усіх товарів.
 * Отримує дані з FakeStoreAPI та відображає сітку ProductCard.
 */
export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  // Завантаження категорій
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {}); // некритична помилка
  }, []);

  // Завантаження товарів (з фільтрацією за категорією)
  useEffect(() => {
    setLoading(true);
    setError(null);

    const url =
      category === 'all'
        ? 'https://fakestoreapi.com/products'
        : `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Помилка завантаження товарів');
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <Layout>
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Каталог товарів</h1>
        <p className="text-gray-500 text-sm">
          Знаходьте найкращі товари за вигідними цінами
        </p>
      </div>

      {/* Фільтр категорій */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setCategory('all')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-150 ${
            category === 'all'
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'
          }`}
        >
          Усі
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border capitalize transition-colors duration-150 ${
              category === cat
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Помилка */}
      {error && (
        <div className="text-center py-20 text-red-500">
          <p className="text-xl font-semibold">⚠️ {error}</p>
          <p className="text-sm mt-2">Спробуйте оновити сторінку</p>
        </div>
      )}

      {/* Сітка товарів */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {/* Порожній результат */}
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl">Товарів не знайдено</p>
        </div>
      )}
    </Layout>
  );
}
