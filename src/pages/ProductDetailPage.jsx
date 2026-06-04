import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, CheckCircle, XCircle, Package } from 'lucide-react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { useShop } from '../context/ShopContext';

/**
 * Сторінка детальної інформації про товар.
 * Динамічний маршрут: /product/:id
 */
export default function ProductDetailPage() {
  const { id } = useParams();       // отримуємо id з URL
  const navigate = useNavigate();
  const { addToCart } = useShop();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false); // анімація після покупки

  // Завантаження одного товару за id
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Товар не знайдено');
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  // Обробник «Купити»
  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // Рендер зірок рейтингу
  const renderStars = (rate) => {
    const full = Math.round(rate);
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={18}
        className={i < full ? 'text-yellow-400' : 'text-gray-300'}
        fill={i < full ? 'currentColor' : 'none'}
      />
    ));
  };

  /**
   * Генерує технічні характеристики на основі категорії товару.
   * FakeStoreAPI не містить реальних specs, тому демонструємо
   * підхід із псевдо-даними, які залежать від категорії.
   */
  const getSpecs = (p) => {
    const categorySpecs = {
      "men's clothing": [
        { label: 'Бренд',    value: 'FashionBrand' },
        { label: 'Матеріал', value: '100% бавовна' },
        { label: 'Розміри',  value: 'XS, S, M, L, XL, XXL' },
        { label: 'Країна',   value: 'Туреччина' },
      ],
      "women's clothing": [
        { label: 'Бренд',    value: 'ElegantWear' },
        { label: 'Матеріал', value: 'Поліестер / бавовна' },
        { label: 'Розміри',  value: 'XS, S, M, L, XL' },
        { label: 'Країна',   value: 'Китай' },
      ],
      "electronics": [
        { label: 'Бренд',    value: 'TechMaster' },
        { label: 'Вага',     value: `${(0.3 + (p.id % 10) * 0.1).toFixed(1)} кг` },
        { label: 'Гарантія', value: '12 місяців' },
        { label: 'Країна',   value: 'Японія' },
      ],
      "jewelery": [
        { label: 'Бренд',    value: 'LuxGems' },
        { label: 'Матеріал', value: 'Срібло 925 проби' },
        { label: 'Вага',     value: `${(5 + p.id).toFixed(1)} г` },
        { label: 'Країна',   value: 'Італія' },
      ],
    };

    const base = [
      { label: 'Артикул', value: `SKU-${String(p.id).padStart(5, '0')}` },
      { label: 'Рейтинг', value: `${p.rating?.rate} / 5 (${p.rating?.count} відгуків)` },
    ];

    return [...base, ...(categorySpecs[p.category] ?? [{ label: 'Бренд', value: 'ShopReact' }])];
  };

  // Наявність: є в наявності якщо кількість відгуків > 50 (симуляція)
  const inStock = product ? (product.rating?.count ?? 0) > 50 : false;

  return (
    <Layout>
      {/* Кнопка «Назад» */}
      <Button
        variant="ghost"
        className="mb-6 !px-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} />
        Назад до каталогу
      </Button>

      {/* Стан завантаження */}
      {loading && (
        <div className="flex flex-col md:flex-row gap-10 animate-pulse">
          <div className="w-full md:w-80 h-80 bg-gray-200 rounded-2xl" />
          <div className="flex-1 space-y-4">
            <div className="h-4 w-1/4 bg-gray-200 rounded" />
            <div className="h-7 bg-gray-200 rounded" />
            <div className="h-7 w-2/3 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-10 w-40 bg-gray-200 rounded mt-6" />
          </div>
        </div>
      )}

      {/* Помилка */}
      {error && (
        <div className="text-center py-20">
          <p className="text-2xl font-bold text-red-500 mb-2">⚠️ {error}</p>
          <Button variant="secondary" onClick={() => navigate('/')}>
            Повернутись до каталогу
          </Button>
        </div>
      )}

      {/* Контент товару */}
      {!loading && product && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-10">

            {/* Велике зображення */}
            <div className="flex-shrink-0 w-full md:w-80 h-80 flex items-center justify-center bg-gray-50 rounded-2xl p-8">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Деталі */}
            <div className="flex flex-col gap-4 flex-1">

              {/* Категорія */}
              <span className="text-sm text-indigo-500 font-medium uppercase tracking-wide">
                {product.category}
              </span>

              {/* Назва */}
              <h1 className="text-2xl font-bold text-gray-900 leading-snug">
                {product.title}
              </h1>

              {/* Рейтинг */}
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(product.rating?.rate ?? 0)}</div>
                <span className="text-sm text-gray-500">
                  {product.rating?.rate} / 5 &nbsp;·&nbsp;{' '}
                  <span className="font-medium text-gray-700">{product.rating?.count}</span>{' '}
                  відгуків
                </span>
              </div>

              {/* Ціна + статус наявності */}
              <div className="flex items-center gap-4 flex-wrap">
                <p className="text-3xl font-extrabold text-indigo-600">
                  ${product.price}
                </p>
                {inStock ? (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
                    <CheckCircle size={15} /> Є в наявності
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                    <XCircle size={15} /> Немає в наявності
                  </span>
                )}
              </div>

              {/* Опис */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>

              {/* ── Блок технічних характеристик ── */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 mt-2">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Package size={16} className="text-indigo-400" />
                  Технічні характеристики
                </h2>
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    {getSpecs(product).map(({ label, value }) => (
                      <tr key={label} className="border-b border-gray-200 last:border-0">
                        <td className="py-2 pr-4 text-gray-500 font-medium w-2/5">{label}</td>
                        <td className="py-2 text-gray-800">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Кнопка «До кошика» */}
              <div className="mt-2">
                <Button
                  variant={added ? 'secondary' : 'primary'}
                  className="px-6 py-3 text-base"
                  onClick={handleAddToCart}
                  disabled={!inStock}
                >
                  <ShoppingCart size={20} />
                  {added ? '✓ Додано до кошика!' : 'Додати до кошика'}
                </Button>
              </div>

            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
